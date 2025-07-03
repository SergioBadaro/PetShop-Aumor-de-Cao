// Array de produtos em destaque
const produtos = [
  {
    id: 1,
    nome: "Ração Premium para Cães",
    preco: 89.9,
    imagem: "img/produtos/racao-premium.jpg",
    descricao:
      "Ração premium com ingredientes naturais e balanceados para seu cão.",
    destaque: true,
  },
  {
    id: 2,
    nome: "Batatinha para Pets",
    preco: 45.9,
    imagem: "img/produtos/batatinha.jpg",
    descricao:
      "Petisco delicioso e saudável para seu pet, feito com ingredientes naturais.",
    destaque: true,
  },
  {
    id: 3,
    nome: "Cama Pet Confortável",
    preco: 129.9,
    imagem: "img/produtos/caminha.jpg",
    descricao: "Cama macia e confortável para seu cão descansar em paz.",
    destaque: true,
  },
  {
    id: 4,
    nome: "Coleira Ajustável",
    preco: 39.9,
    imagem: "img/produtos/coleira.jpeg",
    descricao: "Coleira ajustável com design moderno e resistente.",
    destaque: true,
  },
  {
    id: 5,
    nome: "Kit banho 3 em 1",
    preco: 39.9,
    imagem: "img/produtos/kit-banho-pet.jpg",
    descricao:
      "Kit banho completo para deixar seu pet sempre limpo e cheiroso.",
    destaque: true,
  },
  {
    id: 6,
    nome: "Brinquedo Interativo",
    preco: 29.9,
    imagem: "img/produtos/triangulo-dog.jpg",
    descricao:
      "Brinquedo triangular para estimular seu pet durante as brincadeiras.",
    destaque: true,
  },
  {
    id: 7,
    nome: "Escova de Dentes Pet",
    preco: 39.9,
    imagem: "img/produtos/escova-de-dente.jpg",
    descricao: "Escova de dentes especial para a higiene bucal do seu pet.",
    destaque: true,
  },
  {
    id: 8,
    nome: "Roupinha para Pets",
    preco: 59.9,
    imagem: "img/produtos/roupinha-dog.jpg",
    descricao: "Roupinha estilosa e confortável para seu pet.",
    destaque: true,
  },
];

// Função para carregar produtos em destaque
function carregarProdutos() {
  const container = document.getElementById("produtos-container");
  if (!container) return;

  container.innerHTML = produtos
    .map(
      (produto) => `
      <div class="col-md-3 mb-4">
        <div class="card produto-card h-100">
          <div class="card-img-container">
            <img src="${produto.imagem}" class="card-img-top" alt="${
        produto.nome
      }" loading="lazy">
          </div>
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${produto.nome}</h5>
            <p class="card-text flex-grow-1">${produto.descricao}</p>
            <div class="mt-auto">
              <div class="d-flex justify-content-between align-items-center mb-2">
                <span class="produto-preco">R$ ${produto.preco.toFixed(
                  2
                )}</span>
                <div class="produto-avaliacao">
                  <i class="fas fa-star text-warning"></i>
                  <i class="fas fa-star text-warning"></i>
                  <i class="fas fa-star text-warning"></i>
                  <i class="fas fa-star text-warning"></i>
                  <i class="fas fa-star-half-alt text-warning"></i>
                </div>
              </div>
              <button class="btn btn-primary w-100" onclick="adicionarAoCarrinho(${
                produto.id
              })">
                <i class="fas fa-cart-plus me-2"></i>
                Adicionar ao Carrinho
              </button>
            </div>
          </div>
        </div>
      </div>
    `
    )
    .join("");
}

// Função para adicionar produto ao carrinho
function adicionarAoCarrinho(produtoId) {
  const produto = produtos.find((p) => p.id === produtoId);
  if (!produto) return;

  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  const itemExistente = carrinho.find((item) => item.id === produtoId);

  if (itemExistente) {
    itemExistente.quantidade += 1;
  } else {
    carrinho.push({
      ...produto,
      quantidade: 1,
    });
  }

  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  atualizarContadorCarrinho();
  mostrarNotificacao("Produto adicionado ao carrinho!", "success");
}

