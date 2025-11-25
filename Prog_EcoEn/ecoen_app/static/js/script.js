console.log("✅ script.js cargado correctamente");

// === SLIDER ===
document.querySelectorAll(".slider").forEach((slider) => {
  const slides = slider.querySelectorAll(".slide");
  const dots = slider.querySelectorAll(".dot");
  const nextBtn = slider.querySelector("#next");
  const prevBtn = slider.querySelector("#prev");
  let current = 0;
  let autoSlide;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
      if (dots[i]) dots[i].classList.toggle("active", i === index);
    });
    current = index;
  }

  function startAutoSlide() {
    clearInterval(autoSlide);
    autoSlide = setInterval(() => {
      showSlide((current + 1) % slides.length);
    }, 5000);
  }

  nextBtn?.addEventListener("click", () => {
    showSlide((current + 1) % slides.length);
    startAutoSlide();
  });

  prevBtn?.addEventListener("click", () => {
    showSlide((current - 1 + slides.length) % slides.length);
    startAutoSlide();
  });

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      showSlide(i);
      startAutoSlide();
    });
  });

  showSlide(0);
  startAutoSlide();
});

// === DOM READY ===
document.addEventListener("DOMContentLoaded", () => {
  // === MODO OSCURO/CLARO ===
  const toggleBtn = document.getElementById("theme-toggle");
  const body = document.body;

  if (toggleBtn) {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);

    toggleBtn.addEventListener("click", () => {
      const newTheme = body.classList.contains("dark-mode") ? "light" : "dark";
      setTheme(newTheme);
    });
  }

  function setTheme(mode) {
    body.classList.toggle("dark-mode", mode === "dark");
    body.classList.toggle("light-mode", mode === "light");
    toggleBtn.textContent = mode === "dark" ? "☀️ Modo claro" : "🌙 Modo oscuro";
    toggleBtn.setAttribute("aria-pressed", mode === "dark");
    localStorage.setItem("theme", mode);
  }

  // === CARRITO DE COMPRAS ===
  const carritoLista = document.getElementById("carrito-lista");
  const carritoTotal = document.getElementById("carrito-total");
  const monedaSelect = document.getElementById("moneda");
  const carritoVacio = document.getElementById("carrito-vacio");

  let carrito = [];
  const tasaCambio = { USD: 1, EUR: 0.92, ARS: 880 };

  function actualizarCarrito() {
    carritoLista.innerHTML = "";
    let totalUSD = 0;

    if (carrito.length === 0) {
      carritoVacio?.classList.remove("d-none");
      carritoTotal.textContent = "0.00";
      return;
    } else {
      carritoVacio?.classList.add("d-none");
    }

    carrito.forEach((item, index) => {
      totalUSD += item.precio;
      const li = document.createElement("li");
      li.className = "list-group-item d-flex justify-content-between align-items-center";

      li.innerHTML = `
        <span>${item.nombre}</span>
        <span>$${item.precio}</span>
        <button class="btn btn-sm btn-danger">🗑️</button>
      `;

      li.querySelector("button").addEventListener("click", () => {
        carrito.splice(index, 1);
        actualizarCarrito();
      });

      carritoLista.appendChild(li);
    });

    const moneda = monedaSelect?.value || "ARS";
    const totalConvertido = totalUSD * tasaCambio[moneda];
    carritoTotal.textContent = totalConvertido.toFixed(2) + " " + moneda;
  }

  document.querySelectorAll(".add-to-cart").forEach((btn) => {
    btn.addEventListener("click", () => {
      const nombre = btn.dataset.product;
      const precio = parseFloat(btn.dataset.price);
      carrito.push({ nombre, precio });
      actualizarCarrito();
    });
  });

  monedaSelect?.addEventListener("change", actualizarCarrito);

  // === MÉTODOS DE PAGO ===
  const btnComprar = document.getElementById("btn-comprar");
  const metodosPago = document.getElementById("metodos-pago");
  const datosTransferencia = document.getElementById("datos-transferencia");

  btnComprar?.addEventListener("click", () => {
    if (carrito.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }
    metodosPago.classList.remove("d-none");
  });

  document.getElementById("btn-mercado-pago")?.addEventListener("click", () => {
    window.location.href = "/confirmar-pago/mercado_pago/";
  });

  document.getElementById("btn-transferencia")?.addEventListener("click", () => {
    datosTransferencia.classList.remove("d-none");
  });

  // === PUNTUACIÓN DE PRODUCTOS ===
  document.querySelectorAll(".rating").forEach((ratingBlock) => {
    const stars = ratingBlock.querySelectorAll(".star");
    const productName = ratingBlock.closest(".card-body")?.querySelector(".card-title")?.textContent;

    const savedRating = localStorage.getItem(`rating_${productName}`);
    if (savedRating) {
      stars.forEach((s, i) => s.classList.toggle("text-warning", i < parseInt(savedRating)));
    }

    stars.forEach((star) => {
      star.addEventListener("click", () => {
        const selectedValue = parseInt(star.dataset.value);
        stars.forEach((s, i) => s.classList.toggle("text-warning", i < selectedValue));
        if (productName) localStorage.setItem(`rating_${productName}`, selectedValue);
      });
    });
  });
});

// Menú hamburguesa con animación
function toggleMenu() {
  const menu = document.getElementById("menu-lateral");
  const overlay = document.getElementById("menu-overlay");
  const icon = document.getElementById("menu-icon");

  if (menu.classList.contains("active")) {
    cerrarMenu();
  } else {
    menu.classList.add("active");
    overlay.classList.add("active");
    icon.textContent = "✖";
    menu.setAttribute("aria-hidden", false);
    overlay.setAttribute("aria-hidden", false);
  }
}

function cerrarMenu() {
  const menu = document.getElementById("menu-lateral");
  const overlay = document.getElementById("menu-overlay");
  const icon = document.getElementById("menu-icon");

  // Añadimos clase de salida
  menu.classList.add("closing");

  // Esperamos a que termine la animación
  menu.addEventListener("animationend", () => {
    menu.classList.remove("active", "closing");
    overlay.classList.remove("active");
    icon.textContent = icon.dataset.default || "☰";
    menu.setAttribute("aria-hidden", true);
    overlay.setAttribute("aria-hidden", true);
  }, { once: true });
}

// Overlay y Escape cierran menú
document.getElementById("menu-overlay").addEventListener("click", cerrarMenu);
document.addEventListener("keydown", e => { if (e.key === "Escape") cerrarMenu(); });

// Configuración toggle
function toggleConfig() {
  const config = document.getElementById("config-options");
  config.classList.toggle("active");
}
