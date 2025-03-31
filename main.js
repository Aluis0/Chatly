document.addEventListener("DOMContentLoaded", () => {
  // Garante que o DOM está carregado

  // --- Lógica do Menu Hamburguer ---
  const menuBtn = document.getElementById("menu-btn");
  const navLinks = document.getElementById("nav-links");
  const menuBtnIcon = menuBtn.querySelector("i");

  if (menuBtn && navLinks && menuBtnIcon) {
    // Verifica se elementos existem
    menuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("open");
      const isOpen = navLinks.classList.contains("open");
      menuBtnIcon.className = isOpen ? "ri-close-line" : "ri-menu-line"; // Troca classe do ícone
      menuBtn.setAttribute("aria-expanded", isOpen); // Atualiza acessibilidade
    });

    // Fecha o menu ao clicar em um link (para SPAs)
    navLinks.addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        // Verifica se o clique foi em um link
        navLinks.classList.remove("open");
        menuBtnIcon.className = "ri-menu-line";
        menuBtn.setAttribute("aria-expanded", "false");
      }
    });
  } else {
    console.error("Elementos do menu não encontrados!");
  }

  // --- Lógica do ScrollReveal (se a biblioteca estiver carregada) ---
  if (typeof ScrollReveal !== "undefined") {
    const defaultScrollRevealOption = {
      distance: "50px",
      origin: "bottom",
      duration: 800, // Duração um pouco maior
      interval: 200, // Intervalo padrão entre elementos revelados
      delay: 100, // Delay inicial pequeno
      easing: "ease-out",
      reset: false, // Animação ocorre apenas uma vez
    };

    ScrollReveal().reveal(".header__image", {
      // Revela container da imagem
      ...defaultScrollRevealOption,
      origin: "right",
      duration: 1000,
      delay: 200,
    });

    ScrollReveal().reveal(".header__content h1", {
      ...defaultScrollRevealOption,
      origin: "left", // Anima da esquerda
      delay: 400,
    });

    ScrollReveal().reveal(".header__content p", {
      ...defaultScrollRevealOption,
      delay: 500,
    });

    ScrollReveal().reveal(".header__content .social-icons", {
      ...defaultScrollRevealOption,
      delay: 600,
      interval: 100, // Intervalo menor para ícones
      origin: "bottom",
    });

    ScrollReveal().reveal(".header__image__card", {
      ...defaultScrollRevealOption,
      duration: 600,
      interval: 150, // Revela cards um após o outro
      delay: 700, // Começa depois do resto
      origin: "bottom",
      scale: 0.9, // Efeito de escala
    });

    // Seção "Por que a Chatly?"
    ScrollReveal().reveal(".about-us__text h2", {
      ...defaultScrollRevealOption,
      origin: "left",
      delay: 200,
    });
    ScrollReveal().reveal(".about-us__text p", {
      ...defaultScrollRevealOption,
      delay: 300,
    });
    ScrollReveal().reveal(".about-us__image", {
      ...defaultScrollRevealOption,
      origin: "right",
      delay: 250,
    });

    // Seção Planos
    ScrollReveal().reveal(".plans h2", {
      ...defaultScrollRevealOption,
      delay: 100,
    });
    ScrollReveal().reveal(".plan-card", {
      // Aplica a todos os cards
      ...defaultScrollRevealOption,
      interval: 150, // Intervalo entre cards
      delay: 200,
    });

    // Seção Depoimentos
    ScrollReveal().reveal(".new-depoimentos h2", {
      ...defaultScrollRevealOption,
      delay: 100,
    });
    ScrollReveal().reveal(".new-depoimentos-subtitle", {
      ...defaultScrollRevealOption,
      delay: 200,
    });
    ScrollReveal().reveal(".new-depoimentos-slider", {
      ...defaultScrollRevealOption,
      delay: 300,
    });
  } else {
    console.warn("ScrollReveal library not found.");
  }

  // --- Lógica da Alternância de Imagens no Header ---
  const headerImageElement = document.querySelector(".header__image img");
  if (headerImageElement) {
    // Verifica se a imagem existe
    const headerImages = [
      "assets/header.png",
      "assets/header2.png",
      "assets/header3.png",
      "assets/header4.png",
    ]; // Certifique-se que esses arquivos existem
    let currentHeaderImageIndex = 0;

    setInterval(() => {
      // Adiciona uma classe para iniciar o fade-out
      headerImageElement.style.opacity = "0";

      setTimeout(() => {
        currentHeaderImageIndex =
          (currentHeaderImageIndex + 1) % headerImages.length;
        headerImageElement.src = headerImages[currentHeaderImageIndex];
        // Força reflow para garantir que a opacidade seja aplicada após a mudança de src
        void headerImageElement.offsetWidth;
        // Adiciona a classe para fade-in
        headerImageElement.style.opacity = "1";
      }, 400); // Tempo deve ser igual à duração da transição CSS
    }, 3000); // Intervalo de troca de imagem (3 segundos)

    // Adiciona transição CSS diretamente via JS (ou pode ser feito no CSS)
    headerImageElement.style.transition = "opacity 0.4s ease-in-out";
    headerImageElement.style.opacity = "1"; // Garante estado inicial
  } else {
    console.error("Elemento da imagem do header não encontrado!");
  }

  // --- Lógica do Swiper (se a biblioteca estiver carregada) ---
  if (typeof Swiper !== "undefined") {
    const depoimentosSwiper = new Swiper(".new-depoimentos-slider", {
      loop: true,
      grabCursor: true, // Mostra cursor de "agarrar"
      slidesPerView: 1, // Default mobile
      spaceBetween: 15, // Espaço entre slides
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        // Quando a largura da janela for >= 576px
        576: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        // Quando a largura da janela for >= 768px
        768: {
          slidesPerView: 3, // Mostrar 3 no tablet
          spaceBetween: 25,
        },
        // Quando a largura da janela for >= 1024px
        1024: {
          slidesPerView: 4, // Mostrar 4 no desktop
          spaceBetween: 30,
        },
      },
      autoplay: {
        // Autoplay opcional
        delay: 4000, // Tempo em ms
        disableOnInteraction: true, // Para ao interagir
      },
    });
  } else {
    console.warn("Swiper library not found.");
  }

  // --- Lógica da Navegação Sticky/Scroll ---
  const mainNav = document.querySelector("nav");
  if (mainNav) {
    const scrollThreshold = 50; // Distância em pixels para ativar o efeito
    window.addEventListener(
      "scroll",
      () => {
        if (window.scrollY > scrollThreshold) {
          mainNav.classList.add("nav-scrolled");
        } else {
          mainNav.classList.remove("nav-scrolled");
        }
      },
      { passive: true }
    ); // Melhora performance de scroll
  } else {
    console.error("Elemento NAV principal não encontrado!");
  }

  // --- Lógica do Floating Action Button (FAB) ---
  const fabContainer = document.querySelector(".fab-container");
  const fabMainBtn = document.getElementById("fab-main-btn");

  if (fabContainer && fabMainBtn) {
    // Verifica se os elementos do FAB existem
    const fabMainIcon = fabMainBtn.querySelector("i");

    // --- ATUALIZAR ARRAY fabIcons ---
    const fabIcons = [
      // Adiciona a propriedade 'bgColor' para cada ícone
      { class: "ri-whatsapp-line", bgColor: "#25D366" }, // Verde WhatsApp
      { class: "ri-instagram-fill", bgColor: "#E1306C" }, // Rosa/Vermelho Instagram (pode ser gradiente, mas para fundo é melhor cor sólida)
      { class: "ri-tiktok-fill", bgColor: "#000000" }, // Preto TikTok
      { class: "ri-facebook-fill", bgColor: "#1877F2" }, // Azul Facebook
      // Use 'var(--primary-color)' se quiser azul padrão para algum
    ];
    // --- FIM DA ATUALIZAÇÃO do ARRAY ---

    let currentFabIconIndex = 0;
    let fabIntervalId = null;
    const FAB_ANIMATION_INTERVAL = 2500; // Tempo (2.5 segundos)

    function changeFabIcon() {
      if (!fabContainer.classList.contains("open")) {
        currentFabIconIndex = (currentFabIconIndex + 1) % fabIcons.length;
        const nextIconInfo = fabIcons[currentFabIconIndex]; // Pega objeto com classe E cor

        fabMainIcon.className = nextIconInfo.class; // Muda classe do ícone
        // --- ADICIONAR LINHA PARA MUDAR COR ---
        fabMainBtn.style.backgroundColor = nextIconInfo.bgColor; // Muda cor de fundo do botão
        // --- FIM DA ADIÇÃO ---

        // Animação sutil na troca (opcional)
        fabMainBtn.style.transform = "scale(1.1)";
        setTimeout(() => (fabMainBtn.style.transform = "scale(1)"), 150);
      }
    }

    function startFabAnimation() {
      if (fabIntervalId !== null) {
        clearInterval(fabIntervalId);
      }
      // Define ícone E COR inicial (WhatsApp)
      fabMainIcon.className = fabIcons[0].class;
      // --- ADICIONAR/MODIFICAR LINHA PARA COR INICIAL ---
      fabMainBtn.style.backgroundColor = fabIcons[0].bgColor; // Define cor inicial
      // --- FIM DA ADIÇÃO/MODIFICAÇÃO ---

      fabMainBtn.style.transform = "scale(1)"; // Reseta transform
      fabIntervalId = setInterval(changeFabIcon, FAB_ANIMATION_INTERVAL);
    }

    function stopFabAnimation() {
      clearInterval(fabIntervalId);
      fabIntervalId = null;
      fabMainBtn.style.transform = "scale(1)";
      // Não precisa resetar a cor aqui, o CSS do .open cuida disso
      // E ao fechar, startFabAnimation vai resetar para a cor inicial do ciclo
    }

    fabMainBtn.addEventListener("click", () => {
      const isOpen = fabContainer.classList.toggle("open");
      fabMainBtn.setAttribute("aria-expanded", isOpen);

      if (isOpen) {
        stopFabAnimation();
        fabMainIcon.className = "ri-close-line";
        // Cor dourada é definida pelo CSS para .fab-container.open .fab-main
        // O estilo inline será sobrescrito pela regra CSS, o que é bom.
      } else {
        // --- MODIFICAR PARA RESETAR COR AO FECHAR ---
        startFabAnimation(); // Reinicia a animação (já define ícone e cor iniciais)
        // --- FIM DA MODIFICAÇÃO ---
      }
    });

    // Fecha as opções do FAB se clicar fora dele
    document.addEventListener("click", (event) => {
      if (
        fabContainer.classList.contains("open") &&
        !fabContainer.contains(event.target)
      ) {
        fabContainer.classList.remove("open");
        fabMainBtn.setAttribute("aria-expanded", "false");
        // --- MODIFICAR PARA RESETAR COR AO FECHAR ---
        startFabAnimation(); // Reinicia animação (já define ícone e cor iniciais)
        // --- FIM DA MODIFICAÇÃO ---
      }
    });

    // Inicia a animação quando o script carrega
    startFabAnimation();
  } else {
    console.error("Elementos do FAB não encontrados!");
  }
}); // Fim do DOMContentLoaded

