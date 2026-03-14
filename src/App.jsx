import { useState, useMemo, useRef } from "react";
// 2026 MLB SCHEDULE DATA
const G={
"ARI":"0330.1910.DET,0331.1839.DET,0401.1239.DET,0402.1839.ATL,0403.1845.ATL,0404.1615.ATL,04
"ATL":"0327.1915.KC,0328.1915.KC,0329.1335.KC,0330.1915.OAK,0331.1915.OAK,0401.1214.OAK,0410.
"BAL":"0326.1505.MIN,0328.1605.MIN,0329.1335.MIN,0330.1834.TEX,0331.1834.TEX,0401.1234.TEX,04
"BOS":"0403.1409.SD,0404.1610.SD,0405.1335.SD,0406.1845.MIL,0407.1845.MIL,0408.1335.MIL,0417.
"CHC":"0326.1320.WSH,0328.1320.WSH,0329.1320.WSH,0330.1839.LAA,0331.1839.LAA,0401.1320.LAA,04
"CHW":"0402.1510.TOR,0404.1309.TOR,0405.1309.TOR,0406.1839.BAL,0407.1839.BAL,0408.1309.BAL,04
"CIN":"0326.1610.BOS,0328.1610.BOS,0329.1339.BOS,0330.1839.PIT,0331.1839.PIT,0401.1239.PIT,04
"CLE":"0403.1610.CHC,0404.1915.CHC,0405.1339.CHC,0406.1809.KC,0407.1809.KC,0408.1310.KC,0416.
"COL":"0403.1410.PHI,0404.1809.PHI,0405.1309.PHI,0406.1840.HOU,0407.1840.HOU,0408.1309.HOU,04
"DET":"0403.1310.STL,0404.1310.STL,0405.1919.STL,0410.1839.MIA,0411.1310.MIA,0412.1339.MIA,04
"HOU":"0326.1510.LAA,0327.1915.LAA,0328.1810.LAA,0329.1309.LAA,0330.1909.BOS,0331.1909.BOS,04
"KC":"0330.1510.MIN,0401.1839.MIN,0402.1309.MIN,0403.1844.MIL,0404.1510.MIL,0405.1309.MIL,040
"LAA":"0403.1838.SEA,0404.1838.SEA,0405.1306.SEA,0406.1838.ATL,0407.1838.ATL,0408.1306.ATL,04
"LAD":"0326.1729.ARI,0327.1910.ARI,0328.1809.ARI,0330.1910.CLE,0331.1910.CLE,0401.1720.CLE,04
"MIA":"0327.1910.COL,0328.1610.COL,0329.1339.COL,0330.1839.CHW,0331.1839.CHW,0401.1310.CHW,04
"MIL":"0326.1309.CHW,0328.1810.CHW,0329.1309.CHW,0330.1839.TB,0331.1839.TB,0401.1239.TB,0410.
"MIN":"0403.1510.TB,0404.1810.TB,0405.1309.TB,0406.1839.DET,0407.1839.DET,0408.1839.DET,0409.
"NYM":"0326.1315.PIT,0328.1610.PIT,0329.1339.PIT,0407.1910.ARI,0408.1910.ARI,0409.1910.ARI,04
"NYY":"0403.1335.MIA,0404.1905.MIA,0405.1335.MIA,0407.1905.OAK,0408.1905.OAK,0409.1335.OAK,04
"OAK":"0403.1839.HOU,0404.1305.HOU,0405.1305.HOU,0413.1839.TEX,0414.1839.TEX,0415.1839.TEX,04
"PHI":"0326.1615.TEX,0328.1605.TEX,0329.1335.TEX,0330.1839.WSH,0331.1839.WSH,0401.1305.WSH,04
"PIT":"0403.1612.BAL,0404.1605.BAL,0405.1335.BAL,0406.1839.SD,0407.1839.SD,0408.1234.SD,0413.
"SD":"0326.1310.DET,0327.1839.DET,0328.1740.DET,0330.1839.SF,0331.1839.SF,0401.1310.SF,0409.1
"SEA":"0326.1910.CLE,0327.1845.CLE,0328.1839.CLE,0329.1619.CLE,0330.1839.NYY,0331.1839.NYY,04
"SF":"0325.1704.NYY,0327.1335.NYY,0328.1615.NYY,0402.1845.NYM,0403.1915.NYM,0404.1805.NYM,040
"STL":"0326.1515.TB,0328.1315.TB,0329.1315.TB,0330.1844.NYM,0331.1844.NYM,0401.1215.NYM,0410.
"TB":"0406.1610.CHC,0407.1839.CHC,0408.1839.CHC,0410.1910.NYY,0411.1809.NYY,0412.1339.NYY,042
"TEX":"0403.1505.CIN,0404.1805.CIN,0405.1335.CIN,0406.1904.SEA,0407.1904.SEA,0408.1335.SEA,04
"TOR":"0327.1906.OAK,0328.1507.OAK,0329.1337.OAK,0330.1906.COL,0331.1906.COL,0401.1306.COL,04
"WSH":"0403.1305.LAD,0404.1605.LAD,0405.1335.LAD,0406.1845.STL,0407.1845.STL,0408.1605.STL,04
};
function pg(t) {
const r = G[t];
if (!r) return [];
return r.split(",").map(e => {
const [md, hm, o] = e.split(".");
const mo = md.slice(0, 2), dy = md.slice(2);
const h = parseInt(hm.slice(0, 2)), mi = hm.slice(2);
const ap = h >= 12 ? "PM" : "AM";
const h2 = h > 12 ? h - 12 : h === 0 ? 12 : h;
return { date: "2026-" + mo + "-" + dy, time: h2 + ":" + mi + " " + ap, opponent: o };
});
}
const ST = [
{id:1,team:"Arizona Diamondbacks",stadium:"Chase Field",city:"Phoenix",state:"AZ",lat:33.44
{id:2,team:"Atlanta Braves",stadium:"Truist Park",city:"Atlanta",state:"GA",lat:33.8907,lng
{id:3,team:"Baltimore Orioles",stadium:"Camden Yards",city:"Baltimore",state:"MD",lat:39.28
{id:4,team:"Boston Red Sox",stadium:"Fenway Park",city:"Boston",state:"MA",lat:42.3467,lng:
{id:5,team:"Chicago Cubs",stadium:"Wrigley Field",city:"Chicago",state:"IL",lat:41.9484,lng
{id:6,team:"Chicago White Sox",stadium:"Rate Field",city:"Chicago",state:"IL",lat:41.8299,l
{id:7,team:"Cincinnati Reds",stadium:"Great American Ball Park",city:"Cincinnati",state:"OH
{id:8,team:"Cleveland Guardians",stadium:"Progressive Field",city:"Cleveland",state:"OH",la
{id:9,team:"Colorado Rockies",stadium:"Coors Field",city:"Denver",state:"CO",lat:39.7559,ln
{id:10,team:"Detroit Tigers",stadium:"Comerica Park",city:"Detroit",state:"MI",lat:42.339,l
{id:11,team:"Houston Astros",stadium:"Minute Maid Park",city:"Houston",state:"TX",lat:29.75
{id:12,team:"Kansas City Royals",stadium:"Kauffman Stadium",city:"Kansas City",state:"MO",l
{id:13,team:"Los Angeles Angels",stadium:"Angel Stadium",city:"Anaheim",state:"CA",lat:33.8
{id:14,team:"Los Angeles Dodgers",stadium:"Dodger Stadium",city:"Los Angeles",state:"CA",la
{id:15,team:"Miami Marlins",stadium:"loanDepot Park",city:"Miami",state:"FL",lat:25.7781,ln
{id:16,team:"Milwaukee Brewers",stadium:"American Family Field",city:"Milwaukee",state:"WI"
{id:17,team:"Minnesota Twins",stadium:"Target Field",city:"Minneapolis",state:"MN",lat:44.9
{id:18,team:"New York Mets",stadium:"Citi Field",city:"New York",state:"NY",lat:40.7571,lng
{id:19,team:"New York Yankees",stadium:"Yankee Stadium",city:"New York",state:"NY",lat:40.8
{id:20,team:"Oakland Athletics",stadium:"Sutter Health Park",city:"Sacramento",state:"CA",l
{id:21,team:"Philadelphia Phillies",stadium:"Citizens Bank Park",city:"Philadelphia",state:
{id:22,team:"Pittsburgh Pirates",stadium:"PNC Park",city:"Pittsburgh",state:"PA",lat:40.446
{id:23,team:"San Diego Padres",stadium:"Petco Park",city:"San Diego",state:"CA",lat:32.7076
{id:24,team:"San Francisco Giants",stadium:"Oracle Park",city:"San Francisco",state:"CA",la
{id:25,team:"Seattle Mariners",stadium:"T-Mobile Park",city:"Seattle",state:"WA",lat:47.591
{id:26,team:"St. Louis Cardinals",stadium:"Busch Stadium",city:"St. Louis",state:"MO",lat:3
{id:27,team:"Tampa Bay Rays",stadium:"Tropicana Field",city:"St. Petersburg",state:"FL",lat
{id:28,team:"Texas Rangers",stadium:"Globe Life Field",city:"Arlington",state:"TX",lat:32.7
{id:29,team:"Toronto Blue Jays",stadium:"Rogers Centre",city:"Toronto",state:"ON",lat:43.64
{id:30,team:"Washington Nationals",stadium:"Nationals Park",city:"Washington",state:"DC",la
];
const HA = [
{code:"ALB",name:"Albany Intl",lat:42.7483,lng:-73.8017},
{code:"JFK",name:"JFK",lat:40.6413,lng:-73.7781},
{code:"LGA",name:"LaGuardia",lat:40.7772,lng:-73.8726},
{code:"EWR",name:"Newark",lat:40.6895,lng:-74.1745},
];
const DV = {
"AL East":["NYY","BOS","TOR","BAL","TB"],
"AL Central":["CLE","DET","MIN","CHW","KC"],
"AL West":["HOU","SEA","TEX","LAA","OAK"],
"NL East":["ATL","NYM","PHI","MIA","WSH"],
"NL Central":["MIL","CHC","STL","PIT","CIN"],
"NL West":["LAD","SD","ARI","SF","COL"],
};
const TC = {ARI:"#A71930",ATL:"#CE1141",BAL:"#DF4601",BOS:"#BD3039",CHC:"#0E3386",CHW:"#555",
// ── Proxy helpers (calls Netlify functions — no CORS issues) ─────────────────
async function fetchFlights(origin, destination, date) {
const resp = await fetch("/api/flights", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ origin, destination, date }),
});
if (!resp.ok) throw new Error("Flights proxy " + resp.status);
const data = await resp.json();
if (data.error) throw new Error(data.error);
return data.flights || [];
}
async function fetchHotels(cityCode, checkIn, checkOut) {
const resp = await fetch("/api/hotels", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ cityCode, checkIn, checkOut }),
});
if (!resp.ok) throw new Error("Hotels proxy " + resp.status);
const data = await resp.json();
if (data.error) throw new Error(data.error);
return data.hotels || [];
}
const PS = {background:"#111827",borderRadius:12,padding:16,border:"1px solid #1e293b"};
function hv(a, b, c, d) {
const R = 3959;
const dL = ((c - a) * Math.PI) / 180;
const dN = ((d - b) * Math.PI) / 180;
const x = Math.sin(dL / 2) ** 2 + Math.cos(a * Math.PI / 180) * Math.cos(c * Math.PI return R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
/ 180)
}
function optRoute(sel, h) {
if (sel.length <= 1) { return sel; }
const s = [...sel].sort((a, b) => a.lng - b.lng);
const r = [...s].reverse();
const cd = (a) => {
let d = hv(h.lat, h.lng, a[0].lat, a[0].lng);
for (let i = 1; i < a.length; i++) { d += hv(a[i-1].lat, a[i-1].lng, a[i].lat, a[i].lng);
d += hv(a[a.length-1].lat, a[a.length-1].lng, h.lat, h.lng);
return d;
};
return cd(s) <= cd(r) ? s : r;
}
function drvT(m) {
const h = Math.floor(m / 55);
const mi = Math.round((m / 55 - h) * 60);
return h ? h + "h " + mi + "m" : mi + "m";
}
function mapP(lat, lng, W, H) {
return { x: ((lng + 128) / 64) * W, y: H - ((lat - 23) / 28) * H };
}
// City pairs: teams close enough to visit without a travel day
const CITY_PAIRS = [
["CHC", "CHW"], // Chicago
["LAD", "LAA"], // Los Angeles
["NYY", "NYM"], // New York
["BAL", "WSH"], // DC/Baltimore
];
function getCityPairPartner(abbr) {
for (const pair of CITY_PAIRS) {
if (pair[0] === abbr) { return pair[1]; }
if (pair[1] === abbr) { return pair[0]; }
}
return null;
}
function findTrips(teams, maxDays, ds, de) {
// 1. Get all home games for each team in date range
const teamGames = {};
const abbrs = teams.map(t => t.abbr);
for (const t of teams) {
teamGames[t.abbr] = pg(t.abbr).filter(g => g.date >= ds && g.date <= de);
}
// 2. Merge city pairs into combined "stops" for routing
// A combined stop has multiple teams but counts as 1 routing stop (no travel day between)
const routingStops = []; // each entry: { teams: ["CHC","CHW"], city: "Chicago", ... const assigned = new Set();
} or {
for (const abbr of abbrs) {
if (assigned.has(abbr)) { continue; }
const partner = getCityPairPartner(abbr);
if (partner && abbrs.includes(partner) && !assigned.has(partner)) {
// Merge into combined stop
const stad1 = teams.find(s => s.abbr === abbr);
const stad2 = teams.find(s => s.abbr === partner);
routingStops.push({
teams: [abbr, partner],
city: stad1.city === stad2.city ? stad1.city : stad1.city + "/" + stad2.city,
lat: (stad1.lat + stad2.lat) / 2,
lng: (stad1.lng + stad2.lng) / 2,
});
assigned.add(abbr);
assigned.add(partner);
} else {
const stad = teams.find(s => s.abbr === abbr);
routingStops.push({
teams: [abbr],
city: stad.city,
lat: stad.lat,
lng: stad.lng,
});
assigned.add(abbr);
}
}
// 3. Generate every date from ds to de
const allDays = [];
const startD = new Date(ds);
const endD = new Date(de);
for (let d = new Date(startD); d <= endD; d.setDate(d.getDate() + 1)) {
allDays.push(d.toISOString().slice(0, 10));
}
// 4. Helpers for stay calculation
function maxStay(allGames, earliest, wEnd) {
// allGames may come from multiple teams at same city - merge by date
const sorted = allGames.filter(g => g.date >= earliest && g.date <= wEnd)
.sort((a, b) => a.date.localeCompare(b.date));
if (sorted.length === 0) { return null; }
const uniqueDates = [...new Set(sorted.map(g => g.date))].sort();
let depart = uniqueDates[0];
for (let i = 1; i < uniqueDates.length; i++) {
const gap = (new Date(uniqueDates[i]) - new Date(uniqueDates[i-1])) / 864e5;
if (gap <= 2) { depart = uniqueDates[i]; }
else { break; }
}
const attended = sorted.filter(g => g.date >= uniqueDates[0] && g.date <= depart);
return { arrive: uniqueDates[0], depart: depart, games: attended };
}
function minStay(allGames, earliest, wEnd) {
// For combined stops: need at least 1 game from EACH team in the pair
const sorted = allGames.filter(g => g.date >= earliest && g.date <= wEnd)
.sort((a, b) => a.date.localeCompare(b.date));
if (sorted.length === 0) { return null; }
// Find first date, and take all games on that date
const firstDate = sorted[0].date;
const sameDayGames = sorted.filter(g => g.date === firstDate);
return { arrive: firstDate, depart: firstDate, games: sameDayGames };
}
function minStayCombined(stopDef, earliest, wEnd) {
// For a combined stop, we need games from EACH team
// Find the earliest window where all teams have at least 1 game
const teamGamesByDate = {};
for (const abbr of stopDef.teams) {
const games = (teamGames[abbr] || []).filter(g => g.date >= earliest && g.date <= wEnd)
for (const g of games) {
if (!teamGamesByDate[g.date]) { teamGamesByDate[g.date] = {}; }
if (!teamGamesByDate[g.date][abbr]) { teamGamesByDate[g.date][abbr] = []; }
teamGamesByDate[g.date][abbr].push(g);
}
}
const dates = Object.keys(teamGamesByDate).sort();
if (stopDef.teams.length === 1) {
if (dates.length === 0) { return null; }
const allGames = (teamGames[stopDef.teams[0]] || []).filter(g => g.date >= earliest &&
return minStay(allGames, earliest, wEnd);
}
// For paired stop: find tightest window covering at least 1 game from each team
const t1 = stopDef.teams[0], t2 = stopDef.teams[1];
const t1dates = dates.filter(d => teamGamesByDate[d][t1]);
const t2dates = dates.filter(d => teamGamesByDate[d][t2]);
if (t1dates.length === 0 || t2dates.length === 0) { return null; }
let bestArrive = null, bestDepart = null, bestSpan = Infinity;
for (const d1 of t1dates) {
for (const d2 of t2dates) {
const arrive = d1 < d2 ? d1 : d2;
const depart = d1 > d2 ? d1 : d2;
const span = (new Date(depart) - new Date(arrive)) / 864e5;
if (span < bestSpan) {
bestSpan = span;
bestArrive = arrive;
bestDepart = depart;
}
}
}
if (!bestArrive) { return null; }
const allGamesInStay = [];
for (const abbr of stopDef.teams) {
const games = (teamGames[abbr] || []).filter(g => g.date >= bestArrive && g.date allGamesInStay.push(...games);
<= bes
}
return { arrive: bestArrive, depart: bestDepart, games: allGamesInStay };
}
function maxStayCombined(stopDef, earliest, wEnd) {
if (stopDef.teams.length === 1) {
const allGames = (teamGames[stopDef.teams[0]] || []).filter(g => g.date >= earliest &&
return maxStay(allGames, earliest, wEnd);
}
// Merge all games from both teams, use maxStay logic, but validate both teams represente
const allGames = [];
for (const abbr of stopDef.teams) {
allGames.push(...(teamGames[abbr] || []).filter(g => g.date >= earliest && g.date <= wE
}
const result = maxStay(allGames, earliest, wEnd);
if (!result) { return null; }
// Check both teams have at least 1 game in the stay
for (const abbr of stopDef.teams) {
if (!result.games.some(g => g.opponent === abbr || (teamGames[abbr] || []).some(tg => t
// Better check: is any game in result from this team?
const teamGameDates = new Set((teamGames[abbr] || []).map(g => g.date + g.time if (!result.games.some(g => teamGameDates.has(g.date + g.time + g.opponent))) {
return null;
+ g.op
}
}
}
return result;
}
// 5. Build trip for a permutation of routing stops
function tryBuild(perm, wStart, wEnd, stayMode) {
const stops = [];
for (let i = 0; i < perm.length; i++) {
const stopDef = perm[i];
let earliest;
if (i === 0) {
// Arrive on first available game day
const allGames = [];
for (const abbr of stopDef.teams) {
allGames.push(...(teamGames[abbr] || []).filter(g => g.date >= wStart && g.date <=
}
allGames.sort((a, b) => a.date.localeCompare(b.date));
earliest = allGames.length > 0 ? allGames[0].date : wStart;
} else {
const prevStop = stops[i - 1];
const mi = hv(prevStop.lat, prevStop.lng, stopDef.lat, stopDef.lng);
const travelDays = mi > 500 ? 1 : 0;
const prevDepart = new Date(prevStop.depart);
prevDepart.setDate(prevDepart.getDate() + 1 + travelDays);
earliest = prevDepart.toISOString().slice(0, 10);
}
const stay = stayMode === "max"
? maxStayCombined(stopDef, earliest, wEnd)
: minStayCombined(stopDef, earliest, wEnd);
if (!stay) { return null; }
// Verify each team in the stop has at least 1 game
for (const abbr of stopDef.teams) {
const hasGame = stay.games.some(g => {
return (teamGames[abbr] || []).some(tg => tg.date === g.date && tg.time === g.time
});
if (!hasGame) { return null; }
}
stops.push({
city: stopDef.city,
team: stopDef.teams.join("+"),
teams: stopDef.teams,
arrive: stay.arrive,
depart: stay.depart,
games: stay.games,
lat: stopDef.lat,
lng: stopDef.lng,
});
}
const firstDay = new Date(stops[0].arrive);
const lastDay = new Date(stops[stops.length - 1].depart);
const totalDays = Math.round((lastDay - firstDay) / 864e5) + 1;
if (totalDays > maxDays) { return null; }
let totalMiles = 0;
for (let i = 1; i < stops.length; i++) {
totalMiles += hv(stops[i-1].lat, stops[i-1].lng, stops[i].lat, stops[i].lng);
}
return {
totalDays: totalDays,
stops: stops,
totalMiles: Math.round(totalMiles),
totalGames: stops.reduce((s, st) => s + st.games.length, 0),
};
}
// 6. Slide window, try all permutations of routing stops, both stay modes
const trips = [];
const seenKeys = new Set();
const dowNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
for (let wi = 0; wi < allDays.length; wi++) {
const wStart = allDays[wi];
const wEndDate = new Date(wStart);
wEndDate.setDate(wEndDate.getDate() + maxDays - 1);
const wEnd = wEndDate.toISOString().slice(0, 10);
if (wEnd > de) { break; }
// Quick check: all teams have at least 1 game in window?
let allHave = true;
for (const abbr of abbrs) {
if (!teamGames[abbr].some(g => g.date >= wStart && g.date <= wEnd)) {
allHave = false; break;
}
}
if (!allHave) { continue; }
// Use the locked route order - no permutations needed
const perms = [routingStops];
for (const perm of perms) {
for (const mode of ["min", "max"]) {
const trip = tryBuild(perm, wStart, wEnd, mode);
if (!trip) { continue; }
const key = trip.stops.map(s => s.team + ":" + s.arrive + "-" + s.depart).join("|");
if (seenKeys.has(key)) { continue; }
seenKeys.add(key);
const startDow = new Date(trip.stops[0].arrive).getDay();
trips.push({
...trip,
startDate: trip.stops[0].arrive,
startDow: dowNames[startDow],
startMonth: parseInt(trip.stops[0].arrive.slice(5, 7)),
route: trip.stops.map(s => s.team).join(" > "),
});
}
}
}
trips.sort((a, b) => a.startDate.localeCompare(b.startDate));
return trips;
}
function getPermutations(arr) {
if (arr.length <= 1) { return [arr]; }
if (arr.length > 5) { return [arr]; } // safety cap
const result = [];
for (let i = 0; i < arr.length; i++) {
const rest = arr.slice(0, i).concat(arr.slice(i + 1));
const perms = getPermutations(rest);
for (const p of perms) {
result.push([arr[i], ...p]);
}
}
return result;
}
function StadiumMap({ stadiums, selected, route, homeAirport, onToggle }) {
const W = 820, H = 500;
const ha = homeAirport;
const hm = ha ? mapP(ha.lat, ha.lng, W, H) : null;
return (
<svg viewBox={"0 0 " + W + " " + H} style={{width:"100%",height:"auto",background:"linear
<defs><filter id="sh"><feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="#000" fl
{route.length > 1 && route.map((s, i) => {
if (i === 0) { return null; }
const a = mapP(route[i-1].lat, route[i-1].lng, W, H);
const b = mapP(s.lat, s.lng, W, H);
return (<line key={"l"+i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#4ade80" })}
stroke
{hm && route.length > 0 && (
<>
<line x1={hm.x} y1={hm.y} x2={mapP(route[0].lat,route[0].lng,W,H).x} y2={mapP(route
<line x1={mapP(route[route.length-1].lat,route[route.length-1].lng,W,H).x} y1={mapP
</>
)}
{hm && (
<g>
</g>
<circle cx={hm.x} cy={hm.y} r="6" fill="#60a5fa" stroke="#fff" strokeWidth="2" filt
<text x={hm.x} y={hm.y - 10} textAnchor="middle" fill="#60a5fa" fontSize="9" fontWe
)}
{stadiums.map(s => {
const p = mapP(s.lat, s.lng, W, H);
const isSel = selected.includes(s.id);
const ri = route.findIndex(r => r.id === s.id);
const c = isSel ? (TC[s.abbr] || "#4ade80") : "#334155";
return (
<g key={s.id} onClick={() => onToggle(s.id)} style={{cursor:"pointer"}}>
{isSel && <circle cx={p.x} cy={p.y} r="14" fill={c} opacity="0.15"><animate attri
<circle cx={p.x} cy={p.y} r={isSel ? 7 : 4} fill={isSel ? c : "#475569"} stroke={
{isSel && ri >= 0 && <text x={p.x + 11} y={p.y + 4} fill="#e2e8f0" fontSize="9" f
{!isSel && <text x={p.x} y={p.y - 7} textAnchor="middle" fill="#64748b" fontSize=
</g>
);
})}
</svg>
<text x={W - 10} y={18} textAnchor="end" fill="#1e3a5f" fontSize="9" fontFamily="monosp
);
}
function Selector({ selected, onToggle, onAll, onClear }) {
const [f, setF] = useState("");
const [d, setD] = useState("All");
const fl = ST.filter(s =>
(s.team + s.city).toLowerCase().includes(f.toLowerCase()) &&
(d === "All" || Object.entries(DV).some(([k, v]) => k === d && v.includes(s.abbr)))
);
return (
<div style={PS}>
<div style={{display:"flex",gap:8,marginBottom:12,flexWrap:"wrap"}}>
<input type="text" placeholder="Search teams, cities..." value={f} onChange={e => set
<select value={d} onChange={e => setD(e.target.value)} style={{padding:"8px 12px",bac
<option value="All">All Divisions</option>
{Object.keys(DV).map(k => <option key={k} value={k}>{k}</option>)}
</select>
</div>
<div style={{display:"flex",gap:6,marginBottom:12}}>
<button onClick={onAll} style={{padding:"6px 12px",background:"#1e3a5f",border:"none"
<button onClick={onClear} style={{padding:"6px 12px",background:"#1e1e1e",border:"1px
<span style={{marginLeft:"auto",color:"#4ade80",fontSize:12,fontWeight:700,fontFamily
</div>
<div style={{maxHeight:320,overflowY:"auto",display:"grid",gridTemplateColumns:"1fr 1fr
{fl.map(s => {
const sel = selected.includes(s.id);
return (
<button key={s.id} onClick={() => onToggle(s.id)} style={{display:"flex",alignIte
<div style={{width:8,height:8,borderRadius:"50%",background:sel ? TC[s.abbr] :
<div>
<div style={{color:sel ? "#f1f5f9" : "#94a3b8",fontSize:12,fontWeight:600}}>{
<div style={{color:"#64748b",fontSize:10}}>{s.city}, {s.state}</div>
</div>
</button>
);
})}
</div>
</div>
);
}
function RouteView({ route, ha, onReorder }) {
if (route.length === 0) { return null; }
const move = (idx, dir) => {
const newRoute = [...route];
const target = idx + dir;
if (target < 0 || target >= newRoute.length) { return; }
const temp = newRoute[idx];
newRoute[idx] = newRoute[target];
newRoute[target] = temp;
onReorder(newRoute);
};
const autoOptimize = () => {
onReorder(optRoute(route, ha));
};
const reverse = () => {
onReorder([...route].reverse());
};
// Calculate stats
let totalMi = 0;
const legs = route.map((s, i) => {
const prev = i === 0 ? ha : route[i - 1];
const mi = Math.round(hv(prev.lat, prev.lng, s.lat, s.lng));
totalMi += mi;
return mi;
});
const returnMi = Math.round(hv(route[route.length - 1].lat, route[route.length - 1].lng, ha
totalMi += returnMi;
return (
<div style={PS}>
<h3 style={{color:"#4ade80",margin:"0 0 8px",fontSize:14,fontFamily:"monospace",letterS
<div style={{color:"#94a3b8",fontSize:11,marginBottom:12}}>
Use arrows to reorder stops. This order will be used for schedule search.
</div>
<div style={{display:"flex",gap:6,marginBottom:14}}>
<button onClick={autoOptimize} style={{padding:"6px 12px",background:"#1e3a5f",border
Auto-optimize (shortest distance)
</button>
<button onClick={reverse} style={{padding:"6px 12px",background:"#1e1e1e",border:"1px
Reverse order
</button>
</div>
{/* Route list with move buttons */}
<div style={{background:"#0a1628",borderRadius:8,padding:4,marginBottom:14}}>
{route.map((s, i) => {
const mi = legs[i];
const dr = mi < 350;
return (
<div key={s.id} style={{display:"flex",alignItems:"center",gap:8,padding:"10px 8p
{/* Move buttons */}
<div style={{display:"flex",flexDirection:"column",gap:2}}>
<button onClick={() => move(i, -1)} disabled={i === 0}
style={{width:22,height:18,background:i === 0 ? "transparent" : "#1e3a5f",b
&#9650;
</button>
<button onClick={() => move(i, 1)} disabled={i === route.length - 1}
style={{width:22,height:18,background:i === route.length - 1 ? "transparent
&#9660;
</button>
</div>
{/* Stop number */}
<span style={{color:"#4ade80",fontFamily:"monospace",fontSize:14,fontWeight:800
{/* Team color dot */}
<div style={{width:10,height:10,borderRadius:"50%",background:TC[s.abbr] {/* Info */}
<div style={{flex:1}}>
<div style={{color:"#e2e8f0",fontSize:13,fontWeight:600}}>{s.team}</div>
|| "#4
<div style={{color:"#64748b",fontSize:10}}>{s.stadium} - {s.city}, {s.state}<
</div>
{/* Distance */}
<div style={{textAlign:"right"}}>
<div style={{color:"#94a3b8",fontSize:11}}>{mi} mi</div>
<div style={{fontSize:9,color:dr ? "#4ade80" : "#f59e0b"}}>
{dr ? "Drive ~" + drvT(mi) : "Fly"}
</div>
</div>
</div>
);
})}
</div>
{/* Summary stats */}
<div style={{background:"linear-gradient(135deg,#1e3a5f,#1e1b4b)",borderRadius:10,paddi
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12,textAlign:"cente
<div>
<div style={{color:"#4ade80",fontSize:18,fontWeight:900,fontFamily:"JetBrains Mon
<div style={{color:"#64748b",fontSize:9,letterSpacing:1}}>STOPS</div>
</div>
<div>
<div style={{color:"#f59e0b",fontSize:18,fontWeight:900,fontFamily:"JetBrains Mon
<div style={{color:"#64748b",fontSize:9,letterSpacing:1}}>TOTAL MILES</div>
</div>
<div>
<div style={{color:"#818cf8",fontSize:18,fontWeight:900,fontFamily:"JetBrains Mon
<div style={{color:"#64748b",fontSize:9,letterSpacing:1}}>RETURN MI</div>
</div>
</div>
<div style={{marginTop:10,color:"#94a3b8",fontSize:10,textAlign:"center"}}>
{ha.code} &rarr; {route.map(s => s.abbr).join(" &rarr; ")} &rarr; {ha.code}
</div>
</div>
</div>
);
}
function Schedule({ route, ha, onTrip }) {
const [ds, setDs] = useState("2026-04-02");
const [de, setDe] = useState("2026-09-27");
const [maxDays, setMaxDays] = useState(8);
const [allTrips, setAllTrips] = useState(null);
const [searching, setSearching] = useState(false);
// Filter/sort state
const [sortBy, setSortBy] = useState("startDate");
const [filterMonth, setFilterMonth] = useState("All");
const [filterMinGames, setFilterMinGames] = useState(1);
const [filterDow, setFilterDow] = useState("All");
const search = () => {
setSearching(true);
setAllTrips(null);
setTimeout(() => {
const t = findTrips(route, maxDays, ds, de);
setAllTrips(t);
setSearching(false);
}, 50);
};
// Apply filters and sorting
const filteredTrips = useMemo(() => {
if (!allTrips) { return null; }
let result = [...allTrips];
// Filter by month
if (filterMonth !== "All") {
const m = parseInt(filterMonth);
result = result.filter(t => t.startMonth === m);
}
// Filter by min games per stop
if (filterMinGames > 1) {
result = result.filter(t => t.stops.every(s => s.games.length >= filterMinGames));
}
// Filter by start day of week
if (filterDow !== "All") {
result = result.filter(t => t.startDow === filterDow);
}
// Sort
if (sortBy === "startDate") {
result.sort((a, b) => a.startDate.localeCompare(b.startDate));
} else if (sortBy === "totalDays") {
result.sort((a, b) => a.totalDays - b.totalDays);
} else if (sortBy === "totalGames") {
result.sort((a, b) => b.totalGames - a.totalGames);
} else if (sortBy === "totalMiles") {
result.sort((a, b) => a.totalMiles - b.totalMiles);
}
return result;
}, [allTrips, sortBy, filterMonth, filterMinGames, filterDow]);
const monthNames = {4:"Apr",5:"May",6:"Jun",7:"Jul",8:"Aug",9:"Sep"};
const IS = {padding:"6px 10px",background:"#0a1628",border:"1px solid #1e3a5f",borderRadius
return (
<div style={PS}>
<h3 style={{color:"#f59e0b",margin:"0 0 14px",fontSize:14,fontFamily:"monospace",letter
<div style={{padding:10,background:"#0a1628",borderRadius:8,marginBottom:14,color:"#94a
Searches using your route order from Step 2: {route.map(s => s.abbr).join(" > ")}. Ch
</div>
{/* Search controls */}
<div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:14}}>
<label style={{color:"#94a3b8",fontSize:12,display:"flex",alignItems:"center",gap:6}}
From: <input type="date" value={ds} onChange={e => setDs(e.target.value)} style={IS
</label>
<label style={{color:"#94a3b8",fontSize:12,display:"flex",alignItems:"center",gap:6}}
To: <input type="date" value={de} onChange={e => setDe(e.target.value)} style={IS}/
</label>
<label style={{color:"#94a3b8",fontSize:12,display:"flex",alignItems:"center",gap:6}}
Max days: <input type="number" min={3} max={21} value={maxDays} onChange={e => setM
</label>
</div>
<button onClick={search} disabled={route.length < 2 || searching} style={{padding:"12px
{searching ? "Searching all possible trips..." : route.length < 2 ? "Select 2+ stadiu
</button>
{/* No results */}
{allTrips && allTrips.length === 0 && (
<div style={{marginTop:14,padding:14,background:"#1c1015",borderRadius:8,border:"1px
No trips found within {maxDays} days. Try increasing max days or widening the date
</div>
)}
{/* Results with filters */}
{filteredTrips && allTrips && allTrips.length > 0 && (
<div style={{marginTop:16}}>
{/* Filter/sort bar */}
<div style={{background:"#0a1628",borderRadius:8,padding:12,marginBottom:12,border:
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",ma
<span style={{color:"#4ade80",fontSize:13,fontFamily:"monospace",fontWeight:700
Showing {filteredTrips.length} of {allTrips.length} trips
</span>
</div>
<div style={{display:"flex",gap:10,flexWrap:"wrap",fontSize:11}}>
<label style={{color:"#94a3b8",display:"flex",alignItems:"center",gap:4}}>
Sort:
<select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{...I
<option value="startDate">Start Date</option>
<option value="totalDays">Shortest Trip</option>
<option value="totalGames">Most Games</option>
<option value="totalMiles">Least Travel</option>
</select>
</label>
<label style={{color:"#94a3b8",display:"flex",alignItems:"center",gap:4}}>
Month:
<select value={filterMonth} onChange={e => setFilterMonth(e.target.value)} st
<option value="All">All</option>
<option value="4">April</option>
<option value="5">May</option>
<option value="6">June</option>
<option value="7">July</option>
<option value="8">August</option>
<option value="9">September</option>
</select>
</label>
<label style={{color:"#94a3b8",display:"flex",alignItems:"center",gap:4}}>
Min games/stop:
<select value={filterMinGames} onChange={e => setFilterMinGames(Number(e.targ
<option value={1}>Any (1+)</option>
<option value={2}>2+</option>
<option value={3}>3+</option>
</select>
</label>
<label style={{color:"#94a3b8",display:"flex",alignItems:"center",gap:4}}>
Start day:
<select value={filterDow} onChange={e => setFilterDow(e.target.value)} <option value="All">Any</option>
<option value="Mon">Mon</option>
<option value="Tue">Tue</option>
<option value="Wed">Wed</option>
<option value="Thu">Thu</option>
<option value="Fri">Fri</option>
<option value="Sat">Sat</option>
<option value="Sun">Sun</option>
</select>
</label>
</div>
</div>
style=
{/* Trip list */}
<div style={{maxHeight:600,overflowY:"auto"}}>
{filteredTrips.map((trip, ti) => (
<div key={ti} style={{background:"#0a1628",borderRadius:10,padding:14,marginBot
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center
<h4 style={{color:"#f59e0b",margin:0,fontSize:14}}>
{trip.startDow} {trip.startDate}
</h4>
<span style={{color:"#4ade80",fontSize:12,fontFamily:"monospace",fontWeight
</div>
<div style={{display:"flex",gap:12,marginBottom:10,fontSize:10,color:"#64748b
<span>{trip.totalGames} games</span>
<span>{trip.totalMiles.toLocaleString()} mi</span>
<span>{trip.route}</span>
</div>
{(trip.stops || []).map((stop, si) => {
const teamNames = (stop.teams || [stop.team]).map(a => (ST.find(s => const teamColor = TC[(stop.teams || [stop.team])[0]] || "#e2e8f0";
return (
<div key={si} style={{padding:"6px 0",borderBottom:si < trip.stops.length -
<div style={{display:"flex",justifyContent:"space-between"}}>
<span style={{color:teamColor,fontWeight:700,fontSize:12}}>
{si + 1}. {stop.city} {teamNames.length > 1 ? "(" + (stop.teams || []
</span>
</div>
<span style={{color:"#64748b",fontSize:11}}>{stop.arrive} to {stop.depa
{(stop.games || []).map((g, gi) => (
<div key={gi} style={{marginLeft:20,marginTop:3,color:"#94a3b8",fontSiz
{g.date} vs {g.opponent} @ {g.time}
</div>
s.abbr
))}
</div>
);
})}
<button onClick={() => onTrip(trip)} style={{marginTop:8,padding:"8px",backgr
View Route + Pricing
</button>
</div>
))}
</div>
</div>
)}
</div>
);
}
function Pricing({ trip, ha }) {
if (!trip) { return null; }
const stops = trip.stops || [];
const [flights, setFlights] = useState({});
const [hotels, setHotels] = useState({});
const [tickets, setTickets] = useState({});
const [loading, setLoading] = useState(false);
const [status, setStatus] = useState("");
const [fetched, setFetched] = useState(false);
const [apiCalls, setApiCalls] = useState(0);
// Selection state: user picks one flight per leg, one hotel per stop
const [selFlights, setSelFlights] = useState({}); // { legId: { flight, groupIdx, flightIdx
const [selHotels, setSelHotels] = useState({}); // { stopIdx: hotel object }
const [reviewMode, setReviewMode] = useState(false);
// Build flight legs
const legs = useMemo(() => {
const result = [];
for (let i = 0; i < stops.length; i++) {
const fromTeams = i === 0 ? null : (stops[i-1].teams || [stops[i-1].team]);
const fromStad = i === 0 ? null : ST.find(s => s.abbr === (fromTeams[0] || "").replace(
const toTeams = stops[i].teams || [stops[i].team];
const toStad = ST.find(s => s.abbr === (toTeams[0] || "").replace("+",""));
result.push({
id: "leg-" + i,
from: i === 0 ? "Home" : stops[i-1].city,
to: stops[i].city,
fromAp: i === 0 ? null : (fromStad || {}).ap,
toAp: (toStad || {}).ap,
date: stops[i].arrive,
isFirst: i === 0,
});
}
// Return leg
const lastTeams = stops[stops.length-1].teams || [stops[stops.length-1].team];
const lastStad = ST.find(s => s.abbr === (lastTeams[0] || "").replace("+",""));
result.push({
id: "leg-return",
from: stops[stops.length-1].city,
to: "Home",
fromAp: (lastStad || {}).ap,
toAp: null,
date: stops[stops.length-1].depart,
isLast: true,
});
return result;
}, [stops, ha]);
// ── Calculate running total from selections ──────────────────────────────
const totalCalc = useMemo(() => {
let flightTotal = 0, flightCount = 0, flightNeeded = legs.length;
let hotelTotal = 0, hotelCount = 0, hotelNeeded = stops.length;
for (const legId of Object.keys(selFlights)) {
const f = selFlights[legId]?.flight;
if (f?.price) { flightTotal += f.price; flightCount++; }
}
for (const si of Object.keys(selHotels)) {
const h = selHotels[si];
if (h?.price) { hotelTotal += parseFloat(h.price); hotelCount++; }
}
return { flightTotal, flightCount, flightNeeded, hotelTotal, hotelCount, hotelNeeded, gra
}, [selFlights, selHotels, legs.length, stops.length]);
// ── Build a Google Flights booking URL ──────────────────────────────────
function gFlightUrl(depIata, arrIata, date) {
// Google Flights URL format: google.com/travel/flights?q=flights+from+XXX+to+YYY+on+YYYY
return `https://www.google.com/travel/flights?q=flights+from+${depIata || ""
}+to+${arrIata || ""}+on+${date || ""}`;
}
// ── Build a Google Hotels booking URL ──────────────────────────────────
function gHotelUrl(city, checkIn, checkOut) {
return `https://www.google.com/travel/hotels?q=hotels+in+${encodeURIComponent(city)}&date
}
const fetchPricing = async () => {
setLoading(true);
setFetched(false);
setFlights({});
setHotels({});
setTickets({});
setSelFlights({});
setSelHotels({});
setReviewMode(false);
let calls = 0;
const homeAps = [ha.code, ha.code === "ALB" ? "JFK" : "ALB"];
// ── FLIGHTS ────────────────────────────────────────────────────────────────
for (let i = 0; i < legs.length; i++) {
const leg = legs[i];
setStatus("Searching flights: " + leg.from + " → " + leg.to + "...");
const results = [];
if (leg.isFirst) {
for (const ap of homeAps) {
if (!leg.toAp) { results.push({ airport: ap, flights: [], error: "No destination ai
try {
const fls = await fetchFlights(ap, leg.toAp, leg.date);
calls++;
results.push({ airport: ap, flights: fls });
} catch (e) {
results.push({ airport: ap, flights: [], error: e.message });
}
}
} else if (leg.isLast) {
for (const ap of homeAps) {
if (!leg.fromAp) { results.push({ airport: ap, flights: [], error: "No origin airpo
try {
const fls = await fetchFlights(leg.fromAp, ap, leg.date);
calls++;
results.push({ airport: ap, flights: fls });
} catch (e) {
results.push({ airport: ap, flights: [], error: e.message });
}
}
} else {
if (!leg.fromAp || !leg.toAp) {
results.push({ airport: null, flights: [], error: "Missing airport codes" });
} else {
try {
const fls = await fetchFlights(leg.fromAp, leg.toAp, leg.date);
calls++;
results.push({ airport: null, flights: fls });
} catch (e) {
results.push({ airport: null, flights: [], error: e.message });
}
}
}
setFlights(prev => ({ ...prev, [leg.id]: results }));
setApiCalls(calls);
}
// ── HOTELS ─────────────────────────────────────────────────────────────────
for (let i = 0; i < stops.length; i++) {
const stop = stops[i];
const teams = stop.teams || [stop.team];
const stad = ST.find(s => s.abbr === teams[0].replace("+", ""));
const cityCode = (stad || {}).ap || null;
const nights = Math.max(1, Math.round((new Date(stop.depart) - new Date(stop.arrive)) /
const checkout = new Date(stop.depart);
checkout.setDate(checkout.getDate() + 1);
const coStr = checkout.toISOString().slice(0, 10);
setStatus("Searching hotels in " + stop.city + "...");
if (!cityCode) {
setHotels(prev => ({ ...prev, [i]: { error: "No airport code for " + stop.city, night
} else {
try {
const props = await fetchHotels(cityCode, stop.arrive, coStr);
calls++;
setHotels(prev => ({ ...prev, [i]: { properties: props, nights } }));
} catch (e) {
setHotels(prev => ({ ...prev, [i]: { error: e.message, nights } }));
}
}
setApiCalls(calls);
}
// ── TICKETS (direct buy links — no API needed) ─────────────────────────────
for (let i = 0; i < stops.length; i++) {
const stop = stops[i];
const games = stop.games || [];
const stopTickets = [];
for (const game of games.slice(0, 2)) {
const teams2 = stop.teams || [stop.team];
const stad = ST.find(s => s.abbr === teams2[0].replace("+", ""));
const teamSlug = ((stad || {}).team || stop.city).toLowerCase().replace(/\s+/g, "-").
stopTickets.push({
game,
links: [
{ label: "SeatGeek", url: "https://seatgeek.com/" + teamSlug + "-tickets" },
{ label: "StubHub", url: "https://www.stubhub.com/mlb-baseball-tickets/performe
{ label: "MLB.com", url: "https://www.mlb.com/tickets" },
],
});
}
setTickets(prev => ({ ...prev, [i]: stopTickets }));
}
setStatus("");
setLoading(false);
setFetched(true);
setApiCalls(calls);
};
// Flight card renderer — now clickable for selection
const FlightCard = ({ flight, legId, groupIdx, flightIdx }) => {
if (!flight) return null;
const depTime = flight.dep_time ? flight.dep_time.slice(11, 16) : "--:--";
const arrTime = flight.arr_time ? flight.arr_time.slice(11, 16) : "--:--";
const durStr = flight.duration ? flight.duration.replace("PT","").replace("H","h ").repla
const sel = selFlights[legId];
const isSelected = sel && sel.groupIdx === groupIdx && sel.flightIdx === flightIdx;
const handleClick = () => {
setSelFlights(prev => {
if (isSelected) { const copy = {...prev}; delete copy[legId]; return copy; }
return { ...prev, [legId]: { flight, groupIdx, flightIdx } };
});
};
return (
<div onClick={handleClick} style={{background: isSelected ? "#0f2a1f" : "#111827",borde
{isSelected && <span style={{position:"absolute",top:4,right:8,color:"#4ade80",fontSi
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
<div style={{display:"flex",alignItems:"center",gap:6}}>
<span style={{color:"#e2e8f0",fontSize:11,fontWeight:600}}>{flight.airline}</span
{flight.stops === 0 && <span style={{color:"#4ade80",fontSize:9}}>Nonstop</span>}
{flight.stops > 0 && <span style={{color:"#f59e0b",fontSize:9}}>({flight.stops} s
</div>
<span style={{color: isSelected ? "#4ade80" : "#e2e8f0",fontSize:14,fontWeight:800}
</div>
<div style={{display:"flex",justifyContent:"space-between",marginTop:4,color:"#94a3b8
<span>{depTime} {flight.dep_iata || ""}</span>
<span style={{color:"#64748b"}}>{durStr}</span>
<span>{arrTime} {flight.arr_iata || ""}</span>
</div>
</div>
);
};
return (
<div style={PS}>
<h3 style={{color:"#818cf8",margin:"0 0 10px",fontSize:14,fontFamily:"monospace",letter
<div style={{color:"#94a3b8",fontSize:11,marginBottom:12}}>
{trip.totalDays} days | {trip.route} | {trip.totalGames} games
</div>
{!fetched && !loading && (
<button onClick={fetchPricing} style={{padding:"14px",background:"linear-gradient(135
Fetch Live Prices (approx {legs.length + stops.length + Math.min(stops.reduce((s, s
</button>
)}
{loading && (
<div style={{padding:12,background:"#0a1628",borderRadius:8,marginBottom:14,textAlign
<div style={{color:"#818cf8",fontSize:12,fontWeight:600}}>{status}</div>
<div style={{color:"#475569",fontSize:10,marginTop:4}}>{apiCalls} API calls used</d
</div>
)}
{/* FLIGHTS SECTION */}
{Object.keys(flights).length > 0 && (
<div style={{marginBottom:16}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marg
<h4 style={{color:"#4ade80",fontSize:12,margin:0,letterSpacing:1,fontFamily:"mono
<span style={{color:"#64748b",fontSize:9,fontStyle:"italic"}}>Click to select one
</div>
{legs.map((leg, li) => {
const data = flights[leg.id];
if (!data) { return <div key={li} style={{color:"#475569",fontSize:10,marginBotto
return (
<div key={li} style={{background:"#0a1628",borderRadius:8,padding:10,marginBott
<div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
<span style={{color:"#e2e8f0",fontSize:12,fontWeight:700}}>{leg.from} to {l
<span style={{color:"#64748b",fontSize:10}}>{leg.date}</span>
</div>
{data.map((group, gi) => (
<div key={gi}>
{group.airport && <div style={{color:"#60a5fa",fontSize:10,fontWeight:600
{group.error && <div style={{color:"#fca5a5",fontSize:10}}>Error: {group.
{(group.flights || []).length === 0 && !group.error && <div style={{color
{(group.flights || []).map((f, fi) => <FlightCard key={fi} flight={f} leg
</div>
))}
</div>
);
})}
</div>
)}
{/* HOTELS SECTION */}
{Object.keys(hotels).length > 0 && (
<div style={{marginBottom:16}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marg
<h4 style={{color:"#f59e0b",fontSize:12,margin:0,letterSpacing:1,fontFamily:"mono
<span style={{color:"#64748b",fontSize:9,fontStyle:"italic"}}>Click to select one
</div>
{stops.map((stop, si) => {
const data = hotels[si];
if (!data) { return <div key={si} style={{color:"#475569",fontSize:10,marginBotto
if (data.error) { return <div key={si} style={{color:"#fca5a5",fontSize:10,margin
return (
<div key={si} style={{background:"#0a1628",borderRadius:8,padding:10,marginBott
<div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
<span style={{color:"#f59e0b",fontSize:12,fontWeight:700}}>{stop.city}</spa
<span style={{color:"#64748b",fontSize:10}}>{stop.arrive} to {stop.depart}
</div>
{(data.properties || []).map((h, hi) => {
const isHSel = selHotels[si] && selHotels[si].name === h.name && selHotels[
const handleHotelClick = () => {
setSelHotels(prev => {
if (isHSel) { const copy = {...prev}; delete copy[si]; return copy; }
return { ...prev, [si]: { ...h, _stopCity: stop.city, _arrive: stop.arr
});
};
return (
<div key={hi} onClick={handleHotelClick} style={{background: isHSel ? "#1a1
{isHSel && <span style={{position:"absolute",top:4,right:8,color:"#f59e0b
<div>
<div style={{color:"#e2e8f0",fontSize:11,fontWeight:600}}>{h.name}</div
<div style={{color:"#64748b",fontSize:9}}>
{h.rating ? h.rating + "-star" : ""}
{h.checkIn ? " | Check-in: " + h.checkIn : ""}
</div>
</div>
<div style={{textAlign:"right"}}>
<div style={{color: isHSel ? "#f59e0b" : "#4ade80",fontSize:13,fontWeig
{h.price ? "$" + parseFloat(h.price).toFixed(0) : "N/A"}
</div>
<div style={{color:"#64748b",fontSize:8}}>total stay</div>
</div>
</div>
);
})}
</div>
);
})}
</div>
)}
{/* TICKETS SECTION */}
{Object.keys(tickets).length > 0 && (
<div style={{marginBottom:16}}>
<h4 style={{color:"#e879f9",fontSize:12,margin:"0 0 8px",letterSpacing:1,fontFamily
{stops.map((stop, si) => {
const data = tickets[si];
if (!data) { return <div key={si} style={{color:"#475569",fontSize:10,marginBotto
return (
<div key={si} style={{background:"#0a1628",borderRadius:8,padding:10,marginBott
<div style={{color:"#e879f9",fontSize:12,fontWeight:700,marginBottom:6}}>{sto
{data.map((tkt, ti) => (
<div key={ti} style={{marginBottom:8}}>
<div style={{color:"#94a3b8",fontSize:10,marginBottom:4}}>
{tkt.game.date} vs {tkt.game.opponent} @ {tkt.game.time}
</div>
<div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
{(tkt.links || []).map((lnk, li) => (
<a key={li} href={lnk.url} target="_blank" rel="noreferrer"
style={{padding:"5px 10px",background:"#1e3a5f",borderRadius:5,colo
{lnk.label} →
</a>
))}
</div>
</div>
))}
</div>
);
})}
</div>
)}
{/* STICKY SELECTION CART BAR */}
{fetched && !reviewMode && (
<div style={{position:"sticky",bottom:0,left:0,right:0,background:"linear-gradient(13
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flex
<div style={{display:"flex",gap:16,alignItems:"center"}}>
<div style={{textAlign:"center"}}>
<div style={{color:"#4ade80",fontSize:16,fontWeight:900,fontFamily:"JetBrains
<div style={{color:"#64748b",fontSize:8,letterSpacing:1}}>FLIGHTS</div>
</div>
<div style={{textAlign:"center"}}>
<div style={{color:"#f59e0b",fontSize:16,fontWeight:900,fontFamily:"JetBrains
<div style={{color:"#64748b",fontSize:8,letterSpacing:1}}>HOTELS</div>
</div>
<div style={{width:1,height:28,background:"#334155"}} />
<div style={{textAlign:"center"}}>
<div style={{color:"#e2e8f0",fontSize:20,fontWeight:900,fontFamily:"JetBrains
<div style={{color:"#94a3b8",fontSize:8,letterSpacing:1}}>EST. TOTAL (flights
</div>
</div>
<button onClick={() => setReviewMode(true)}
disabled={totalCalc.flightCount === 0 && totalCalc.hotelCount === 0}
style={{padding:"10px 20px",background: (totalCalc.flightCount === 0 && totalCa
Review & Book →
</button>
</div>
{(totalCalc.flightCount < totalCalc.flightNeeded || totalCalc.hotelCount < totalCal
<div style={{color:"#94a3b8",fontSize:9,marginTop:6,textAlign:"center"}}>
Click on flights and hotels above to select them. Tap again to deselect.
</div>
)}
</div>
)}
{/* REVIEW & BOOK PANEL */}
{reviewMode && (
<div style={{background:"linear-gradient(135deg,#0a1628,#111827)",borderRadius:12,pad
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marg
<h3 style={{color:"#e2e8f0",margin:0,fontSize:16,fontWeight:900,letterSpacing:1,f
<button onClick={() => setReviewMode(false)} style={{padding:"6px 14px",backgroun
← Back to Selection
</button>
</div>
{/* Selected Flights */}
<div style={{marginBottom:20}}>
<h4 style={{color:"#4ade80",fontSize:13,margin:"0 0 10px",letterSpacing:1,fontFam
{legs.map((leg, li) => {
const sel = selFlights[leg.id];
return (
<div key={li} style={{background:"#111827",borderRadius:8,padding:10,marginBo
<div style={{display:"flex",justifyContent:"space-between",alignItems:"cent
<span style={{color:"#e2e8f0",fontSize:12,fontWeight:700}}>{leg.from} → {
<span style={{color:"#64748b",fontSize:10}}>{leg.date}</span>
</div>
{sel ? (
<div style={{display:"flex",justifyContent:"space-between",alignItems:"ce
<div>
<span style={{color:"#94a3b8",fontSize:11}}>{sel.flight.airline}</spa
{sel.flight.stops === 0 && <span style={{color:"#4ade80",fontSize:9,m
{sel.flight.stops > 0 && <span style={{color:"#f59e0b",fontSize:9,mar
<span style={{color:"#64748b",fontSize:10,marginLeft:8}}>
{sel.flight.dep_time ? sel.flight.dep_time.slice(11,16) : ""} → {se
</span>
</div>
<div style={{display:"flex",alignItems:"center",gap:8}}>
<span style={{color:"#4ade80",fontSize:14,fontWeight:800}}>${sel.flig
<a href={gFlightUrl(sel.flight.dep_iata || leg.fromAp || (leg.isFirst
target="_blank" rel="noreferrer"
style={{padding:"5px 10px",background:"#1e3a5f",borderRadius:5,colo
Book →
</a>
</div>
</div>
) : (
<div style={{color:"#475569",fontSize:10,fontStyle:"italic"}}>No flight s
)}
</div>
);
})}
</div>
{/* Selected Hotels */}
<div style={{marginBottom:20}}>
<h4 style={{color:"#f59e0b",fontSize:13,margin:"0 0 10px",letterSpacing:1,fontFam
{stops.map((stop, si) => {
const h = selHotels[si];
const checkout = new Date(stop.depart); checkout.setDate(checkout.getDate() + 1
const coStr = checkout.toISOString().slice(0,10);
return (
<div key={si} style={{background:"#111827",borderRadius:8,padding:10,marginBo
<div style={{display:"flex",justifyContent:"space-between",alignItems:"cent
<span style={{color:"#e2e8f0",fontSize:12,fontWeight:700}}>{stop.city}</s
<span style={{color:"#64748b",fontSize:10}}>{stop.arrive} to {stop.depart
</div>
{h ? (
<div style={{display:"flex",justifyContent:"space-between",alignItems:"ce
<div>
<span style={{color:"#94a3b8",fontSize:11}}>{h.name}</span>
{h.rating && <span style={{color:"#64748b",fontSize:9,marginLeft:6}}>
</div>
<div style={{display:"flex",alignItems:"center",gap:8}}>
<span style={{color:"#f59e0b",fontSize:14,fontWeight:800}}>${parseFlo
<a href={gHotelUrl(stop.city, stop.arrive, coStr)}
target="_blank" rel="noreferrer"
style={{padding:"5px 10px",background:"#1e3a5f",borderRadius:5,colo
Book →
</a>
</div>
</div>
) : (
<div style={{color:"#475569",fontSize:10,fontStyle:"italic"}}>No hotel se
)}
</div>
);
})}
</div>
{/* Ticket Links */}
{Object.keys(tickets).length > 0 && (
<div style={{marginBottom:20}}>
<h4 style={{color:"#e879f9",fontSize:13,margin:"0 0 10px",letterSpacing:1,fontF
{stops.map((stop, si) => {
const data = tickets[si];
if (!data) return null;
return (
<div key={si} style={{background:"#111827",borderRadius:8,padding:10,margin
<div style={{color:"#e879f9",fontSize:12,fontWeight:700,marginBottom:6}}>
{data.map((tkt, ti) => (
<div key={ti} style={{marginBottom:6}}>
<div style={{color:"#94a3b8",fontSize:10,marginBottom:4}}>
{tkt.game.date} vs {tkt.game.opponent} @ {tkt.game.time}
</div>
<div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
{(tkt.links || []).map((lnk, li) => (
<a key={li} href={lnk.url} target="_blank" rel="noreferrer"
style={{padding:"5px 10px",background:"#1e3a5f",borderRadius:5,
{lnk.label} →
</a>
))}
</div>
</div>
))}
</div>
);
})}
</div>
)}
{/* Grand Total */}
<div style={{background:"linear-gradient(135deg,#1e3a5f,#1e1b4b)",borderRadius:10,p
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",ma
<h4 style={{color:"#e2e8f0",margin:0,fontSize:15,fontWeight:900}}>Trip Total Es
<span style={{color:"#64748b",fontSize:10}}>{apiCalls} API calls used</span>
</div>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12,textAlign:"c
<div>
<div style={{color:"#4ade80",fontSize:20,fontWeight:900,fontFamily:"JetBrains
<div style={{color:"#64748b",fontSize:9,letterSpacing:1}}>FLIGHTS ({totalCalc
</div>
<div>
<div style={{color:"#f59e0b",fontSize:20,fontWeight:900,fontFamily:"JetBrains
<div style={{color:"#64748b",fontSize:9,letterSpacing:1}}>HOTELS ({totalCalc.
</div>
<div>
<div style={{color:"#e879f9",fontSize:20,fontWeight:900,fontFamily:"JetBrains
<div style={{color:"#64748b",fontSize:9,letterSpacing:1}}>TICKETS</div>
</div>
</div>
<div style={{borderTop:"1px solid #334155",paddingTop:12,textAlign:"center"}}>
<div style={{color:"#e2e8f0",fontSize:28,fontWeight:900,fontFamily:"JetBrains M
<div style={{color:"#94a3b8",fontSize:10,letterSpacing:1}}>ESTIMATED TOTAL (fli
<div style={{color:"#64748b",fontSize:9,marginTop:4}}>Ticket prices vary — use
</div>
</div>
<div style={{display:"flex",gap:8,marginTop:12}}>
<button onClick={() => setReviewMode(false)} style={{flex:1,padding:"10px",backgr
← Change Selections
</button>
<button onClick={() => { setFetched(false); setFlights({}); setHotels({}); setTic
style={{flex:1,padding:"10px",background:"#2563eb",border:"none",borderRadius:8
Refresh Prices
</button>
</div>
</div>
)}
</div>
);
}
export default function App() {
const [sel, setSel] = useState([]);
const [ha, setHa] = useState(HA[0]);
const [trip, setTrip] = useState(null);
const [tab, setTab] = useState("select");
const [userRoute, setUserRoute] = useState([]); // user-controlled order
const ss = useMemo(() => ST.filter(s => sel.includes(s.id)), [sel]);
// When selection changes, update userRoute: keep existing order, add new, remove deselecte
const prevSelRef = useRef([]);
useMemo(() => {
const prevIds = prevSelRef.current;
const newIds = sel.filter(id => !prevIds.includes(id));
const kept = userRoute.filter(s => sel.includes(s.id));
const added = newIds.map(id => ST.find(s => s.id === id)).filter(Boolean);
const updated = [...kept, ...added];
if (JSON.stringify(updated.map(s => s.id)) !== JSON.stringify(userRoute.map(s => s.id)))
setUserRoute(updated);
}
prevSelRef.current = sel;
}, [sel]);
// If a trip is selected, use its stop order for the map; otherwise use userRoute
const tripRoute = useMemo(() => {
if (!trip || !trip.stops) { return []; }
const stops = [];
for (const s of trip.stops) {
const tms = s.teams || [s.team];
for (const abbr of tms) {
const stad = ST.find(st => st.abbr === abbr);
if (stad && !stops.some(x => x.id === stad.id)) { stops.push(stad); }
}
}
return stops;
}, [trip]);
const mapRoute = tripRoute.length > 0 ? tripRoute : userRoute;
const tog = (id) => {
setSel(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);
setTrip(null);
};
const tabs = [
{ id: "select", label: "1. Select", dis: false },
{ id: "route", label: "2. Route", dis: sel.length < 2 },
{ id: "schedule", label: "3. Schedule", dis: sel.length < 2 },
{ id: "pricing", label: "4. Pricing", dis: !trip },
];
const totalMiles = mapRoute.length > 1
? Math.round(
mapRoute.reduce((s, x, i) => i === 0 ? s + hv(ha.lat, ha.lng, x.lat, x.lng) : s + hv(
hv(mapRoute[mapRoute.length-1].lat, mapRoute[mapRoute.length-1].lng, ha.lat, ha.lng)
)
: 0;
return (
<div style={{minHeight:"100vh",background:"#080f1e",color:"#e2e8f0",fontFamily:"Barlow,Se
<link href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;600;700;800;900&fa
<div style={{background:"linear-gradient(135deg,#0a1628,#111827,#0f172a)",borderBottom:
<div style={{maxWidth:1000,margin:"0 auto",display:"flex",alignItems:"center",justify
<div>
<h1 style={{margin:0,fontSize:22,fontWeight:900}}>MLB Stadium Trip Planner</h1>
<p style={{margin:"2px 0 0",color:"#64748b",fontSize:12,fontFamily:"JetBrains Mon
</div>
<div style={{display:"flex",alignItems:"center",gap:8}}>
<span style={{color:"#64748b",fontSize:11}}>Depart:</span>
<select value={ha.code} onChange={e => setHa(HA.find(a => a.code === e.target.val
{HA.map(a => <option key={a.code} value={a.code}>{a.code} - {a.name}</option>)}
</select>
</div>
</div>
</div>
<div style={{maxWidth:1000,margin:"0 auto",padding:"16px 20px"}}>
<StadiumMap stadiums={ST} selected={sel} route={mapRoute} homeAirport={ha} onToggle={
<div style={{display:"flex",gap:4,margin:"16px 0",background:"#0a1628",borderRadius:1
{tabs.map(t => (
<button key={t.id} onClick={() => { if (!t.dis) { setTab(t.id); } }} style={{flex
{t.label}
</button>
))}
</div>
{tab === "select" && <Selector selected={sel} onToggle={tog} onAll={() => setSel(ST.m
{tab === "route" && <RouteView route={userRoute} ha={ha} onReorder={setUserRoute}/>}
{tab === "schedule" && <Schedule route={userRoute} ha={ha} onTrip={(t) => { setTrip(t
{tab === "pricing" && <Pricing trip={trip} ha={ha}/>}
<div style={{display:"flex",justifyContent:"center",gap:24,marginTop:20,paddingTop:16
<div style={{textAlign:"center"}}>
<div style={{color:"#4ade80",fontSize:22,fontWeight:900,fontFamily:"JetBrains Mon
<div style={{color:"#64748b",fontSize:10,letterSpacing:1}}>STADIUMS</div>
</div>
<div style={{textAlign:"center"}}>
<div style={{color:"#f59e0b",fontSize:22,fontWeight:900,fontFamily:"JetBrains Mon
<div style={{color:"#64748b",fontSize:10,letterSpacing:1}}>TOTAL MILES</div>
</div>
<div style={{textAlign:"center"}}>
<div style={{color:"#818cf8",fontSize:22,fontWeight:900,fontFamily:"JetBrains Mon
<div style={{color:"#64748b",fontSize:10,letterSpacing:1}}>REMAINING</div>
</div>
</div>
</div>
</div>
);
}
