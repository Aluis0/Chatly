const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", (e) => {
  navLinks.classList.toggle("open");

  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

navLinks.addEventListener("click", (e) => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-line");
});

const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
};

ScrollReveal().reveal(".header__image img", {
  ...scrollRevealOption,
  origin: "right",
});

ScrollReveal().reveal(".header__content h1", {
  ...scrollRevealOption,
  delay: 500,
});

ScrollReveal().reveal(".header__content p", {
  ...scrollRevealOption,
  delay: 1000,
});

ScrollReveal().reveal(".header__content form", {
  ...scrollRevealOption,
  delay: 1500,
});

ScrollReveal().reveal(".header__content .bar", {
  ...scrollRevealOption,
  delay: 2000,
});

ScrollReveal().reveal(".header__image__card", {
  duration: 1000,
  interval: 500,
  delay: 2500,
});

// ScrollReveal configuration for "Nossos Planos"
ScrollReveal().reveal('#plans-section', {
  origin: 'bottom',
  distance: '50px',
  duration: 1000,
  delay: 200,
  reset: false, // Set to true if you want the animation to repeat on scroll
});

// Alternância de imagens no header
const headerImage = document.querySelector(".header__image img");
const images = ["assets/header.png", "assets/header2.png", "assets/header3.png"];
let currentImageIndex = 0;

setInterval(() => {
  currentImageIndex = (currentImageIndex + 1) % images.length;
  headerImage.src = images[currentImageIndex];
}, 2000);

// Inicializar o Swiper para a seção de depoimentos
const depoimentosSwiper = new Swiper('.new-depoimentos-slider', {
  loop: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});
