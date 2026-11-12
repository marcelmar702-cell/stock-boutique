(function () {
"use strict";
var $x = function (id) { return document.getElementById(id); };
if (typeof db === "undefined") { return; }

var st = document.createElement("style");
st.textContent = [
".nbox{margin-top:18px;padding:14px;border-radius:16px;background:var(--field);border:1px solid var(--border)}",
".nbox h3{margin:0 0 6px}",
".nbox ol{margin:8px 0 0;padding-left:20px;line-height:1.55;font-size:14px}",
".ntopic{display:flex;gap:8px;align-items:center;margin:8px 0}",
".ntopic code{flex:1;word-break:break-all;padding:10px;border-radius:10px;border:1px dashed var(--border);font-size:13px;user-select:all}",
".ntopic button{margin:0;white-space:nowrap}",
".nres{font-size:13px;margin-top:8px;min-height:18px}"
].join("\n");
document.head.appendChild(st);

Object.assign(T.fr, {
nTitle:"🔔 Alertes sur ton téléphone",
nWhat:"Tu es prévenu même quand Dukyo est fermé : produits proches de l’expiration (chaque matin à 7 h), fin d’abonnement, confirmation de ton paiement.",
n1:"Installe l’application gratuite ntfy (Play Store).",
n2:"Dans ntfy, touche + puis écris ce nom exactement, puis Subscribe :",
n3:"Android : Paramètres, Applications, ntfy, Batterie, Sans restriction.",
nCopy:"Copier", nCopied:"Copié ✓", nTest:"Envoyer un test", nSent:"Test envoyé. Si ton téléphone a sonné, touche « Ça marche ».",
nOk:"Ça marche", nDone:"✅ Alertes activées.",
nBanner:"🔔 Active les alertes sur ton téléphone pour ne rien rater.", nGo:"Activer"
});
Object.assign(T.sw, {
nTitle:"🔔 Alertes kwenye simu yako",
nWhat:"Utaarifiwa hata Dukyo ikiwa imefungwa : produits zinakaribia kuisha (kila asubuhi, 7 h), mwisho wa abonnement, confirmation ya paiement yako.",
n1:"Weka application ya bure ntfy (Play Store).",
n2:"Kwenye ntfy, bonyeza + kisha andika jina hili kama lilivyo, kisha Subscribe :",
n3:"Android : Paramètres, Applications, ntfy, Batterie, Sans restriction.",
nCopy:"Copier", nCopied:"Imecopié ✓", nTest:"Tuma test", nSent:"Test imetumwa. Kama simu imelia, bonyeza « Inafanya kazi ».",
nOk:"Inafanya kazi", nDone:"✅ Alertes zimewashwa.",
nBanner:"🔔 Washa alertes kwenye simu yako ili usipitwe.", nGo:"Washa"
});
function N(k) { return (T[L] && T[L][k]) || T.fr[k] || k; }

var busy = false;
async function box(c) {
  if (!c || c.querySelector("#nbox") || busy || !c.querySelector("h3")) { return; }
  busy = true;
  var r = await db.from("shops").select("id,notify_topic").limit(1);
  busy = false;
  if (c.querySelector("#nbox") || r.error || !r.data || !r.data.length || !r.data[0].notify_topic) { return; }
  var s = r.data[0], done = !!localStorage.getItem("notif_ok_" + s.id);
  var h = '<div class="nbox" id="nbox"><h3>' + N("nTitle") + '</h3><p class="hint">' + N("nWhat") + "</p>";
  if (done) { h += '<p class="hint"><b>' + N("nDone") + "</b></p>"; }
  h += "<ol><li>" + N("n1") + "</li><li>" + N("n2") +
    '<div class="ntopic"><code id="ntopic">' + esc(s.notify_topic) + '</code><button class="small" type="button" data-n="copy">' + N("nCopy") + "</button></div></li>" +
    "<li>" + N("n3") + "</li></ol>" +
    '<button class="main" type="button" data-n="test">' + N("nTest") + '</button><div class="nres" id="nres"></div>' +
    '<button class="link" type="button" data-n="ok" data-id="' + s.id + '">' + N("nOk") + "</button></div>";
  c.insertAdjacentHTML("beforeend", h);
}

function banner() {
  var sv = $x("shopView");
  if (!sv || sv.classList.contains("hidden") || $x("notifBanner")) { return; }
  if (!sv.querySelector(".sirene, .okmsg:not(#notifBanner)")) { return; }
  if (typeof shopId === "undefined" || !shopId || localStorage.getItem("notif_ok_" + shopId)) { return; }
  sv.insertAdjacentHTML("beforeend",
    '<div class="okmsg" id="notifBanner" style="border-left-color:var(--warn)">' + N("nBanner") +
    ' <button class="small" type="button" data-n="go" style="margin:6px 0 0">' + N("nGo") + "</button></div>");
}

function check() {
  var a = $x("pAbo");
  if (a && !a.classList.contains("hidden")) { box(a); }
  banner();
}
new MutationObserver(check).observe(document.body, { childList: true, subtree: true });
check();

document.addEventListener("click", async function (e) {
  var b = e.target.closest("[data-n]");
  if (!b) { return; }
  var a = b.dataset.n, res = $x("nres");
  if (a === "copy") {
    var t = $x("ntopic").textContent;
    try { await navigator.clipboard.writeText(t); b.textContent = N("nCopied"); setTimeout(function () { b.textContent = N("nCopy"); }, 1600); }
    catch (x) { var rg = document.createRange(); rg.selectNodeContents($x("ntopic")); var sl = getSelection(); sl.removeAllRanges(); sl.addRange(rg); }
  } else if (a === "test") {
    res.style.color = "var(--muted)"; res.textContent = "…";
    var r = await db.rpc("test_my_notification");
    res.style.color = r.error ? "var(--error)" : "var(--ok)";
    res.textContent = r.error ? r.error.message : N("nSent");
  } else if (a === "ok") {
    localStorage.setItem("notif_ok_" + b.dataset.id, "1");
    var nb = $x("notifBanner"); if (nb) { nb.remove(); }
    res.style.color = "var(--ok)"; res.textContent = N("nDone");
  } else if (a === "go") {
    if (window.dukyoShopGo) { window.dukyoShopGo("abo"); }
  }
});
})();
