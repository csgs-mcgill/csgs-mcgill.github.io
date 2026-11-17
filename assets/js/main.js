document.querySelectorAll("[data-current-year]").forEach((element) => {
  element.textContent = new Date().getFullYear();
});

document.querySelectorAll("[data-carousel]").forEach((carousel) => {
  const slides = carousel.querySelector(".previous-events-slides");
  const slideItems = carousel.querySelectorAll("[data-slide]");
  const dotsContainer = carousel.parentElement.querySelector("[data-carousel-dots]");
  let currentSlide = 0;

  if (!slides || !dotsContainer || slideItems.length === 0) {
    return;
  }

  const showSlide = (slideIndex) => {
    currentSlide = (slideIndex + slideItems.length) % slideItems.length;
    slides.style.transform = `translateX(-${currentSlide * 100}%)`;
    dotsContainer.querySelectorAll("button").forEach((dot, index) => {
      dot.classList.toggle("is-primary", index === currentSlide);
      dot.classList.toggle("is-light", index !== currentSlide);
      dot.setAttribute("aria-current", index === currentSlide ? "true" : "false");
    });
  };

  slideItems.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.className = "button is-small previous-events-dot is-light";
    dot.type = "button";
    dot.setAttribute("aria-label", `Show previous event ${index + 1}`);
    dot.setAttribute("aria-current", "false");
    dot.addEventListener("click", () => showSlide(index));
    dotsContainer.appendChild(dot);
  });

  carousel.querySelector("[data-carousel-previous]").addEventListener("click", () => {
    showSlide(currentSlide - 1);
  });
  carousel.querySelector("[data-carousel-next]").addEventListener("click", () => {
    showSlide(currentSlide + 1);
  });

  showSlide(0);
});