// Função para atualizar contador do carrinho
function atualizarContadorCarrinho() {
  const contador = document.getElementById("carrinho-contador");
  if (!contador) return;

  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  const totalItens = carrinho.reduce(
    (total, item) => total + item.quantidade,
    0
  );

  contador.textContent = totalItens;
  contador.style.display = totalItens > 0 ? "block" : "none";
}

// Função para mostrar notificações
function mostrarNotificacao(mensagem, tipo) {
  const notificacao = document.createElement("div");
  notificacao.className = `alert alert-${
    tipo === "success" ? "success" : "danger"
  } position-fixed top-0 end-0 m-3`;
  notificacao.style.zIndex = "1000";
  notificacao.textContent = mensagem;

  document.body.appendChild(notificacao);

  setTimeout(() => {
    notificacao.remove();
  }, 3000);
}

// Função para animar elementos ao rolar
function animarElementos() {
  const elementos = document.querySelectorAll(".animate-on-scroll");

  elementos.forEach((elemento) => {
    const posicao = elemento.getBoundingClientRect();
    if (posicao.top < window.innerHeight - 100) {
      elemento.classList.add("animated");
    }
  });
}

// Controle da Hero Section
function initHeroSection() {
  const heroContent = document.querySelector(".hero-content");
  const isMobile = window.innerWidth <= 768;

  if (heroContent) {
    // Efeito de fade in no conteúdo
    heroContent.style.opacity = "0";
    setTimeout(() => {
      heroContent.style.opacity = "1";
    }, 300);

    // Função para atualizar efeitos baseado no tamanho da tela
    function updateHeroEffects() {
      const isMobileNow = window.innerWidth <= 768;

      if (isMobileNow) {
        heroContent.style.transform = "none";
        heroContent.style.opacity = "1";
      }
    }

    // Efeito parallax suave no conteúdo apenas em desktop
    window.addEventListener("scroll", () => {
      if (!isMobile) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.3;
        heroContent.style.transform = `translate3d(0, ${rate * 0.2}px, 0)`;
        heroContent.style.opacity =
          1 - Math.max(0, Math.min(0.5, scrolled / 500));
      }
    });

    // Listener para redimensionamento da janela
    window.addEventListener("resize", updateHeroEffects);
    // Chama uma vez para configuração inicial
    updateHeroEffects();
  }
}

