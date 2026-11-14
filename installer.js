(function () {
"use strict";
var $x = function (id) { return document.getElementById(id); };

var st = document.createElement("style");
st.textContent = ".nbox.ncol>*:not(h3):not(.ndone){display:none}.ndone{margin:6px 0 0}";
document.head.appendChild(st);

var IX = {
  fr: { install:"Installer l’application", ncDone:"✅ Alertes activées.", ncMore:"Revoir les étapes",
        how:"Pour installer Dukyo : touche le menu ⋮ de Chrome, puis « Installer l’application » (ou « Ajouter à l’écran d’accueil »). Sur iPhone : bouton Partager, puis « Sur l’écran d’accueil »." },
  sw: { install:"Weka application", ncDone:"✅ Alertes zimewashwa.", ncMore:"Ona hatua tena",
        how:"Kuweka Dukyo : bonyeza menu ⋮ ya Chrome, kisha « Installer l’application » (au « Ajouter à l’écran d’accueil »). Kwenye iPhone : kitufe Partager, kisha « Sur l’écran d’accueil »." }
};
function IT(k) { return (IX[L] && IX[L][k]) || IX.fr[k] || k; }

/* ---------- Icône dessinée en code ---------- */
function icon(size) {
  var c = document.createElement("canvas");
  c.width = c.height = size;
  var x = c.getContext("2d");
  x.fillStyle = "#ffffff";
  x.fillRect(0, 0, size, size);
  var s = size * 0.62 / 1190;
  x.save();
  x.translate((size - 1190 * s) / 2 - 80 * s, (size - 850 * s) / 2 - 40 * s);
  x.scale(s, s);
  var g = x.createLinearGradient(220, 45, 1255, 885);
  g.addColorStop(0, "#06185c"); g.addColorStop(0.55, "#0a46c8"); g.addColorStop(1, "#2a9bff");
  x.fillStyle = g;
  x.fill(new Path2D("M275 45H720C1010 45 1240 200 1255 385L1050 330C1030 260 920 215 740 215L520 220C400 222 300 260 220 320Z"));
  x.fill(new Path2D("M150 635L440 618L412 735C700 650 950 650 1145 685C1010 820 780 885 500 885H95Z"));
  var o = x.createLinearGradient(60, 0, 1070, 0);
  o.addColorStop(0, "#ffb000"); o.addColorStop(1, "#ff4d00");
  x.fillStyle = o;
  x.fill(new Path2D("M225 392C100 440 55 520 85 570C150 640 400 600 700 568C900 560 1000 570 1070 578C700 580 330 650 120 600C20 560 60 450 225 392Z"));
  x.restore();
  return c.toDataURL("image/png");
}

/* ---------- Manifeste : Dukyo devient installable ---------- */
try {
  var base = location.origin + location.pathname.replace(/[^/]*$/, "");
  var man = {
    name: "Dukyo", short_name: "Dukyo", description: "Gère mieux ta boutique. Développe-la plus.",
    id: base, start_url: base, scope: base, display: "standalone", orientation: "portrait",
    background_color: "#ffffff", theme_color: "#1f5eff", lang: "fr",
    icons: [
      { src: icon(192), sizes: "192x192", type: "image/png", purpose: "any maskable" },
      { src: icon(512), sizes: "512x512", type: "image/png", purpose: "any maskable" }
    ]
  };
  document.querySelectorAll('link[rel="manifest"]').forEach(function (l) { l.remove(); });
  var ml = document.createElement("link");
  ml.rel = "manifest";
  ml.href = URL.createObjectURL(new Blob([JSON.stringify(man)], { type: "application/manifest+json" }));
  document.head.appendChild(ml);
  var ap = document.createElement("link");
  ap.rel = "apple-touch-icon"; ap.href = icon(180);
  document.head.appendChild(ap);
  var m1 = document.createElement("meta"); m1.name = "apple-mobile-web-app-capable"; m1.content = "yes"; document.head.appendChild(m1);
  var m2 = document.createElement("meta"); m2.name = "apple-mobile-web-app-title"; m2.content = "Dukyo"; document.head.appendChild(m2);
} catch (e) {}
if ("serviceWorker" in navigator) { navigator.serviceWorker.register("sw.js").catch(function () {}); }

/* ---------- Bouton Installer dans le menu profil ---------- */
var DP = null;
window.addEventListener("beforeinstallprompt", function (e) { e.preventDefault(); DP = e; });
function standalone() { return (window.matchMedia && matchMedia("(display-mode: standalone)").matches) || navigator.standalone; }
var pm = $x("pmenu");
if (pm) {
  new MutationObserver(function () {
    if (pm.classList.contains("hidden") || pm.querySelector("[data-xi]") || standalone()) { return; }
    if (pm.dataset.mode !== "shop" && pm.dataset.mode !== "owner") { return; }
    var out = pm.querySelector("button.out");
    if (out) { out.insertAdjacentHTML("beforebegin", '<button type="button" data-xi="1">' + IT("install") + "</button>"); }
  }).observe(pm, { childList: true });
  pm.addEventListener("click", function (e) {
    if (!e.target.closest("[data-xi]")) { return; }
    pm.classList.add("hidden");
    if (DP) { DP.prompt(); DP = null; } else { alert(IT("how")); }
  });
}

/* ---------- Boîte des notifications : se ferme après « Ça marche » ---------- */
function collapse() {
  var b = $x("nbox");
  if (!b || b.dataset.col) { return; }
  var ok = b.querySelector('[data-n="ok"]');
  if (!ok || !localStorage.getItem("notif_ok_" + ok.dataset.id)) { return; }
  b.dataset.col = "1";
  b.classList.add("ncol");
  b.querySelector("h3").insertAdjacentHTML("afterend",
    '<p class="hint ndone"><b>' + IT("ncDone") + '</b> <a href="#" data-nc="1" style="color:var(--accent);text-decoration:underline">' + IT("ncMore") + "</a></p>");
}
new MutationObserver(collapse).observe(document.body, { childList: true, subtree: true });
document.addEventListener("click", function (e) {
  if (e.target.closest('[data-n="ok"]')) { collapse(); return; }
  var more = e.target.closest("[data-nc]");
  if (more) {
    e.preventDefault();
    var b = $x("nbox");
    if (b) { b.classList.remove("ncol"); var d = b.querySelector(".ndone"); if (d) { d.remove(); } }
  }
});
collapse();
})();
