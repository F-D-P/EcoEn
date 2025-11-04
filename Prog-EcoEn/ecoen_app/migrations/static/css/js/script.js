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

  nextBtn.addEventListener("click", () => {
    showSlide((current + 1) % slides.length);
  });

  prevBtn.addEventListener("click", () => {
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
