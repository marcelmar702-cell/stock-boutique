(function () {
"use strict";
var st = document.createElement("style");
st.textContent = [
".pmenu{max-height:calc(100vh - 80px);max-height:calc(100dvh - 80px);overflow-y:auto;overscroll-behavior:contain;-webkit-overflow-scrolling:touch}",
".pmenu button.out{position:sticky;bottom:0;background:var(--bg2)}"
].join("\n");
document.head.appendChild(st);

var want = new URL("manifest.webmanifest?v=1", location.href).href;
function fixManifest() {
  var ok = false;
  document.querySelectorAll('link[rel="manifest"]').forEach(function (l) {
    if (!ok && l.href === want) { ok = true; } else { l.remove(); }
  });
  if (!ok) {
    var m = document.createElement("link");
    m.rel = "manifest"; m.href = want;
    document.head.appendChild(m);
  }
}
fixManifest();
})();
