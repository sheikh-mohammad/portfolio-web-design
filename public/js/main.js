/* MAIN.JS — theme, masthead menu, copy-email, scroll spy */

(function () {
  "use strict";

  /* ---------- THEME ---------- */
  var themeToggle = document.getElementById("themeToggle");
  var html = document.documentElement;
  var saved = null;
  try { saved = localStorage.getItem("theme"); } catch (e) { /* no-op */ }
  html.setAttribute("data-theme", saved === "dark" ? "dark" : "light");

  themeToggle.addEventListener("click", function () {
    var next = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) { /* no-op */ }
  });

  /* ---------- MASTHEAD MENU (mobile) ---------- */
  var menuToggle = document.getElementById("menuToggle");
  var mastNav = document.getElementById("mastNav");

  function setMenu(open) {
    menuToggle.setAttribute("aria-expanded", String(open));
    if (window.matchMedia("(max-width: 40rem)").matches) {
      mastNav.setAttribute("aria-hidden", String(!open));
    } else {
      mastNav.removeAttribute("aria-hidden");
    }
  }

  menuToggle.addEventListener("click", function () {
    setMenu(menuToggle.getAttribute("aria-expanded") !== "true");
  });

  mastNav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      setMenu(false);
    });
  });

  window.addEventListener("resize", function () {
    setMenu(false);
  });

  setMenu(false);

  /* ---------- COPY EMAIL ---------- */
  var copyBtn = document.getElementById("copyEmail");
  var copyHint = document.getElementById("copyHint");
  var EMAIL = "sheikhmohammadahmed07@gmail.com";

  copyBtn.addEventListener("click", function () {
    var done = function () {
      copyHint.textContent = "copied";
      copyHint.setAttribute("data-copied", "true");
      window.setTimeout(function () {
        copyHint.textContent = "click to copy";
        copyHint.removeAttribute("data-copied");
      }, 2500);
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(EMAIL).then(done, function () { done(); });
    } else {
      done();
    }
  });

  /* ---------- SMOOTH ANCHOR SCROLL ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      var href = anchor.getAttribute("href");
      if (href === "#" || href === "#top" && window.location.hash === "#top") return;
      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
        history.replaceState(null, "", href);
      }
    });
  });

  /* ---------- SCROLL SPY ---------- */
  var links = Array.prototype.slice.call(mastNav.querySelectorAll(".masthead__link"));
  var sections = links
    .map(function (l) { return document.querySelector(l.getAttribute("href")); })
    .filter(Boolean);

  var spy = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var id = "#" + entry.target.id;
      links.forEach(function (l) {
        var active = l.getAttribute("href") === id;
        l.setAttribute("aria-current", active ? "true" : "false");
      });
    });
  }, { rootMargin: "-40% 0px -55% 0px" });

  sections.forEach(function (s) { spy.observe(s); });
})();
