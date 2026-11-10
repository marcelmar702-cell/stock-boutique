(function () {
"use strict";
var $x = function (id) { return document.getElementById(id); };
var sv = $x("shopView");
if (!sv || typeof db === "undefined") { return; }

var st = document.createElement("style");
st.textContent = [
".evt{display:flex;gap:6px;margin:10px 0}.evt .tab{font-size:13px}",
".leg{display:flex;gap:14px;font-size:12px;color:var(--muted);margin:6px 0}",
".leg i{display:inline-block;width:10px;height:10px;border-radius:3px;margin-right:5px;vertical-align:middle}",
".evsvg{width:100%;height:auto;display:block}",
".evrow{display:flex;justify-content:space-between;gap:8px;padding:8px 0;border-top:1px solid var(--border);font-size:14px}"
].join("\n");
document.head.appendChild(st);

Object.assign(T.fr, {
evo:"Évolution", eDay:"Jours", eWeek:"Semaines", eMonth:"Mois",
eSales:"Ventes", eProfit:"Bénéfice", eMargin:"Marge",
eNowDay:"Aujourd’hui", eNowWeek:"Cette semaine", eNowMonth:"Ce mois-ci",
eVs:"Comparé à la période d’avant", eTop:"Produits qui rapportent le plus (30 jours)",
ePcs:"pièces", eNone:"Pas encore de ventes. Le graphique apparaît après ta première vente.", eList:"Détail"
});
Object.assign(T.sw, {
evo:"Maendeleo", eDay:"Siku", eWeek:"Semaines", eMonth:"Mois",
eSales:"Ventes", eProfit:"Faida", eMargin:"Marge",
eNowDay:"Leo", eNowWeek:"Semaine hii", eNowMonth:"Mois huu",
eVs:"Ukilinganisha na période ya kabla", eTop:"Produits zinazoleta faida zaidi (siku 30)",
ePcs:"pièces", eNone:"Hakuna ventes bado. Graphique inaonekana baada ya vente ya kwanza.", eList:"Maelezo"
});

function Y(k) { return (T[L] && T[L][k]) || T.fr[k] || k; }
function money(n) { return (Math.round(Number(n) * 100) / 100).toLocaleString("fr-FR", { maximumFractionDigits: 2 }) + " FC"; }
function pct(cur, prev) {
  if (!(prev > 0)) { return ""; }
  var p = Math.round((cur - prev) / prev * 100);
  return ' <span class="' + (p >= 0 ? "vert" : "rouge") + '">' + (p >= 0 ? "+" : "") + p + " %</span>";
}

var mode = localStorage.getItem("evoMode") || "day";
var rows = [];

async function loadRows() {
  var all = [], from = new Date();
  from.setMonth(from.getMonth() - 12); from.setHours(0, 0, 0, 0);
  for (var p = 0; p < 10; p++) {
    var r = await db.from("sales").select("created_at,amount,cost,qty,product_name")
      .eq("shop_id", shopId).gte("created_at", from.toISOString()).order("created_at").range(p * 1000, p * 1000 + 999);
    if (r.error) { break; }
    all = all.concat(r.data || []);
    if (!r.data || r.data.length < 1000) { break; }
  }
  return all;
}

function build(m) {
  var n = m === "day" ? 7 : m === "week" ? 8 : 6, out = [], t = new Date();
  t.setHours(0, 0, 0, 0);
  for (var i = n - 1; i >= 0; i--) {
    var s, e, lab;
    if (m === "day") {
      s = new Date(t); s.setDate(t.getDate() - i);
      e = new Date(s); e.setDate(s.getDate() + 1);
      lab = s.toLocaleDateString("fr-FR", { weekday: "short", day: "numeric" }).replace(".", "");
    } else if (m === "week") {
      s = new Date(t); s.setDate(t.getDate() - ((t.getDay() + 6) % 7) - 7 * i);
      e = new Date(s); e.setDate(s.getDate() + 7);
      lab = ("0" + s.getDate()).slice(-2) + "/" + ("0" + (s.getMonth() + 1)).slice(-2);
    } else {
      s = new Date(t.getFullYear(), t.getMonth() - i, 1);
      e = new Date(t.getFullYear(), t.getMonth() - i + 1, 1);
      lab = s.toLocaleDateString("fr-FR", { month: "short" }).replace(".", "");
    }
    out.push({ s: s, e: e, lab: lab, sales: 0, profit: 0 });
  }
  return out;
}

function chart(ps) {
  var W = 320, n = ps.length, gw = W / n, bw = gw * 0.3, max = 1;
  ps.forEach(function (p) { if (p.sales > max) { max = p.sales; } });
  var g = '<line x1="0" y1="130" x2="' + W + '" y2="130" style="stroke:var(--border)"/>';
  ps.forEach(function (p, i) {
    var h1 = Math.max(0, p.sales) / max * 110, h2 = Math.max(0, p.profit) / max * 110;
    var x = i * gw + gw * 0.18;
    g += '<rect x="' + x + '" y="' + (130 - h1) + '" width="' + bw + '" height="' + h1 + '" rx="3" style="fill:var(--accent)"/>';
    g += '<rect x="' + (x + bw + 2) + '" y="' + (130 - h2) + '" width="' + bw + '" height="' + h2 + '" rx="3" style="fill:#1f9d6b"/>';
    g += '<text x="' + (i * gw + gw / 2) + '" y="146" text-anchor="middle" font-size="9" style="fill:var(--muted)">' + p.lab + "</text>";
  });
  return '<svg class="evsvg" viewBox="0 0 ' + W + ' 150" role="img">' + g + "</svg>";
}

function html() {
  if (!rows.length) { return "<h3>" + Y("evo") + '</h3><p class="hint">' + Y("eNone") + "</p>"; }
  var ps = build(mode);
  rows.forEach(function (r) {
    var d = new Date(r.created_at);
    for (var i = 0; i < ps.length; i++) {
      if (d >= ps[i].s && d < ps[i].e) {
        ps[i].sales += Number(r.amount);
        ps[i].profit += Number(r.amount) - Number(r.cost || 0);
        break;
      }
    }
  });
  var cur = ps[ps.length - 1], prev = ps[ps.length - 2];
  var now = mode === "day" ? Y("eNowDay") : mode === "week" ? Y("eNowWeek") : Y("eNowMonth");
  var marge = cur.sales > 0 ? Math.round(cur.profit / cur.sales * 100) : 0;
  var h = "<h3>" + Y("evo") + '</h3><div class="evt">';
  [["day", "eDay"], ["week", "eWeek"], ["month", "eMonth"]].forEach(function (b) {
    h += '<button type="button" class="tab ' + (mode === b[0] ? "on" : "") + '" data-e="' + b[0] + '">' + Y(b[1]) + "</button>";
  });
  h += '</div><div class="leg"><span><i style="background:var(--accent)"></i>' + Y("eSales") +
    '</span><span><i style="background:#1f9d6b"></i>' + Y("eProfit") + "</span></div>" + chart(ps);
  h += '<div class="evrow"><b>' + now + '</b><span class="hint" style="margin:0">' + Y("eVs") + "</span></div>" +
    '<div class="evrow"><span>' + Y("eSales") + "</span><span>" + money(cur.sales) + pct(cur.sales, prev.sales) + "</span></div>" +
    '<div class="evrow"><span>' + Y("eProfit") + "</span><span>" + money(cur.profit) + pct(cur.profit, prev.profit) + "</span></div>" +
    '<div class="evrow"><span>' + Y("eMargin") + "</span><span>" + marge + " %</span></div>";
  h += "<h3>" + Y("eList") + "</h3>";
  ps.slice().reverse().forEach(function (p) {
    h += '<div class="evrow"><span>' + p.lab + "</span><span>" + money(p.sales) + ' · <span class="' + (p.profit >= 0 ? "vert" : "rouge") + '">' + money(p.profit) + "</span></span></div>";
  });
  var from30 = new Date(); from30.setDate(from30.getDate() - 30); from30.setHours(0, 0, 0, 0);
  var m = {}, keys = [];
  rows.forEach(function (r) {
    if (new Date(r.created_at) < from30) { return; }
    var k = String(r.product_name).trim().toLowerCase();
    if (!m[k]) { m[k] = { name: r.product_name, qty: 0, profit: 0 }; keys.push(k); }
    m[k].qty += Number(r.qty || 1);
    m[k].profit += Number(r.amount) - Number(r.cost || 0);
  });
  keys.sort(function (a, b) { return m[b].profit - m[a].profit; });
  if (keys.length) {
    h += "<h3>" + Y("eTop") + "</h3>";
    keys.slice(0, 5).forEach(function (k) {
      h += '<div class="evrow"><span>' + esc(m[k].name) + " (" + m[k].qty + " " + Y("ePcs") + ")</span><span>" + money(m[k].profit) + "</span></div>";
    });
  }
  return h;
}

async function paint() {
  rows = await loadRows();
  var box = $x("evo");
  if (box) { box.innerHTML = html(); }
}
function tryInsert() {
  var stats = sv.querySelector(".stats");
  if ($x("evo") || !sv.querySelector(".alrt") || !stats) { return; }
  var box = document.createElement("div");
  box.id = "evo";
  box.innerHTML = '<p class="hint">…</p>';
  stats.insertAdjacentElement("afterend", box);
  paint();
}
new MutationObserver(tryInsert).observe(sv, { childList: true });
tryInsert();

document.addEventListener("click", function (e) {
  var b = e.target.closest("[data-e]");
  if (!b) { return; }
  mode = b.dataset.e;
  localStorage.setItem("evoMode", mode);
  var box = $x("evo");
  if (box) { box.innerHTML = html(); }
});
})();
