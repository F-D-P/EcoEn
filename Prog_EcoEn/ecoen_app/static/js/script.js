console.log("✅ script.js cargado correctamente");

// === SLIDER ===
document.querySelectorAll(".slider").forEach((slider) => {
  const slides = slider.querySelectorAll(".slide");
  const dots = slider.querySelectorAll(".dot");
  const nextBtn = slider.querySelector("#next");
  const prevBtn = slider.querySelector("#prev");
  let current = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
      if (dots[i]) dots[i].classList.toggle("active", i === index);
    });
    current = index;
  }

  nextBtn?.addEventListener("click", () => {
    showSlide((current + 1) % slides.length);
  });

  prevBtn?.addEventListener("click", () => {
    showSlide((current - 1 + slides.length) % slides.length);
  });

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => showSlide(i));
  });

  // Autoplay cada 5 segundos
  setInterval(() => {
    showSlide((current + 1) % slides.length);
  }, 5000);
});

// === TOGGLE MODO OSCURO/CLARO ===
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("themeToggle");
  const body = document.body;

  if (!toggleBtn) return; // seguridad: si no existe el botón, no hace nada

  // Cargar preferencia guardada
  if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-mode");
    body.classList.remove("light-mode");
    toggleBtn.textContent = "☀️ Modo claro";
  } else {
    body.classList.add("light-mode");
    body.classList.remove("dark-mode");
    toggleBtn.textContent = "🌙 Modo oscuro";
  }

  // Evento click
  toggleBtn.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    body.classList.toggle("light-mode");

    if (body.classList.contains("dark-mode")) {
      toggleBtn.textContent = "☀️ Modo claro";
      localStorage.setItem("theme", "dark");
    } else {
      toggleBtn.textContent = "🌙 Modo oscuro";
      localStorage.setItem("theme", "light");
    }
  });
});