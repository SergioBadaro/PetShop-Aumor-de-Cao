// Mensagens predefinidas sobre cuidados com pets
const mensagensPets = [
  {
    titulo: "Amor e Carinho",
    texto:
      "Seu pet precisa de amor e atenção todos os dias. Dedique um tempo especial para brincar e fazer carinho.",
    icone: "fa-heart",
  },
  {
    titulo: "Hidratação é Fundamental",
    texto:
      "Mantenha sempre água fresca e limpa disponível para seu pet. A hidratação é essencial para a saúde.",
    icone: "fa-droplet",
  },
  {
    titulo: "Exercícios Diários",
    texto:
      "Passeios e brincadeiras são essenciais para manter seu pet saudável e feliz. Reserve um tempo para atividades físicas.",
    icone: "fa-running",
  },
  {
    titulo: "Alimentação Balanceada",
    texto:
      "Uma dieta equilibrada é fundamental. Consulte um veterinário para escolher a melhor alimentação.",
    icone: "fa-bowl-food",
  },
  {
    titulo: "Visitas ao Veterinário",
    texto:
      "Mantenha as consultas veterinárias em dia. Prevenção é sempre melhor que tratamento.",
    icone: "fa-stethoscope",
  },
  {
    titulo: "Higiene é Saúde",
    texto:
      "Mantenha a higiene do seu pet em dia com banhos regulares e escovação dos dentes.",
    icone: "fa-shower",
  },
  {
    titulo: "Socialização Importante",
    texto:
      "Permita que seu pet interaja com outros animais e pessoas. A socialização é fundamental para um comportamento saudável.",
    icone: "fa-users",
  },
  {
    titulo: "Identificação Segura",
    texto:
      "Use coleira com identificação e microchip. Esses cuidados são essenciais caso seu pet se perca.",
    icone: "fa-tag",
  },
  {
    titulo: "Ambiente Adequado",
    texto:
      "Mantenha um espaço confortável e seguro para seu pet, com temperatura agradável e locais para descanso.",
    icone: "fa-house",
  },
  {
    titulo: "Vacinação em Dia",
    texto:
      "Siga o calendário de vacinação recomendado pelo veterinário. Vacinas são essenciais para prevenir doenças.",
    icone: "fa-syringe",
  },
  {
    titulo: "Carinho e Paciência",
    texto:
      "Cada pet tem sua personalidade única. Respeite o tempo e o espaço do seu amigo de quatro patas.",
    icone: "fa-hand-holding-heart",
  },
  {
    titulo: "Brinquedos Seguros",
    texto:
      "Ofereça brinquedos apropriados para seu pet. Eles estimulam a mente e previnem o tédio.",
    icone: "fa-baseball",
  },
  {
    titulo: "Controle de Parasitas",
    texto:
      "Mantenha em dia o controle de pulgas, carrapatos e vermes. Consulte seu veterinário sobre os melhores produtos.",
    icone: "fa-worm",
  },
  {
    titulo: "Momentos de Descanso",
    texto:
      "Respeite os momentos de sono e descanso do seu pet. Eles são importantes para a saúde física e mental.",
    icone: "fa-moon",
  },
  {
    titulo: "Amor Incondicional",
    texto:
      "Seu pet te ama incondicionalmente. Retribua esse amor com cuidados, carinho e atenção todos os dias.",
    icone: "fa-heart-circle-check",
  },
];

// Função para buscar notícias sobre pets usando a NewsAPI
async function buscarNoticiasPets() {
  const apiKey = "SUA_API_KEY_AQUI"; // Substitua pela sua chave da API
  try {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=pets+animais+estimacao&language=pt&apiKey=${apiKey}`
    );
    const data = await response.json();
    return data.articles || [];
  } catch (error) {
    console.error("Erro ao buscar notícias:", error);
    return [];
  }
}

// Função para criar slides de mensagens
function criarSlideMensagem(mensagem, index) {
  return `
        <div class="carousel-item ${index === 0 ? "active" : ""}">
            <div class="mensagem-slide">
                <div class="mensagem-icone">
                    <i class="fas ${mensagem.icone}"></i>
                </div>
                <h3>${mensagem.titulo}</h3>
                <p>${mensagem.texto}</p>
            </div>
        </div>
    `;
}

// Função para criar slides de notícias
function criarSlideNoticia(noticia, index) {
  return `
        <div class="carousel-item ${index === 0 ? "active" : ""}">
            <div class="noticia-slide">
                <div class="noticia-imagem">
                    <img src="${
                      noticia.urlToImage || "img/placeholder.jpg"
                    }" alt="${noticia.title}">
                </div>
                <h3>${noticia.title}</h3>
                <p>${noticia.description}</p>
                <a href="${
                  noticia.url
                }" target="_blank" class="btn btn-primary btn-sm">Ler mais</a>
            </div>
        </div>
    `;
}

// Função para inicializar o carrossel
async function inicializarCarrossel() {
  const carouselInner = document.querySelector(
    "#mensagensCarousel .carousel-inner"
  );

  // Adiciona as mensagens predefinidas
  mensagensPets.forEach((mensagem, index) => {
    carouselInner.innerHTML += criarSlideMensagem(mensagem, index);
  });

  // Busca e adiciona notícias
  const noticias = await buscarNoticiasPets();
  noticias.slice(0, 5).forEach((noticia, index) => {
    carouselInner.innerHTML += criarSlideNoticia(
      noticia,
      mensagensPets.length + index
    );
  });

  // Inicializa o carrossel do Bootstrap
  new bootstrap.Carousel(document.getElementById("mensagensCarousel"), {
    interval: 8000, // Intervalo de 8 segundos entre slides
    touch: true, // Permite controle por touch
  });
}

// Inicializa quando o documento estiver pronto
document.addEventListener("DOMContentLoaded", inicializarCarrossel);
