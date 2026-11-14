(function () {
"use strict";
var $x = function (id) { return document.getElementById(id); };
var sv = $x("shopView");
if (typeof db === "undefined" || !sv) { return; }

var st = document.createElement("style");
st.textContent = [
".fnet{font-size:22px;font-weight:800}",
".frow{display:flex;justify-content:space-between;gap:8px;padding:9px 0;border-top:1px solid var(--border);font-size:14px}",
".frow.t{font-weight:800;font-size:16px}",
".fcat{font-size:13px;color:var(--muted);margin:8px 0}",
".fbtns{display:flex;gap:8px;margin-top:12px}.fbtns button{margin:0;flex:1}",
"select.fsel{width:100%;padding:12px 13px;font-size:16px;border-radius:11px;border:1px solid var(--border);background:var(--field);color:var(--text)}",
".fclean select{width:auto;padding:8px;border-radius:9px;border:1px solid var(--border);background:var(--field);color:var(--text);font-size:14px}",
".fclean .fbtns button{font-size:13px;padding:10px 4px}"
].join("\n");
document.head.appendChild(st);

var FX = {
fr: {
netTitle:"Bénéfice net", pToday:"Aujourd’hui", p7:"7 jours", pMonth:"Ce mois", pPrev:"Mois dernier",
lSales:"Ventes", lCogs:"− Coût des produits vendus", lGross:"= Marge brute", lLoss:"− Pertes", lExp:"− Dépenses", lNet:"= Bénéfice net",
netHelp:"Acheter du stock n’est pas une dépense : son coût est compté quand tu vends, ou comme perte si le produit est perdu.",
noCost:"⚠️ {n} vente(s) n’ont pas de coût d’achat enregistré : le bénéfice peut être trop élevé.",
addExp:"Ajouter une dépense", declLoss:"Déclarer une perte",
expTitle:"Dépenses de la période", lossTitle:"Pertes de la période", none:"Rien pour cette période.",
del:"Supprimer", undo:"Annuler",
confDelExp:"Supprimer cette dépense ?", confUndoLoss:"Annuler cette perte ? Le stock revient.",
eCat:"Type de dépense", eNote:"Détail (facultatif)", eAmt:"Montant (FC)", eDate:"Date", eSave:"Enregistrer la dépense",
eHelp:"Mets seulement les dépenses de la boutique. Pas les dépenses personnelles (nourriture, école…) et pas l’achat de stock : sinon le bénéfice net est faux.",
cat_loyer:"Loyer", cat_transport:"Transport", cat_electricite:"Électricité, eau, internet", cat_salaire:"Salaire du vendeur",
cat_taxes:"Taxes et patente", cat_emballage:"Emballages (sacs…)", cat_autre:"Autre dépense de la boutique",
lLot:"Produit perdu (lot)", lQty:"Quantité perdue (pièces)", lWhy:"Raison", lSave:"Déclarer la perte", lEst:"Perte estimée : ",
lNoLots:"Aucun produit en stock.", lExpOn:"expire le",
lHelp:"Pour retirer un produit perdu du stock, utilise cette page. Si tu le supprimes dans Produits, la perte n’est pas comptée et le bénéfice net est trop beau.",
why_casse:"Cassé / abîmé", why_vol:"Volé / disparu", why_expire:"Expiré", why_offert:"Offert / usage personnel", why_autre:"Autre",
badNum:"Écris un montant valide.", badQty:"Quantité invalide.", badDate:"La date ne peut pas être dans le futur.",
hTitle:"Historique des ventes",
hHelp:"Supprimer une vente change tes statistiques et ton bénéfice. Le stock ne revient pas. Pour corriger une vente faite par erreur, utilise « Annuler » dans Ventes.",
hSales:"{n} vente(s)", hProfit:"bénéfice", hSee:"Voir", hHide:"Masquer", hDelDay:"Supprimer le jour",
confDelDay:"Supprimer les {n} vente(s) du {d} ? Les statistiques changent et le stock ne revient pas.",
confDelSale:"Supprimer cette vente ? Les statistiques changent et le stock ne revient pas.",
cTitle:"Nettoyer l’ancien", cHelp:"Efface ce qui a plus de :", cMonths:"{n} mois",
cSales:"Ventes", cExp:"Dépenses", cLoss:"Pertes", cNone:"Rien à effacer.",
cConf:"Effacer {n} ligne(s) de plus de {m} mois ? Les statistiques de ces périodes seront perdues."
},
sw: {
netTitle:"Faida safi", pToday:"Leo", p7:"Siku 7", pMonth:"Mois huu", pPrev:"Mois iliyopita",
lSales:"Ventes", lCogs:"− Gharama ya produits zilizouzwa", lGross:"= Marge brute", lLoss:"− Hasara", lExp:"− Dépenses", lNet:"= Faida safi",
netHelp:"Kununua stock si dépense : gharama yake inahesabiwa ukiuza, au kama hasara ikipotea.",
noCost:"⚠️ Ventes {n} hazina gharama ya kununua : faida inaweza kuwa kubwa kuliko ukweli.",
addExp:"Ongeza dépense", declLoss:"Andika hasara",
expTitle:"Dépenses za période", lossTitle:"Hasara za période", none:"Hakuna kitu kwa période hii.",
del:"Futa", undo:"Ghairi",
confDelExp:"Kufuta dépense hii ?", confUndoLoss:"Kughairi hasara hii ? Stock inarudi.",
eCat:"Aina ya dépense", eNote:"Maelezo (si lazima)", eAmt:"Kiasi (FC)", eDate:"Date", eSave:"Hifadhi dépense",
eHelp:"Weka tu dépenses za boutique. Si dépenses binafsi (chakula, shule…) wala kununua stock : vinginevyo faida safi inakuwa si sahihi.",
cat_loyer:"Loyer", cat_transport:"Transport", cat_electricite:"Umeme, maji, internet", cat_salaire:"Mshahara wa muuzaji",
cat_taxes:"Taxes na patente", cat_emballage:"Emballages (mifuko…)", cat_autre:"Dépense nyingine ya boutique",
lLot:"Produit iliyopotea (lot)", lQty:"Idadi iliyopotea (pièces)", lWhy:"Sababu", lSave:"Andika hasara", lEst:"Hasara inayokadiriwa : ",
lNoLots:"Hakuna produit kwenye stock.", lExpOn:"inaisha tarehe",
lHelp:"Kuondoa produit iliyopotea kwenye stock, tumia ukurasa huu. Ukiifuta kwenye Produits, hasara haihesabiwi na faida safi inakuwa nzuri kuliko ukweli.",
why_casse:"Imevunjika / imeharibika", why_vol:"Imeibiwa / imepotea", why_expire:"Imeisha muda", why_offert:"Zawadi / matumizi binafsi", why_autre:"Nyingine",
badNum:"Andika kiasi sahihi.", badQty:"Idadi si sahihi.", badDate:"Date haiwezi kuwa ya baadaye.",
hTitle:"Historique ya ventes",
hHelp:"Kufuta vente kunabadilisha statistiques na faida yako. Stock hairudi. Kurekebisha vente iliyofanywa kwa kosa, tumia « Ghairi » kwenye Ventes.",
hSales:"Ventes {n}", hProfit:"faida", hSee:"Ona", hHide:"Ficha", hDelDay:"Futa siku",
confDelDay:"Kufuta ventes {n} za {d} ? Statistiques zinabadilika na stock hairudi.",
confDelSale:"Kufuta vente hii ? Statistiques zinabadilika na stock hairudi.",
cTitle:"Safisha ya zamani", cHelp:"Futa kilicho na zaidi ya :", cMonths:"mois {n}",
cSales:"Ventes", cExp:"Dépenses", cLoss:"Hasara", cNone:"Hakuna cha kufuta.",
cConf:"Kufuta mistari {n} ya zaidi ya mois {m} ? Statistiques za périodes hizo zitapotea."
}
};
function F(k, v) {
  var s = (FX[L] && FX[L][k]) || FX.fr[k] || k;
  if (v) { for (var i in v) { s = s.replace("{" + i + "}", v[i]); } }
  return s;
}
function money(n) { n = Math.round(Number(n) * 100) / 100; return n.toLocaleString("fr-FR", { maximumFractionDigits: 2 }) + " FC"; }
function cents(x) { return Math.round(Number(x) * 100); }
function lub(d) { return d.toLocaleDateString("en-CA", { timeZone: "Africa/Lubumbashi" }); }
function fmt(d) { return d ? String(d).slice(0, 10).split("-").reverse().join("/") : "-"; }
function period(p) {
  var now = new Date(), today = lub(now);
  if (p === "today") { return [today, today]; }
  if (p === "7") { return [lub(new Date(now.getTime() - 6 * 864e5)), today]; }
  if (p === "month") { return [today.slice(0, 8) + "01", today]; }
  var y = +today.slice(0, 4), m = +today.slice(5, 7);
  return [new Date(Date.UTC(y, m - 2, 1)).toISOString().slice(0, 10), new Date(Date.UTC(y, m - 1, 0)).toISOString().slice(0, 10)];
}
function rng(from, to) {
  var a = new Date(from + "T00:00:00+02:00"), b = new Date(new Date(to + "T00:00:00+02:00").getTime() + 864e5);
  return [a.toISOString(), b.toISOString()];
}

var CATS = ["loyer", "transport", "electricite", "salaire", "taxes", "emballage", "autre"];
var WHYS = ["casse", "vol", "expire", "offert", "autre"];
var per = localStorage.getItem("finPer") || "month";

document.body.insertAdjacentHTML("beforeend",
  '<div id="fsh" class="sheet hidden"><div class="sheetin"><div class="sheetbar"><button id="fshBack" class="small" type="button">←</button><b id="fshTitle"></b></div><div id="fshBody"></div></div></div>');
function openSheet(title, html) {
  $x("fshTitle").textContent = title;
  $x("fshBody").innerHTML = html;
  $x("fsh").classList.remove("hidden");
  $x("fsh").scrollTop = 0;
}
function closeSheet() { $x("fsh").classList.add("hidden"); }
$x("fshBack").addEventListener("click", closeSheet);
function say(id, text, bad) {
  var r = $x(id);
  if (r) { r.style.color = bad ? "var(--error)" : "var(--ok)"; r.textContent = text; }
}

/* ---------- Bénéfice net ---------- */
function finHtml() {
  var tabs = [["today", "pToday"], ["7", "p7"], ["month", "pMonth"], ["prev", "pPrev"]].map(function (t) {
    return '<button type="button" class="tab ' + (per === t[0] ? "on" : "") + '" data-fx="per" data-v="' + t[0] + '">' + F(t[1]) + "</button>";
  }).join("");
  return '<div id="fin"><h3>' + F("netTitle") + '</h3><div class="evt">' + tabs + '</div><div id="finBox"><p class="hint">…</p></div>' +
    '<div class="fbtns"><button class="main" type="button" data-fx="addexp">' + F("addExp") + '</button><button class="link" type="button" data-fx="loss">' + F("declLoss") + "</button></div>" +
    '<div id="finLists"></div></div>';
}
async function paintFin() {
  var box = $x("finBox");
  if (!box) { return; }
  var pr = period(per), rg = rng(pr[0], pr[1]);
  var r = await db.rpc("finance_summary", { p_from: pr[0], p_to: pr[1] });
  if (!$x("finBox")) { return; }
  if (r.error) { box.innerHTML = '<p class="rouge" style="font-size:14px">' + esc(r.error.message) + "</p>"; return; }
  var d = r.data && r.data[0];
  if (!d) { box.innerHTML = '<p class="hint">' + F("none") + "</p>"; return; }
  var s = Number(d.tot_sales) || 0, c = Number(d.tot_cogs) || 0, l = Number(d.tot_losses) || 0, e = Number(d.tot_expenses) || 0;
  var gross = (cents(s) - cents(c)) / 100, net = (cents(s) - cents(c) - cents(l) - cents(e)) / 100;
  var mar = s > 0 ? Math.round(gross / s * 100) : 0;
  box.innerHTML =
    '<div class="frow"><span>' + F("lSales") + "</span><span>" + money(s) + "</span></div>" +
    '<div class="frow"><span>' + F("lCogs") + "</span><span>" + money(c) + "</span></div>" +
    '<div class="frow"><span>' + F("lGross") + " (" + mar + " %)</span><span>" + money(gross) + "</span></div>" +
    '<div class="frow"><span>' + F("lLoss") + "</span><span>" + money(l) + "</span></div>" +
    '<div class="frow"><span>' + F("lExp") + "</span><span>" + money(e) + "</span></div>" +
    '<div class="frow t"><span>' + F("lNet") + '</span><span class="fnet ' + (net >= 0 ? "vert" : "rouge") + '">' + money(net) + "</span></div>" +
    '<p class="hint">' + F("netHelp") + "</p>" +
    (Number(d.n_nocost) > 0 ? '<div class="alrt o">' + F("noCost", { n: d.n_nocost }) + "</div>" : "");
  var ex = await db.from("expenses").select("*").eq("shop_id", shopId).gte("day", pr[0]).lte("day", pr[1]).order("day", { ascending: false }).order("created_at", { ascending: false });
  var ls = await db.from("losses").select("*").eq("shop_id", shopId).gte("created_at", rg[0]).lt("created_at", rg[1]).order("created_at", { ascending: false });
  var lists = $x("finLists");
  if (!lists) { return; }
  var h = "<h3>" + F("expTitle") + "</h3>";
  var exr = ex.data || [], lsr = ls.data || [], bycat = {};
  if (!exr.length) { h += '<p class="hint">' + F("none") + "</p>"; }
  else {
    exr.forEach(function (x) { bycat[x.category] = (bycat[x.category] || 0) + cents(x.amount); });
    h += '<p class="fcat">' + Object.keys(bycat).map(function (k) { return F("cat_" + k) + " : " + money(bycat[k] / 100); }).join(" · ") + "</p>";
    exr.forEach(function (x) {
      h += '<div class="ligne"><span>' + esc(F("cat_" + x.category)) + (x.note ? " · " + esc(x.note) : "") + "<br><small>" + fmt(x.day) + " · " + money(x.amount) +
        '</small></span><button class="small" type="button" data-fx="delexp" data-id="' + x.id + '">' + F("del") + "</button></div>";
    });
  }
  h += "<h3>" + F("lossTitle") + "</h3>";
  if (!lsr.length) { h += '<p class="hint">' + F("none") + "</p>"; }
  lsr.forEach(function (x) {
    h += '<div class="ligne"><span>' + esc(x.product_name) + " × " + x.qty + " · " + esc(F("why_" + x.reason)) + "<br><small>" + fmt(x.created_at) + " · " + money(x.qty * Number(x.unit_cost)) +
      '</small></span><button class="small" type="button" data-fx="undoloss" data-id="' + x.id + '">' + F("undo") + "</button></div>";
  });
  lists.innerHTML = h;
}

/* ---------- Ajouter une dépense ---------- */
function sheetExp() {
  var today = lub(new Date());
  openSheet(F("addExp"),
    '<p class="hint">' + F("eHelp") + "</p>" +
    '<label class="lb" for="exC">' + F("eCat") + '</label><select id="exC" class="fsel">' + CATS.map(function (k) { return '<option value="' + k + '">' + F("cat_" + k) + "</option>"; }).join("") + "</select>" +
    '<label class="lb" for="exN">' + F("eNote") + '</label><input id="exN">' +
    '<label class="lb" for="exA">' + F("eAmt") + '</label><input id="exA" type="number" inputmode="decimal">' +
    '<label class="lb" for="exD">' + F("eDate") + '</label><input id="exD" type="date" value="' + today + '" max="' + today + '">' +
    '<button class="main" type="button" data-fx="saveexp">' + F("eSave") + '</button><div class="nres" id="exRes"></div>');
}
async function saveExp() {
  var amt = parseFloat($x("exA").value), today = lub(new Date()), day = $x("exD").value || today;
  if (!(amt > 0)) { return say("exRes", F("badNum"), true); }
  if (day > today) { return say("exRes", F("badDate"), true); }
  var r = await db.from("expenses").insert({ shop_id: shopId, category: $x("exC").value, note: $x("exN").value.trim() || null, amount: amt, day: day });
  if (r.error) { return say("exRes", r.error.message, true); }
  closeSheet();
  paintFin();
}

/* ---------- Déclarer une perte ---------- */
var LOTS = [];
async function sheetLoss() {
  openSheet(F("declLoss"), '<p class="hint">…</p>');
  var r = await db.from("products").select("*").eq("shop_id", shopId).gt("quantity", 0).order("name");
  LOTS = r.data || [];
  if (!LOTS.length) { $x("fshBody").innerHTML = '<p class="hint">' + F("lNoLots") + "</p>"; return; }
  $x("fshBody").innerHTML =
    '<p class="hint">' + F("lHelp") + "</p>" +
    '<label class="lb" for="lsL">' + F("lLot") + '</label><select id="lsL" class="fsel">' +
    LOTS.map(function (p) {
      return '<option value="' + p.id + '">' + esc(p.name) + (p.expiry_date ? " — " + F("lExpOn") + " " + fmt(p.expiry_date) : "") + " — " + p.quantity + "</option>";
    }).join("") + "</select>" +
    '<label class="lb" for="lsQ">' + F("lQty") + '</label><input id="lsQ" type="number" inputmode="numeric" value="1">' +
    '<label class="lb" for="lsW">' + F("lWhy") + '</label><select id="lsW" class="fsel">' + WHYS.map(function (k) { return '<option value="' + k + '">' + F("why_" + k) + "</option>"; }).join("") + "</select>" +
    '<p class="hint" id="lsE"></p><button class="main" type="button" data-fx="saveloss">' + F("lSave") + '</button><div class="nres" id="lsRes"></div>';
  estLoss();
}
function curLot() { var id = $x("lsL") && $x("lsL").value; return LOTS.filter(function (x) { return x.id === id; })[0]; }
function estLoss() {
  var l = curLot(), q = parseInt($x("lsQ").value, 10) || 0;
  $x("lsE").textContent = l && q > 0 ? F("lEst") + money(q * Number(l.buy_price)) : "";
}
async function saveLoss() {
  var l = curLot(), q = parseInt($x("lsQ").value, 10);
  if (!l || !(q >= 1) || q > l.quantity) { return say("lsRes", F("badQty"), true); }
  var r = await db.rpc("declare_loss", { p_product: l.id, p_qty: q, p_reason: $x("lsW").value });
  if (r.error) { return say("lsRes", r.error.message, true); }
  closeSheet();
  afficher();
}

/* ---------- Historique des ventes (avec suppression) ---------- */
var HOPEN = {};
async function paintHist() {
  var box = $x("histList");
  if (!box) { return; }
  var rg = rng(lub(new Date(Date.now() - 59 * 864e5)), lub(new Date())), all = [];
  for (var p = 0; p < 5; p++) {
    var r = await db.from("sales").select("id,created_at,amount,cost,qty,product_name").eq("shop_id", shopId)
      .gte("created_at", rg[0]).lt("created_at", rg[1]).order("created_at", { ascending: false }).range(p * 1000, p * 1000 + 999);
    if (r.error) { box.innerHTML = '<p class="rouge" style="font-size:14px">' + esc(r.error.message) + "</p>"; return; }
    all = all.concat(r.data || []);
    if (!r.data || r.data.length < 1000) { break; }
  }
  if (!$x("histList")) { return; }
  var days = {}, keys = [];
  all.forEach(function (s) {
    var k = lub(new Date(s.created_at));
    if (!days[k]) { days[k] = { rows: [], a: 0, g: 0 }; keys.push(k); }
    days[k].rows.push(s); days[k].a += cents(s.amount); days[k].g += cents(s.amount) - cents(s.cost || 0);
  });
  var h = "";
  keys.forEach(function (k) {
    var d = days[k], open = HOPEN[k];
    h += '<div class="ligne"><span><b>' + fmt(k) + "</b><br><small>" + F("hSales", { n: d.rows.length }) + " · " + money(d.a / 100) + " · " + F("hProfit") + " " + money(d.g / 100) +
      '</small></span><span style="white-space:nowrap"><button class="small" type="button" data-fx="hopen" data-d="' + k + '">' + (open ? F("hHide") : F("hSee")) + "</button>" +
      '<button class="small" type="button" data-fx="delday" data-d="' + k + '" data-cnt="' + d.rows.length + '">' + F("hDelDay") + "</button></span></div>";
    if (open) {
      d.rows.forEach(function (s) {
        h += '<div class="frow"><span>' + esc(s.product_name) + " × " + (s.qty || 1) + "</span><span>" + money(s.amount) +
          ' <button class="small" type="button" data-fx="delsale" data-id="' + s.id + '">×</button></span></div>';
      });
    }
  });
  box.innerHTML = h || '<p class="hint">' + F("none") + "</p>";
}

/* ---------- Nettoyer l'ancien ---------- */
function cleanHtml() {
  return '<div id="clean" class="grp fclean"><h4><span>' + F("cTitle") + '</span></h4><p class="hint">' + F("cHelp") + " " +
    '<select id="cMon">' + [3, 6, 12].map(function (n) { return '<option value="' + n + '"' + (n === 6 ? " selected" : "") + ">" + F("cMonths", { n: n }) + "</option>"; }).join("") + "</select></p>" +
    '<div class="fbtns"><button class="link" type="button" data-fx="clean" data-w="sales">' + F("cSales") + '</button><button class="link" type="button" data-fx="clean" data-w="expenses">' + F("cExp") +
    '</button><button class="link" type="button" data-fx="clean" data-w="losses">' + F("cLoss") + "</button></div></div>";
}

/* ---------- Mise en place dans la page Stats ---------- */
function ensure() {
  var eb = $x("evoBox");
  if (!eb || typeof shopId === "undefined" || !shopId) { return; }
  if (!$x("fin")) { eb.insertAdjacentHTML("beforebegin", finHtml()); paintFin(); }
  if (!$x("clean")) { eb.insertAdjacentHTML("afterend", cleanHtml()); }
  if (!$x("hist")) {
    var title = (T[L] && T[L].eList) || "Détail";
    var h3 = Array.prototype.filter.call(eb.querySelectorAll("h3"), function (x) { return x.textContent.trim() === title; })[0];
    if (h3) {
      var n = h3.nextElementSibling;
      while (n && n.tagName !== "H3") { var nx = n.nextElementSibling; n.style.display = "none"; n = nx; }
      h3.style.display = "none";
      h3.insertAdjacentHTML("beforebegin", '<div id="hist"><h3>' + F("hTitle") + '</h3><p class="hint">' + F("hHelp") + '</p><div id="histList"><p class="hint">…</p></div></div>');
      paintHist();
    }
  }
}
new MutationObserver(ensure).observe(sv, { childList: true, subtree: true });
ensure();

/* ---------- Clics ---------- */
document.addEventListener("input", function (e) { if (e.target.id === "lsQ") { estLoss(); } });
document.addEventListener("change", function (e) { if (e.target.id === "lsL") { estLoss(); } });
document.addEventListener("click", async function (e) {
  var b = e.target.closest("[data-fx]");
  if (!b) { return; }
  var a = b.dataset.fx, id = b.dataset.id;
  if (a === "per") {
    per = b.dataset.v; localStorage.setItem("finPer", per);
    document.querySelectorAll('#fin [data-fx="per"]').forEach(function (x) { x.classList.toggle("on", x.dataset.v === per); });
    paintFin();
  }
  else if (a === "addexp") { sheetExp(); }
  else if (a === "saveexp") { await saveExp(); }
  else if (a === "loss") { sheetLoss(); }
  else if (a === "saveloss") { await saveLoss(); }
  else if (a === "delexp") {
    if (!confirm(F("confDelExp"))) { return; }
    var r = await db.from("expenses").delete().eq("id", id);
    if (r.error) { alert(r.error.message); return; }
    paintFin();
  }
  else if (a === "undoloss") {
    if (!confirm(F("confUndoLoss"))) { return; }
    var r2 = await db.rpc("undo_loss", { p_id: id });
    if (r2.error) { alert(r2.error.message); return; }
    afficher();
  }
  else if (a === "hopen") { HOPEN[b.dataset.d] = !HOPEN[b.dataset.d]; paintHist(); }
  else if (a === "delday") {
    if (!confirm(F("confDelDay", { n: b.dataset.cnt, d: fmt(b.dataset.d) }))) { return; }
    var g = rng(b.dataset.d, b.dataset.d);
    var r3 = await db.from("sales").delete().eq("shop_id", shopId).gte("created_at", g[0]).lt("created_at", g[1]);
    if (r3.error) { alert(r3.error.message); return; }
    afficher();
  }
  else if (a === "delsale") {
    if (!confirm(F("confDelSale"))) { return; }
    var r4 = await db.from("sales").delete().eq("id", id);
    if (r4.error) { alert(r4.error.message); return; }
    afficher();
  }
  else if (a === "clean") {
    var m = parseInt($x("cMon").value, 10), w = b.dataset.w;
    var dry = await db.rpc("clean_old", { p_what: w, p_months: m, p_dry: true });
    if (dry.error) { alert(dry.error.message); return; }
    if (!dry.data) { alert(F("cNone")); return; }
    if (!confirm(F("cConf", { n: dry.data, m: m }))) { return; }
    var r5 = await db.rpc("clean_old", { p_what: w, p_months: m, p_dry: false });
    if (r5.error) { alert(r5.error.message); return; }
    afficher();
  }
});
})();
