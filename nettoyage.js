(function () {
"use strict";
var $x = function (id) { return document.getElementById(id); };
if (typeof db === "undefined") { return; }

var CX = {
  fr: { del:"Supprimer", all:"Effacer tout l’historique",
        c1:"Supprimer cette ligne de l’historique ?",
        cA:"Effacer tout l’historique des paiements ? Ton registre de revenus est conservé." },
  sw: { del:"Futa", all:"Futa historique yote",
        c1:"Kufuta mstari huu wa historique ?",
        cA:"Kufuta historique yote ya paiements ? Registre ya mapato yako inabaki." }
};
function C(k) { return (CX[L] && CX[L][k]) || CX.fr[k] || k; }

var busy = false;
async function attach() {
  var own = $x("own");
  if (!own || own.classList.contains("hidden") || busy) { return; }
  var h3 = Array.prototype.filter.call(own.querySelectorAll("h3"), function (h) { return h.textContent.trim() === "Historique"; })[0];
  if (!h3 || h3.dataset.cl) { return; }
  busy = true;
  var r = await db.from("payment_requests").select("id").neq("status", "pending").order("created_at", { ascending: false }).limit(10);
  busy = false;
  if (!h3.isConnected) { setTimeout(attach, 50); return; }
  if (h3.dataset.cl) { return; }
  h3.dataset.cl = "1";
  var cards = [], n = h3.nextElementSibling;
  while (n && n.tagName !== "H3") { if (n.classList.contains("shopc")) { cards.push(n); } n = n.nextElementSibling; }
  var rows = r.data || [];
  if (cards.length === rows.length) {
    cards.forEach(function (c, i) {
      c.insertAdjacentHTML("beforeend", '<div class="row"><button class="small" type="button" data-cl="one" data-id="' + rows[i].id + '">' + C("del") + "</button></div>");
    });
  }
  var last = cards[cards.length - 1];
  if (last) { last.insertAdjacentHTML("afterend", '<button class="link" type="button" data-cl="all">' + C("all") + "</button>"); }
}
new MutationObserver(attach).observe(document.body, { childList: true, subtree: true });
attach();

document.addEventListener("click", async function (e) {
  var b = e.target.closest("button[data-cl]");
  if (!b) { return; }
  if (b.dataset.cl === "one") {
    if (!confirm(C("c1"))) { return; }
    var r = await db.rpc("delete_payment_history", { p_id: b.dataset.id });
    if (r.error) { alert(r.error.message); return; }
    afficher();
  } else if (b.dataset.cl === "all") {
    if (!confirm(C("cA"))) { return; }
    var r2 = await db.rpc("delete_payment_history");
    if (r2.error) { alert(r2.error.message); return; }
    afficher();
  }
});
})();
