// netlify/functions/flights.js
// Server-side proxy — calls Amadeus without CORS restrictions

const AM_KEY    = "jk6L5jPNx4tw0TBzoqYnAKPffOUSYU02";
const AM_SECRET = "1YzcXjSpwAEyNUo9";
const AM_BASE   = "https://test.api.amadeus.com";

async function getToken() {
  const resp = await fetch(AM_BASE + "/v1/security/oauth2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: AM_KEY,
      client_secret: AM_SECRET,
    }),
  });
  if (!resp.ok) throw new Error("Auth failed: " + resp.status);
  const d = await resp.json();
  return d.access_token;
}

export const handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  try {
    const { origin, destination, date } = JSON.parse(event.body || "{}");

    if (!origin || !destination || !date) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Missing origin, destination, or date" }),
      };
    }

    const token = await getToken();

    const params = new URLSearchParams({
      originLocationCode: origin,
      destinationLocationCode: destination,
      departureDate: date,
      adults: "1",
      nonStop: "false",
      max: "5",
      currencyCode: "USD",
    });

    const resp = await fetch(`${AM_BASE}/v2/shopping/flight-offers?${params}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!resp.ok) {
      const err = await resp.json().catch(() => ({}));
      const msg = err.errors?.[0]?.detail || `Amadeus ${resp.status}`;
      return { statusCode: resp.status, headers, body: JSON.stringify({ error: msg }) };
    }

    const data = await resp.json();

    const flights = (data.data || []).map((offer) => {
      const segs  = offer.itineraries[0].segments;
      const seg0  = segs[0];
      const segN  = segs[segs.length - 1];
      return {
        price:    parseFloat(offer.price.total),
        airline:  seg0.carrierCode,
        dep_time: seg0.departure.at,
        arr_time: segN.arrival.at,
        dep_iata: seg0.departure.iataCode,
        arr_iata: segN.arrival.iataCode,
        duration: offer.itineraries[0].duration,
        stops:    segs.length - 1,
      };
    });

    return { statusCode: 200, headers, body: JSON.stringify({ flights }) };
  } catch (e) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: e.message }),
    };
  }
};
