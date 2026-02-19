if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

window.addEventListener("load", () => {
  if (!location.hash) {
    window.scrollTo(0, 0);
  }

  const start = Date.now();
  const lockInterval = setInterval(() => {
    if (location.hash) {
      clearInterval(lockInterval);
      return;
    }

    window.scrollTo(0, 0);

    if (Date.now() - start > 1500) {
      clearInterval(lockInterval);
    }
  }, 100);

  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const el = entry.target;

      if (entry.isIntersecting) {
        el.classList.add("visible");
      } else {
        el.classList.remove("visible");
      }
    });
  }, observerOptions);

  document.querySelectorAll(".reveal").forEach((el) => {
    observer.observe(el);
  });

  const yearSpan = document.getElementById("year");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  const nav = document.querySelector(".nav");
  const navToggle = document.querySelector(".nav-toggle");

  if (nav && navToggle) {
    navToggle.addEventListener("click", () => {
      nav.classList.toggle("is-open");
      navToggle.classList.toggle("is-open");
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("is-open");
        navToggle.classList.remove("is-open");
      });
    });
  }
});

