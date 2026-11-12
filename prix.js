(function () {
"use strict";
var $x = function (id) { return document.getElementById(id); };
if (typeof db === "undefined") { return; }

var st = document.createElement("style");
st.textContent = [
".pricebox{margin:12px 0;padding:16px 12px;border-radius:16px;text-align:center;background:linear-gradient(135deg,rgba(31,94,255,.18),rgba(31,157,107,.18));border:1px solid var(--border)}",
".pricebox small{display:block;font-size:12px;color:var(--muted);letter-spacing:.3px}",
".pricebox strong{display:block;font-size:28px;line-height:1.2;margin:6px 0}",
".pricebox .tot{display:block;font-size:15px;font-weight:700}",
".pricebox.warn{border-color:var(--warn);background:var(--field)}",
".pricebox.warn strong{font-size:17px}",
".pricebox button{margin-top:10px}"
].join("\n");
document.head.appendChild(st);

Object.assign(T.fr, {
pbTitle:"Prix de l’abonnement", pbPerMonth:"par mois", pbNone:"Aucun prix défini",
pbNoneOwner:"Les boutiques ne savent pas combien payer. Écris le prix plus bas.", pbGo:"Écrire le prix",
pbHint:"Écris seulement le prix pour 1 mois. Exemple : 5000", pbTotal:"À payer pour {n} mois : ",
pbNoneShop:"Le prix n’est pas encore défini. Contacte Dukyo."
});
Object.assign(T.sw, {
pbTitle:"Bei ya abonnement", pbPerMonth:"kwa mois", pbNone:"Hakuna bei bado",
pbNoneOwner:"Boutiques hazijui kiasi cha kulipa. Andika bei hapa chini.", pbGo:"Andika bei",
pbHint:"Andika tu bei ya mois 1. Mfano : 5000", pbTotal:"Kulipa kwa mois {n} : ",
pbNoneShop:"Bei haijawekwa bado. Wasiliana na Dukyo."
});
function P(k, v) {
  var s = (T[L] && T[L][k]) || T.fr[k] || k;
  if (v) { for (var i in v) { s = s.replace("{" + i + "}", v[i]); } }
  return s;
}
function num(v) {
  if (!v || !/^[\d\s.,]+$/.test(v.trim())) { return null; }
  var n = parseFloat(v.replace(/\s/g, "").replace(",", "."));
  return isNaN(n) ? null : n;
}
function fc(n) { return (Math.round(n * 100) / 100).toLocaleString("fr-FR", { maximumFractionDigits: 2 }) + " FC"; }
function big(v) {
  var n = num(v);
  return n !== null ? fc(n) + " <span style='font-size:15px;font-weight:600'>" + P("pbPerMonth") + "</span>" : esc(v);
}
async function getPrice() {
  var r = await db.from("app_settings").select("v").eq("k", "price_text").maybeSingle();
  return (r.data && r.data.v || "").trim();
}
window.dukyoGoPrice = function () {
  var i = $x("pPrice");
  if (i) { i.scrollIntoView({ behavior: "smooth", block: "center" }); setTimeout(function () { i.focus(); }, 400); }
};

var busy = {};
async function ownBox() {
  var own = $x("own");
  if (!own || own.classList.contains("hidden") || own.querySelector(".pricebox") || busy.own) { return; }
  var isPay = !!$x("pPrice"), isHome = !!own.querySelector(".stats");
  if (!isPay && !isHome) { return; }
  busy.own = 1;
  var v = await getPrice();
  busy.own = 0;
  if (own.querySelector(".pricebox")) { return; }
  var box = v
    ? '<div class="pricebox"><small>' + P("pbTitle") + "</small><strong>" + big(v) + "</strong></div>"
    : '<div class="pricebox warn"><small>' + P("pbTitle") + "</small><strong>" + P("pbNone") + '</strong><small style="margin-top:4px">' + P("pbNoneOwner") + "</small>" +
      (isPay ? '<button class="main" type="button" onclick="dukyoGoPrice()">' + P("pbGo") + "</button>" : "") + "</div>";
  var anchor = isPay ? own.querySelector("h2") : own.querySelector("p.sub");
  if (anchor) { anchor.insertAdjacentHTML("afterend", box); }
  var inp = $x("pPrice");
  if (inp) {
    inp.placeholder = "5000";
    inp.setAttribute("inputmode", "decimal");
    var hp = inp.previousElementSibling;
    if (hp && hp.classList.contains("sub")) { hp.textContent = P("pbHint"); }
  }
}

async function shopBox(c) {
  if (!c || c.querySelector(".pricebox") || busy[c.id]) { return; }
  var h3 = c.querySelector("h3");
  if (!h3) { return; }
  busy[c.id] = 1;
  var v = await getPrice();
  busy[c.id] = 0;
  if (c.querySelector(".pricebox")) { return; }
  c.querySelectorAll("p.sub").forEach(function (p) {
    if (p.children.length === 1 && p.firstElementChild.tagName === "B") { p.style.display = "none"; }
  });
  var unit = num(v), sel = c.querySelector("#aboM");
  var box = v
    ? '<div class="pricebox"><small>' + P("pbTitle") + "</small><strong>" + big(v) + '</strong><span class="tot" id="pbTot"></span></div>'
    : '<div class="pricebox warn"><strong>' + P("pbNone") + '</strong><small style="margin-top:4px">' + P("pbNoneShop") + "</small></div>";
  h3.insertAdjacentHTML("afterend", box);
  var tot = $x("pbTot");
  if (tot && unit !== null && sel) {
    var upd = function () { tot.textContent = P("pbTotal", { n: sel.value }) + fc(unit * parseInt(sel.value, 10)); };
    sel.addEventListener("change", upd);
    upd();
  }
}

function check() {
  ownBox();
  var a = $x("pAbo"), g = $x("gateAbo");
  if (a && !a.classList.contains("hidden")) { shopBox(a); }
  if (g) { shopBox(g); }
}
new MutationObserver(check).observe(document.body, { childList: true, subtree: true });
check();
})();
