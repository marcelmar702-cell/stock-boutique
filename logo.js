(function () {
"use strict";
var st = document.createElement("style");
st.textContent = [
".minilogo svg,.biglogo svg{display:none}",
".dklogo{display:block;width:52px;height:52px;border-radius:12px;background:#000}",
".dkbig{display:block;width:min(300px,86%);height:auto;margin:0 auto 12px;border-radius:20px;background:#000}"
].join("\n");
document.head.appendChild(st);

var mini = document.querySelector(".minilogo");
if (mini) { mini.innerHTML = '<img class="dklogo" src="logo.png" alt="Dukyo">'; }
var big = document.querySelector(".biglogo");
if (big) { big.innerHTML = '<img class="dkbig" src="logo.png" alt="Dukyo">'; }

function url(f) { return new URL(f, location.href).href; }
document.querySelectorAll('link[rel="icon"],link[rel="apple-touch-icon"],link[rel="manifest"]').forEach(function (l) { l.remove(); });
var ic = document.createElement("link");
ic.rel = "icon"; ic.type = "image/png"; ic.href = url("icon-192.png");
document.head.appendChild(ic);
var ap = document.createElement("link");
ap.rel = "apple-touch-icon"; ap.href = url("icon-192.png");
document.head.appendChild(ap);

var base = location.origin + location.pathname.replace(/[^/]*$/, "");
var man = {
  name: "Dukyo", short_name: "Dukyo", description: "Gérez mieux. Développez plus.",
  id: base, start_url: base, scope: base, display: "standalone", orientation: "portrait",
  background_color: "#000000", theme_color: "#1f5eff", lang: "fr",
  icons: [
    { src: url("icon-192.png"), sizes: "192x192", type: "image/png", purpose: "any" },
    { src: url("icon-512.png"), sizes: "512x512", type: "image/png", purpose: "any" },
    { src: url("icon-maskable-512.png"), sizes: "512x512", type: "image/png", purpose: "maskable" }
  ]
};
var ml = document.createElement("link");
ml.rel = "manifest";
ml.href = URL.createObjectURL(new Blob([JSON.stringify(man)], { type: "application/manifest+json" }));
document.head.appendChild(ml);
})();
