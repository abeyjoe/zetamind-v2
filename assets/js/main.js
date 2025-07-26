(function () {
  "use strict";

  const header = document.querySelector(".ud-header");
  const logo = document.querySelector(".header-logo");
  const backToTop = document.querySelector(".back-to-top");
  const navbarToggler = document.querySelector("#navbarToggler");
  const navbarCollapse = document.querySelector("#navbarCollapse");
  const themeSwitcher = document.getElementById("themeSwitcher");

  // ========= Sticky Scroll Handler =========
  const handleScroll = () => {
    const isDark = document.documentElement.classList.contains("dark");

    header.classList.add("sticky"); // Always apply sticky styles

    // Back to top
    if (window.scrollY > 50) {
      backToTop.style.display = "flex";
    } else {
      backToTop.style.display = "none";
    }

    // Logo update
    if (logo) {
      if (window.scrollY > 0) {
        logo.src = "assets/images/logo/zetamind-logo.png";
      } else {
        logo.src = isDark
          ? "assets/images/logo/zetamind-logo-white.png"
          : "assets/images/logo/zetamind-logo.png";
      }
    }
  };

  window.addEventListener("scroll", handleScroll);
  window.addEventListener("load", () => {
    handleScroll(); // Apply correct styles on load
    checkTheme();   // Ensure dark/light mode on initial load
  });

  // ========= Scroll To Top =========
  function scrollToTop(element, to = 0, duration = 500) {
    const start = element.scrollTop;
    const change = to - start;
    const increment = 20;
    let currentTime = 0;

    const animateScroll = () => {
      currentTime += increment;
      const val = Math.easeInOutQuad(currentTime, start, change, duration);
      element.scrollTop = val;
      if (currentTime < duration) setTimeout(animateScroll, increment);
    };

    animateScroll();
  }

  Math.easeInOutQuad = function (t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  };

  if (backToTop) {
    backToTop.onclick = () => scrollToTop(document.documentElement);
  }

  // ========= Mobile Menu =========
  if (navbarToggler && navbarCollapse) {
    navbarToggler.addEventListener("click", () => {
      navbarToggler.classList.toggle("navbarTogglerActive");
      navbarCollapse.classList.toggle("hidden");
    });

    document
      .querySelectorAll("#navbarCollapse ul li:not(.submenu-item) a")
      .forEach((e) =>
        e.addEventListener("click", () => {
          navbarToggler.classList.remove("navbarTogglerActive");
          navbarCollapse.classList.add("hidden");
        })
      );
  }

  // ========= Submenus =========
  document.querySelectorAll(".submenu-item a").forEach((link) => {
    link.addEventListener("click", () => {
      const submenu = link.nextElementSibling;
      if (submenu) submenu.classList.toggle("hidden");
    });
  });

  // ========= Nested Dropdowns =========
  document.querySelectorAll(".toggle-dropdown").forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const submenuId = button.getAttribute("aria-controls");
      const submenu = document.getElementById(submenuId);

      if (!submenu) return;

      const isHidden = submenu.classList.contains("hidden");
      submenu.classList.toggle("hidden");
      button.setAttribute("aria-expanded", !isHidden);
    });
  });

  // ========= FAQ Accordion =========
  document.querySelectorAll(".single-faq").forEach((faq) => {
    faq.querySelector(".faq-btn").addEventListener("click", () => {
      faq.querySelector(".icon").classList.toggle("rotate-180");
      faq.querySelector(".faq-content").classList.toggle("hidden");
    });
  });

  // ========= WOW.js =========
  new WOW().init();

  // ========= Theme Switcher =========
  const themeSwitch = () => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    handleScroll(); // Update logo based on theme
  };

  const checkTheme = () => {
    const userTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (userTheme === "dark" || (!userTheme && systemPrefersDark)) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  if (themeSwitcher) {
    themeSwitcher.addEventListener("click", themeSwitch);
  }
})();