// Controle da seção História
function initHistoriaSection() {
  const historiaText = document.querySelector(".historia-text");
  const historiaImage = document.querySelector(".historia-image");
  const paragrafos = document.querySelectorAll(".historia-text .lead");

  // Array com as imagens do slide
  const slidesImagens = [
    "img/slide/banho-e-tosa.jpg",
    "img/slide/banho-e-tosa-2.jpg",
    "img/slide/baner-central-2.jpg",
  ];

  if (historiaText && historiaImage) {
    // Verifica se a tela é maior que 720px
    if (window.innerWidth > 720) {
      // Criar estrutura do slider
      const sliderHTML = `
        <div class="historia-slider">
          ${slidesImagens
            .map(
              (img, index) => `
            <div class="historia-slide ${index === 0 ? "active" : ""}">
              <img src="${img}" alt="Imagem ${
                index + 1
              } da nossa história" loading="lazy">
            </div>
          `
            )
            .join("")}
          <div class="historia-controls">
            ${slidesImagens
              .map(
                (_, index) => `
              <div class="historia-dot ${
                index === 0 ? "active" : ""
              }" data-slide="${index}"></div>
            `
              )
              .join("")}
          </div>
        </div>
      `;
      historiaImage.innerHTML = sliderHTML;

      // Controle do slider
      let currentSlide = 0;
      const slides = document.querySelectorAll(".historia-slide");
      const dots = document.querySelectorAll(".historia-dot");
      const totalSlides = slides.length;
      let autoplayInterval;
      let touchStartX = 0;
      let touchEndX = 0;

      // Função para trocar slide
      function goToSlide(index) {
        slides[currentSlide].classList.remove("active");
        dots[currentSlide].classList.remove("active");
        currentSlide = index;
        slides[currentSlide].classList.add("active");
        dots[currentSlide].classList.add("active");
      }

      // Função para ir para o próximo slide
      function nextSlide() {
        const nextIndex = (currentSlide + 1) % totalSlides;
        goToSlide(nextIndex);
      }

      // Função para ir para o slide anterior
      function prevSlide() {
        const prevIndex = (currentSlide - 1 + totalSlides) % totalSlides;
        goToSlide(prevIndex);
      }

      // Iniciar autoplay
      function startAutoplay() {
        stopAutoplay(); // Limpa qualquer intervalo existente
        autoplayInterval = setInterval(nextSlide, 5000);
      }

      // Parar autoplay
      function stopAutoplay() {
        if (autoplayInterval) {
          clearInterval(autoplayInterval);
        }
      }

      // Evento de clique nos dots
      dots.forEach((dot) => {
        dot.addEventListener("click", () => {
          const slideIndex = parseInt(dot.getAttribute("data-slide"));
          goToSlide(slideIndex);
          stopAutoplay();
          startAutoplay();
        });
      });

      // Eventos de touch para swipe
      historiaImage.addEventListener(
        "touchstart",
        (e) => {
          touchStartX = e.touches[0].clientX;
          stopAutoplay();
        },
        { passive: true }
      );

      historiaImage.addEventListener(
        "touchend",
        (e) => {
          touchEndX = e.changedTouches[0].clientX;
          const diffX = touchStartX - touchEndX;

          if (Math.abs(diffX) > 50) {
            // Mínimo de 50px para considerar como swipe
            if (diffX > 0) {
              nextSlide(); // Swipe para esquerda
            } else {
              prevSlide(); // Swipe para direita
            }
          }
          startAutoplay();
        },
        { passive: true }
      );

      // Eventos de mouse
      historiaImage.addEventListener("mouseenter", stopAutoplay);
      historiaImage.addEventListener("mouseleave", startAutoplay);

      // Parar autoplay quando a página não está visível
      document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
          stopAutoplay();
        } else {
          startAutoplay();
        }
      });

      // Iniciar o autoplay
      startAutoplay();
    }

    // Animação dos parágrafos (mantida para todas as telas)
    function animateOnScroll() {
      if (isElementInViewport(historiaText)) {
        // Verifica se não está em tela móvel
        if (window.innerWidth > 720) {
          paragrafos.forEach((p, index) => {
            setTimeout(() => {
              p.style.opacity = "1";
              p.style.transform = "translateY(0)";
            }, 200 * index);
          });
        } else {
          // Em telas menores, mostra o texto imediatamente
          paragrafos.forEach((p) => {
            p.style.opacity = "1";
            p.style.transform = "none";
          });
        }
      }
    }

    // Função para verificar se o elemento está visível
    function isElementInViewport(el) {
      const rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <=
          (window.innerWidth || document.documentElement.clientWidth)
      );
    }

    // Configura estado inicial dos parágrafos
    paragrafos.forEach((p) => {
      if (window.innerWidth > 720) {
        p.style.opacity = "0";
        p.style.transform = "translateY(20px)";
      } else {
        p.style.opacity = "1";
        p.style.transform = "none";
      }
    });

    // Adiciona listener para redimensionamento
    window.addEventListener("resize", () => {
      if (window.innerWidth <= 720) {
        paragrafos.forEach((p) => {
          p.style.opacity = "1";
          p.style.transform = "none";
        });
      }
    });

    // Adiciona listener para scroll
    window.addEventListener("scroll", animateOnScroll);
    // Chama uma vez para verificar se já está visível
    animateOnScroll();
  }
}

