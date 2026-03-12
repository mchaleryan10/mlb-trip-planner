// netlify/functions/hotels.js
// Server-side proxy — calls Amadeus hotel APIs without CORS restrictions

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
    const { cityCode, checkIn, checkOut } = JSON.parse(event.body || "{}");

    if (!cityCode || !checkIn || !checkOut) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Missing cityCode, checkIn, or checkOut" }),
      };
    }

    const token = await getToken();

    // Step 1: Get hotel IDs near city
    const listParams = new URLSearchParams({
      cityCode,
      radius: "5",
      radiusUnit: "KM",
      hotelSource: "ALL",
    });

    const listResp = await fetch(
      `${AM_BASE}/v1/reference-data/locations/hotels/by-city?${listParams}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (!listResp.ok) {
      const err = await listResp.json().catch(() => ({}));
      const msg = err.errors?.[0]?.detail || `Hotel list ${listResp.status}`;
      return { statusCode: listResp.status, headers, body: JSON.stringify({ error: msg }) };
    }

    const listData = await listResp.json();
    const ids = (listData.data || []).slice(0, 20).map((h) => h.hotelId);

    if (ids.length === 0) {
      return { statusCode: 200, headers, body: JSON.stringify({ hotels: [] }) };
    }

    // Step 2: Get offers for those hotels
    const offerParams = new URLSearchParams({
      hotelIds: ids.join(","),
      checkInDate: checkIn,
      checkOutDate: checkOut,
      adults: "1",
      roomQuantity: "1",
      currency: "USD",
      bestRateOnly: "true",
    });

    const offerResp = await fetch(
      `${AM_BASE}/v3/shopping/hotel-offers?${offerParams}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (!offerResp.ok) {
      const err = await offerResp.json().catch(() => ({}));
      const msg = err.errors?.[0]?.detail || `Hotel offers ${offerResp.status}`;
      return { statusCode: offerResp.status, headers, body: JSON.stringify({ error: msg }) };
    }

    const offerData = await offerResp.json();

    const hotels = (offerData.data || []).slice(0, 5).map((h) => ({
      name:     h.hotel.name,
      rating:   h.hotel.rating,
      price:    h.offers?.[0]?.price?.total,
      currency: h.offers?.[0]?.price?.currency || "USD",
      checkIn:  h.offers?.[0]?.checkInDate,
      checkOut: h.offers?.[0]?.checkOutDate,
    }));

    return { statusCode: 200, headers, body: JSON.stringify({ hotels }) };
  } catch (e) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: e.message }),
    };
  }
};
