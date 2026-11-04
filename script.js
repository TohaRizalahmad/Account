
document.documentElement.className += " js";

(function () {
 var LEBAR = 740;
 var de = document.documentElement;
 function fit() {
  de.style.zoom = "";
  var sw = screen.width, iw = window.innerWidth;
  if (navigator.maxTouchPoints > 0 && sw > 0 && sw <= 600) {
   de.style.zoom = iw / LEBAR;
  }
 }
 fit();
 window.addEventListener("orientationchange", function () { setTimeout(fit, 300); });
})();

document.addEventListener("DOMContentLoaded", function () {
 (function () {
  var items = document.querySelectorAll(".soc-grid > *");
  items.forEach(function (el, i) {
   el.classList.add("reveal");
   el.style.setProperty("--i", i);
   el.style.setProperty("--sd", (1.2 + ((i * 0.618) % 1) * 5).toFixed(2) + "s");
   el.style.setProperty("--sp", (4.2 + ((i * 0.382) % 1) * 2.8).toFixed(2) + "s");
  });
  if (!("IntersectionObserver" in window)) {
   items.forEach(function (el) { el.classList.add("in"); });
   return;
  }
  var io = new IntersectionObserver(function (entries) {
   var n = 0;
   entries.forEach(function (e) {
    if (!e.isIntersecting) return;
    e.target.style.setProperty("--d", Math.min(n++ * 80, 720) + "ms");
    e.target.classList.add("in");
    io.unobserve(e.target);
   });
  }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
  items.forEach(function (el) { io.observe(el); });
 })();

 window.addEventListener("pageshow", function (e) {
  if (e.persisted && document.activeElement && document.activeElement.blur) {
   document.activeElement.blur();
  }
 });

 var btn = document.getElementById("copy");
 btn.addEventListener("click", function () {
  function done() { btn.textContent = "Tersalin"; setTimeout(function () { btn.textContent = "Salin email"; }, 1800); }
  function fallback() {
   var r = document.createRange();
   r.selectNodeContents(document.getElementById("addr"));
   var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
   btn.textContent = "Tekan salin";
  }
  try { navigator.clipboard.writeText("toharizalahmad24@gmail.com").then(done, fallback); }
  catch (e) { fallback(); }
 });
 document.querySelectorAll(".copy[data-copy]").forEach(function (b) {
  var label = b.textContent;
  b.addEventListener("click", function () {
   var t = b.getAttribute("data-copy");
   function done() { b.textContent = "Tersalin"; setTimeout(function () { b.textContent = label; }, 1800); }
   function fallback() {
    var el = b.closest(".soc-card").querySelector(".id-text");
    var r = document.createRange(); r.selectNodeContents(el);
    var sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(r);
    b.textContent = "Tekan salin";
   }
   try { navigator.clipboard.writeText(t).then(done, fallback); } catch (e) { fallback(); }
  });
 });
});