// Função para animar contagem
function animateNumber(element, start, end, duration) {
  let current = start;
  const range = end - start;
  const increment = end > start ? 1 : -1;
  const stepTime = Math.abs(Math.floor(duration / range));
  const timer = setInterval(() => {
    current += increment;
    element.textContent = current + "+";
    if (current === end) {
      clearInterval(timer);
    }
  }, stepTime);
}

// Função para inicializar a seção de estatísticas
function initEstatisticas() {
  const estatisticaItems = document.querySelectorAll(".estatistica-item");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (
          entry.isIntersecting &&
          !entry.target.classList.contains("animated")
        ) {
          const numero = entry.target.querySelector(".estatistica-numero");
          const valorFinal = parseInt(numero.getAttribute("data-valor"));
          entry.target.classList.add("animated");
          animateNumber(numero, 0, valorFinal, 2000);
        }
      });
    },
    {
      threshold: 0.5,
    }
  );

  estatisticaItems.forEach((item) => observer.observe(item));
}

// Função para inicializar a seção Pet Market
function initPetMarket() {
  const petMarketText = document.querySelector(".pet-market-text");
  const petMarketItems = document.querySelectorAll(".pet-market-item");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animated");
        }
      });
    },
    {
      threshold: 0.3,
    }
  );

  if (petMarketText) {
    observer.observe(petMarketText);
  }

  petMarketItems.forEach((item, index) => {
    if (item) {
      item.style.transitionDelay = `${index * 0.2}s`;
      observer.observe(item);
    }
  });
}

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  carregarProdutos();
  atualizarContadorCarrinho();
  initHeroSection();
  initHistoriaSection();
  initEstatisticas();
  initPetMarket();

  // Animação ao rolar
  window.addEventListener("scroll", animarElementos);
  animarElementos();

  // Validação do formulário de contato
  const formContato = document.getElementById("form-contato");
  if (formContato) {
    formContato.addEventListener("submit", (e) => {
      e.preventDefault();
      if (validarFormulario()) {
        mostrarNotificacao("Mensagem enviada com sucesso!", "success");
        formContato.reset();
      }
    });
  }

  // Scroll suave para links internos
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });

  // Controle da Navbar ao rolar
  const navbar = document.querySelector(".navbar");
  let lastScroll = 0;

  window.addEventListener("scroll", function () {
    const currentScroll = window.pageYOffset;

    // Adiciona/remove a classe scrolled baseado na posição do scroll
    if (currentScroll > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // Esconde/mostra a navbar baseado na direção do scroll
    if (currentScroll > lastScroll && currentScroll > 100) {
      navbar.style.transform = "translateY(-100%)";
    } else {
      navbar.style.transform = "translateY(0)";
    }

    lastScroll = currentScroll;
  });
});

// Função para validar formulário
function validarFormulario() {
  const nome = document.getElementById("nome");
  const email = document.getElementById("email");
  const mensagem = document.getElementById("mensagem");
  let valido = true;

  if (!nome.value.trim()) {
    mostrarErro(nome, "Nome é obrigatório");
    valido = false;
  }

  if (!email.value.trim()) {
    mostrarErro(email, "Email é obrigatório");
    valido = false;
  } else if (!validarEmail(email.value)) {
    mostrarErro(email, "Email inválido");
    valido = false;
  }

  if (!mensagem.value.trim()) {
    mostrarErro(mensagem, "Mensagem é obrigatória");
    valido = false;
  }

  return valido;
}

// Função para validar email
function validarEmail(email) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// Função para mostrar erro no campo
function mostrarErro(campo, mensagem) {
  const feedback = campo.nextElementSibling;
  if (feedback && feedback.classList.contains("invalid-feedback")) {
    feedback.textContent = mensagem;
    feedback.style.display = "block";
  }
  campo.classList.add("is-invalid");
}
