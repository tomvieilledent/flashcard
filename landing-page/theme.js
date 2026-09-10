/* Bascule de thème auto → clair → sombre → auto. Persisté (localStorage).
   Chargé en <head> (bloquant) : le data-theme est posé avant le 1er rendu. */
(function () {
  var KEY = "vlldnt:theme";
  var root = document.documentElement;

  function apply(t) {
    if (t === "light" || t === "dark") root.setAttribute("data-theme", t);
    else root.removeAttribute("data-theme");
  }

  var stored = null;
  try { stored = localStorage.getItem(KEY); } catch (e) {}
  apply(stored);

  document.addEventListener("DOMContentLoaded", function () {
    var btn = document.getElementById("theme-toggle");
    if (!btn) return;

    function refresh() {
      var cur = root.getAttribute("data-theme") || "auto";
      btn.dataset.state = cur;
      btn.setAttribute(
        "aria-label",
        "Thème : " + cur + ". Cliquer pour changer."
      );
    }

    btn.hidden = false;
    refresh();

    btn.addEventListener("click", function () {
      var cur = root.getAttribute("data-theme"); // null | "light" | "dark"
      var next = cur === null ? "light" : cur === "light" ? "dark" : null;
      apply(next);
      try {
        if (next) localStorage.setItem(KEY, next);
        else localStorage.removeItem(KEY);
      } catch (e) {}
      refresh();
    });
  });
})();
