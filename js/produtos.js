// Variáveis globais
let produtos = [];
let produtosFiltrados = [];
let visualizacaoAtual = "grade";
let paginaAtual = 1;
const produtosPorPagina = 12;

// Configurações
const ITEMS_PER_PAGE = 20;
let currentPage = 1;
let filteredProducts = [];
let allProducts = [];

// Estado dos filtros
const filters = {
  categorias: [],
  animais: [],
  precoMin: 0,
  precoMax: 500,
  ordenacao: "relevancia",
};



// Dados dos produtos
const produtosData = [
  {
    id: 1,
    nome: "Ração Premium para Cães",
    preco: 89.9,
    imagem: "img/produtos/racao-premium.jpg",
    descricao: "Ração premium com ingredientes selecionados para cães adultos.",
    categoria: "racao",
    animal: "cachorro",
    marca: "AuMor Premium",

    avaliacao: 4.8,
    estoque: 50,
  },
  {
    id: 2,
    nome: "Batatinha para Pets",
    preco: 45.9,
    imagem: "img/produtos/batatinha.jpg",
    descricao: "Batatinhas crocantes e saborosas para seu pet.",
    categoria: "brinquedos",
    animal: "cachorro",
    marca: "AuMor Snacks",
    avaliacao: 4.6,
    estoque: 30,
  },
  {
    id: 3,
    nome: "Cama Pet Confortável",
    preco: 129.9,
    imagem: "img/produtos/cama-pet-confo.jpg",
    descricao: "Cama super confortável com material premium.",
    categoria: "camas",
    animal: "cachorro",
    marca: "AuMor Comfort",
    avaliacao: 4.9,
    estoque: 20,
  },
  {
    id: 4,
    nome: "Coleira Ajustável",
    preco: 39.9,
    imagem: "img/produtos/coleira.jpeg",
    descricao: "Coleira ajustável com design moderno.",
    categoria: "acessorios",
    animal: "cachorro",
    marca: "AuMor Accessories",
    avaliacao: 4.7,
    estoque: 40,
  },
  {
    id: 5,
    nome: "Ração Premium para Gatos",
    preco: 109.9,
    imagem: "img/produtos/racao-gato.jpg",
    descricao:
      "Ração premium com ingredientes selecionados para gatos adultos.",
    categoria: "racao",
    animal: "gato",
    marca: "AuMor Premium",
    avaliacao: 4.8,
    estoque: 45,
  },
  {
    id: 6,
    nome: "Poste de arranha para Gatos",
    preco: 49.9,
    imagem: "img/produtos/poste-gato.jpg",
    descricao: "Poste de arranha para estimular seu gato.",
    categoria: "acessorios",
    animal: "gato",
    marca: "AuMor Toys",
    avaliacao: 4.5,
    estoque: 25,
  },
  {
    id: 7,
    nome: "Ração para Pássaros",
    preco: 29.9,
    imagem: "img/produtos/racao-passaro.jpg",
    descricao: "Ração balanceada para pássaros de todas as espécies.",
    categoria: "racao",
    animal: "passaro",
    marca: "AuMor Premium",
    avaliacao: 4.7,
    estoque: 35,
  },
  {
    id: 8,
    nome: "Ração para Peixes",
    preco: 34.9,
    imagem: "img/produtos/racao-peixe.jpg",
    descricao: "Ração especial para peixes de água doce.",
    categoria: "racao",
    animal: "peixe",
    marca: "AuMor Premium",
    avaliacao: 4.6,
    estoque: 30,
  },
  {
    id: 9,
    nome: "Ração para Roedores",
    preco: 24.9,
    imagem: "img/produtos/racao-roedores.jpg",
    descricao: "Ração balanceada para hamsters e outros roedores.",
    categoria: "racao",
    animal: "roedor",
    marca: "AuMor Premium",
    avaliacao: 4.7,
    estoque: 40,
  },
  {
    id: 10,
    nome: "Casinha para Roedores",
    preco: 19.9,
    imagem: "img/produtos/brinquedo-roedores.jpg",
    descricao: "Brinquedo divertido para seu roedor.",
    categoria: "camas",
    animal: "roedor",
    marca: "AuMor Toys",
    avaliacao: 4.4,
    estoque: 30,
  },
  {
    id: 11,
    nome: "Cama para Gatos",
    preco: 99.9,
    imagem: "img/produtos/cama-gato.jpg",
    descricao: "Cama confortável especialmente para gatos.",
    categoria: "camas",
    animal: "gato",
    marca: "AuMor Comfort",
    avaliacao: 4.8,
    estoque: 25,
  },
  {
    id: 12,
    nome: "Coleira para Gatos",
    preco: 34.9,
    imagem: "img/produtos/coleira-gato.jpg",
    descricao: "Coleira ajustável para gatos.",
    categoria: "acessorios",
    animal: "gato",
    marca: "AuMor Accessories",
    avaliacao: 4.6,
    estoque: 35,
  },
  {
    id: 13,
    nome: "Gaiola para Pássaros",
    preco: 159.9,
    imagem: "img/produtos/gaiola-passaro.jpg",
    descricao: "Gaiola espaçosa para pássaros.",
    categoria: "acessorios",
    animal: "passaro",
    marca: "AuMor Accessories",
    avaliacao: 4.7,
    estoque: 15,
  },
  {
    id: 14,
    nome: "Aquário Completo",
    preco: 1299.9,
    imagem: "img/produtos/aquario-completo.jpg",
    descricao: "Aquário completo com filtro e acessórios.",
    categoria: "acessorios",
    animal: "peixe",
    marca: "AuMor Accessories",
    avaliacao: 4.9,
    estoque: 10,
  },
  {
    id: 15,
    nome: "Gaiola para Roedores",
    preco: 89.9,
    imagem: "img/produtos/gaiola-roedores.jpg",
    descricao: "Gaiola confortável para roedores.",
    categoria: "acessorios",
    animal: "roedor",
    marca: "AuMor Accessories",
    avaliacao: 4.6,
    estoque: 20,
  },
  {
    id: 16,
    nome: "Bebedouro para Pets",
    preco: 59.9,
    imagem: "img/produtos/bebedouro-dog.jpg",
    categoria: "acessorios",
    animal: "cachorro",
    marca: "AuMor Accessories",
    avaliacao: 4.7,
    estoque: 35,
    descricao: "Brinquedo interativo para estimular seu cachorro.",
  },
  {
    id: 17,
    nome: "Ninho para Pássaros",
    preco: 79.9,
    imagem: "img/produtos/ninho-passaro.jpg",
    categoria: "camas",
    animal: "passaro",
    marca: "AuMor Comfort",
    avaliacao: 4.5,
    estoque: 15,
    descricao: "Ninho confortável para pássaros.",
  },
  {
    id: 18,
    nome: "Aquário Simples para Peixes",
    preco: 59.9,
    imagem: "img/produtos/aquario-peixe.jpg",
    categoria: "acessorios",
    animal: "peixe",
    marca: "AuMor Accessories",
    avaliacao: 4.8,
    estoque: 12,
    descricao: "Aquário completo com filtro e decoração.",
  },
  {
    id: 19,
    nome: "Globo para Hamsters",
    preco: 29.9,
    imagem: "img/produtos/globo-rato.jpg",
    categoria: "brinquedos",
    animal: "roedor",
    marca: "AuMor Toys",
    avaliacao: 4.6,
    estoque: 25,
    descricao: "Brinquedo divertido para seu hamster.",
  },
  {
    id: 20,
    nome: "Ração Premium para Gatos Filhotes",
    preco: 109.9,
    imagem: "img/produtos/racao-filhotes.jpg",
    categoria: "racao",
    animal: "gato",
    marca: "AuMor Premium",
    avaliacao: 4.9,
    estoque: 30,
    descricao: "Ração especial para gatos filhotes.",
  },
  {
    id: 21,
    nome: "Varinha Chocalho para Gatos",
    preco: 49.9,
    imagem: "img/produtos/varinha-chocalho.png",
    categoria: "brinquedos",
    animal: "gato",
    marca: "AuMor Toys",
    avaliacao: 4.7,
    estoque: 25,
    descricao: "Brinquedo interativo para estimular seu gato.",
  },
  {
    id: 22,
    nome: "Playground para Passaros",
    preco: 159.9,
    imagem: "img/produtos/playground-aves.jpg",
    categoria: "brinquedos",
    animal: "passaro",
    marca: "AuMor Toys",
    avaliacao: 4.8,
    estoque: 15,
    descricao: "Playground para passaros com estrutura de madeira.",
  },
  {
    id: 23,
    nome: "Bola de fut. americano para cães",
    preco: 34.9,
    imagem: "img/produtos/bola-fut-amer.jpg",
    categoria: "brinquedos",
    animal: "cachorro",
    marca: "AuMor Accessories",
    avaliacao: 4.6,
    estoque: 30,
    descricao: "Bola de fut. americano para cães.",
  },
  {
    id: 24,
    nome: "Roda para hamsters",
    preco: 29.9,
    imagem: "img/produtos/roda-pet.jpg",
    categoria: "brinquedos",
    animal: "roedor",
    marca: "AuMor Toys",
    avaliacao: 4.7,
    estoque: 25,
    descricao: "Raoda para hamsters.",
  },
  {
    id: 25,
    nome: "Bolinha para cães",
    preco: 9.9,
    imagem: "img/produtos/bolinha-dog.jpg",
    categoria: "brinquedos",
    animal: "cachorro",
    marca: "AuMor Toys",
    avaliacao: 4.9,
    estoque: 10,
    descricao: "Bolinha divertida para cães.",
  },
  {
    id: 26,
    nome: "Colônia para cães",
    preco: 19.9,
    imagem: "img/produtos/colonia-dog.jpg",
    categoria: "higiene",
    animal: "cachorro",
    marca: "AuMor Higiene",
    avaliacao: 4.6,
    estoque: 20,
    descricao: "Colônia para cães, para deixar seu pet com o cheiro do seu.",
  },
  {
    id: 27,
    nome: "Escova de dente para cães",
    preco: 39.9,
    imagem: "img/produtos/escova-dente-pet.jpg",
    categoria: "higiene",
    animal: "cachorro",
    marca: "AuMor Higiene",
    avaliacao: 4.8,
    estoque: 35,
    descricao: "Escova de dente para cães, para um halito mais limpinho.",
  },
  {
    id: 28,
    nome: "Escova de pelo para cães",
    preco: 39.9,
    imagem: "img/produtos/escova-pentear.jpg",
    categoria: "acessorios",
    animal: "cachorro",
    marca: "AuMor Accessories",
    avaliacao: 4.5,
    estoque: 15,
    descricao: "Escova de pelo para cães, para um pelo mais liso e saudável.",
  },
  {
    id: 29,
    nome: "Kit banho 3 em 1",
    preco: 39.9,
    imagem: "img/produtos/kit-banho-pet.jpg",
    categoria: "higiene",
    animal: "peixe",
    marca: "AuMor Higiene",
    avaliacao: 4.8,
    estoque: 12,
    descricao: "Kit banho 3 em 1, para deixar seu pet com o cheiro de amor.",
  },
  {
    id: 30,
    nome: "Kit briqnuedos",
    preco: 89.9,
    imagem: "img/produtos/kit-brinquedo-pet.jpg",
    categoria: "brinquedos",
    animal: "roedor",
    marca: "AuMor Toys",
    avaliacao: 4.6,
    estoque: 25,
    descricao: "Brinquedos divertidos e variados para seu pet.",
  },
  {
    id: 31,
    nome: "Kit Brinquedo para roedores",
    preco: 69.9,
    imagem: "img/produtos/kit-roedores.jpg",
    categoria: "brinquedos",
    animal: "roedor",
    marca: "AuMor Toys",
    avaliacao: 4.9,
    estoque: 30,
    descricao: "Brinquedos divertidos e variados para seu roedor favorito.",
  },
  {
    id: 32,
    nome: "Laço decorativo para cães",
    preco: 19.9,
    imagem: "img/produtos/laco-decorativo.jpeg",
    categoria: "acessorios",
    animal: "cachorro",
    marca: "AuMor Accessories",
    avaliacao: 4.7,
    estoque: 35,
    descricao: "Laço decorativo para cães, para deixar seu pet mais estiloso.",
  },
  {
    id: 33,
    nome: "Luva tira pelos",
    preco: 39.9,
    imagem: "img/produtos/luva-tira-pelos.jpg",
    categoria: "acessorios",
    animal: "cachorro",
    marca: "AuMor Accessories",
    avaliacao: 4.5,
    estoque: 15,
    descricao: "Luva tira pelos para cães, para deixar seu pet mais limpinho.",
  },
  {
    id: 34,
    nome: "Ossinho para cães",
    preco: 49.9,
    imagem: "img/produtos/ossinho-dog.jpg",
    categoria: "petiscos",
    animal: "cachorro",
    marca: "AuMor Petiscos",
    avaliacao: 4.8,
    estoque: 12,
    descricao: "Ossinho para cães, para deixar seu pet mais feliz.",
  },
  {
    id: 35,
    nome: "Ossinho Palitinho",
    preco: 29.9,
    imagem: "img/produtos/ossinho-palito.jpg",
    categoria: "petiscos",
    animal: "roedor",
    marca: "AuMor Petiscos",
    avaliacao: 4.6,
    estoque: 25,
    descricao: "Ossinho palitinho para seu pet se divertir.",
  },
  {
    id: 36,
    nome: "Macaco de pelucia",
    preco: 59.9,
    imagem: "img/produtos/pelucia-pet.jpg",
    categoria: "brinquedos",
    animal: "gato",
    marca: "AuMor Toys",
    avaliacao: 4.9,
    estoque: 30,
    descricao: "Macaco de pelucia para seu pet se divertir.",
  },
  {
    id: 37,
    nome: "Roupinha para cães",
    preco: 59.9,
    imagem: "img/produtos/roupinha-dog.jpg",
    categoria: "acessorios",
    animal: "cachorro",
    marca: "AuMor Accessories",
    avaliacao: 4.7,
    estoque: 35,
    descricao: "Roupinha para cães, para deixar seu pet mais estiloso.",
  },
  {
    id: 38,
    nome: "Shampoo para cães",
    preco: 59.9,
    imagem: "img/produtos/shampoo-cat.jpg",
    categoria: "higiene",
    animal: "cachorro",
    marca: "AuMor Higiene",
    avaliacao: 4.5,
    estoque: 15,
    descricao: "Shampoo para cães, para deixar seu pet mais limpinho.",
  },
  {
    id: 39,
    nome: "Shampoo para filhotes",
    preco: 19.9,
    imagem: "img/produtos/shampoo-filhotes.jpg",
    categoria: "higiene",
    animal: "cachorro",
    marca: "AuMor Higiene",
    avaliacao: 4.8,
    estoque: 12,
    descricao: "Shampoo para filhotes, para deixar seu pet mais limpinho.",
  },
  {
    id: 40,
    nome: "Brinquedo triangulo pra cachorros",
    preco: 29.9,
    imagem: "img/produtos/triangulo-dog.jpg",
    categoria: "brinquedos",
    animal: "cachorro",
    marca: "AuMor Toys",
    avaliacao: 4.6,
    estoque: 25,
    descricao: "Brinquedo triangulo para cães, para deixar seu pet mais feliz.",
  },
];

// Inicialização
document.addEventListener("DOMContentLoaded", function () {
  // Inicializa os produtos
  allProducts = [...produtosData];
  produtosFiltrados = [...produtosData];

  // Renderiza os produtos
  renderizarProdutos();

  // Configura os event listeners
  configurarEventListeners();

  // Atualiza o contador do carrinho
  atualizarContadorCarrinho();

  // Inicia o slide de mensagens
  iniciarSlideMessages();
});

// Função para iniciar o slide de mensagens
function iniciarSlideMessages() {
  // Cria o container de mensagens se não existir
  if (!document.querySelector(".mensagem-container")) {
    const container = document.createElement("div");
    container.className = "mensagem-container text-center bg-light rounded";

    // Inserir antes da lista de produtos
    const produtosContainer = document.querySelector(".produtos-container");
    if (produtosContainer) {
      produtosContainer.parentNode.insertBefore(container, produtosContainer);
    }
  }

  let currentIndex = 0;
  const container = document.querySelector(".mensagem-container");

  function updateMessage() {
    if (container) {
      // Inicia a animação de fade out
      container.style.opacity = "0";

      setTimeout(() => {
        // Atualiza o texto
        container.textContent = mensagensSlide[currentIndex];
        // Inicia a animação de fade in
        container.style.opacity = "1";
        // Atualiza o índice para a próxima mensagem
        currentIndex = (currentIndex + 1) % mensagensSlide.length;
      }, 500);
    }
  }

  // Mostra a primeira mensagem
  updateMessage();

  // Atualiza a mensagem a cada 5 segundos
  setInterval(updateMessage, 5000);
}

// Função para configurar os event listeners
function configurarEventListeners() {
  // Filtros de categoria
  document.querySelectorAll(".filtro-categoria").forEach((checkbox) => {
    checkbox.addEventListener("change", (e) => {
      if (e.target.checked) {
        filters.categorias.push(e.target.value);
      } else {
        filters.categorias = filters.categorias.filter(
          (cat) => cat !== e.target.value
        );
      }
      aplicarFiltros();
    });
  });

  // Filtros de animal
  document.querySelectorAll(".filtro-animal").forEach((checkbox) => {
    checkbox.addEventListener("change", (e) => {
      if (e.target.checked) {
        filters.animais.push(e.target.value);
      } else {
        filters.animais = filters.animais.filter(
          (ani) => ani !== e.target.value
        );
      }
      aplicarFiltros();
    });
  });

  // Filtro de preço
  const precoMinInput = document.getElementById("precoMin");
  const precoMaxInput = document.getElementById("precoMax");
  const precoMinValor = document.getElementById("precoMinValor");
  const precoMaxValor = document.getElementById("precoMaxValor");

  precoMinInput.addEventListener("input", (e) => {
    filters.precoMin = Number(e.target.value);
    precoMinValor.textContent = e.target.value;
    aplicarFiltros();
  });

  precoMaxInput.addEventListener("input", (e) => {
    filters.precoMax = Number(e.target.value);
    precoMaxValor.textContent = e.target.value;
    aplicarFiltros();
  });

  // Ordenação
  document.getElementById("ordenacao").addEventListener("change", (e) => {
    filters.ordenacao = e.target.value;
    aplicarFiltros();
  });

  // Botão de aplicar filtros
  document
    .getElementById("aplicarFiltros")
    .addEventListener("click", aplicarFiltros);

  // Alternar visualização
  document.querySelectorAll(".view-options .btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const view = btn.dataset.view;
      toggleView(view);
    });
  });
}

// Função para aplicar filtros
function aplicarFiltros() {
  let filtrados = [...allProducts];

  // Filtro de categorias
  const categoriasSelecionadas = Array.from(
    document.querySelectorAll(".filtro-categoria:checked")
  ).map((cb) => cb.value);

  if (categoriasSelecionadas.length > 0) {
    filtrados = filtrados.filter((produto) =>
      categoriasSelecionadas.includes(produto.categoria)
    );
  }

  // Filtro de animais
  const animaisSelecionados = Array.from(
    document.querySelectorAll(".filtro-animal:checked")
  ).map((cb) => cb.value);

  if (animaisSelecionados.length > 0) {
    filtrados = filtrados.filter((produto) =>
      animaisSelecionados.includes(produto.animal)
    );
  }

  // Ordenação
  const ordenacao = document.getElementById("ordenacao").value;
  filtrados.sort((a, b) => {
    switch (ordenacao) {
      case "precoMenor":
        return a.preco - b.preco;
      case "precoMaior":
        return b.preco - a.preco;
      case "nomeAZ":
        return a.nome.localeCompare(b.nome);
      case "nomeZA":
        return b.nome.localeCompare(a.nome);
      case "relevancia":
        return b.avaliacao - a.avaliacao;
      default:
        return 0;
    }
  });

  produtosFiltrados = filtrados;
  currentPage = 1;
  renderizarProdutos();
}

// Função para renderizar os produtos
function renderizarProdutos() {
  const container = document.getElementById("produtos-grid");
  const inicio = (currentPage - 1) * ITEMS_PER_PAGE;
  const fim = inicio + ITEMS_PER_PAGE;
  const produtosPagina = produtosFiltrados.slice(inicio, fim);

  if (produtosPagina.length === 0) {
    container.innerHTML = `
      <div class="col-12 text-center py-5">
        <i class="fas fa-search fa-3x text-muted mb-3"></i>
        <p class="text-muted">Nenhum produto encontrado</p>
      </div>
    `;
    return;
  }

  let html = "";
  produtosPagina.forEach((produto) => {
    html += `
      <div class="col-md-4 col-lg-3 mb-4">
        <div class="card produto-card">
          <div class="card-img-container">
            <img src="${produto.imagem}" class="card-img-top" alt="${
      produto.nome
    }" loading="lazy">
          </div>
          <div class="card-body">
            <h5 class="card-title">${produto.nome}</h5>
            <p class="card-text">${produto.descricao}</p>
            <p class="text-muted mb-3">
              <small>
                <i class="fas fa-box"></i> Estoque: ${produto.estoque} unidades
              </small>
            </p>
            <div class="mt-auto">
              <div class="d-flex justify-content-between align-items-center">
                <span class="produto-preco">R$ ${produto.preco.toFixed(
                  2
                )}</span>
                <button class="btn btn-primary" onclick="adicionarAoCarrinho(${
                  produto.id
                })">
                  <i class="fas fa-cart-plus"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
  atualizarPaginacao();
}

// Função para atualizar a paginação
function atualizarPaginacao() {
  const totalPaginas = Math.ceil(produtosFiltrados.length / ITEMS_PER_PAGE);
  const paginacao = document.getElementById("paginacao");

  let html = "";

  // Botão Anterior
  html += `
    <li class="page-item ${currentPage === 1 ? "disabled" : ""}">
      <a class="page-link" href="#" onclick="mudarPagina(${
        currentPage - 1
      })">Anterior</a>
    </li>
  `;

  // Números das páginas
  for (let i = 1; i <= totalPaginas; i++) {
    html += `
      <li class="page-item ${i === currentPage ? "active" : ""}">
        <a class="page-link" href="#" onclick="mudarPagina(${i})">${i}</a>
      </li>
    `;
  }

  // Botão Próximo
  html += `
    <li class="page-item ${currentPage === totalPaginas ? "disabled" : ""}">
      <a class="page-link" href="#" onclick="mudarPagina(${
        currentPage + 1
      })">Próximo</a>
    </li>
  `;

  paginacao.innerHTML = html;
}

// Função para mudar de página
function mudarPagina(pagina) {
  if (
    pagina < 1 ||
    pagina > Math.ceil(produtosFiltrados.length / ITEMS_PER_PAGE)
  ) {
    return;
  }

  currentPage = pagina;
  renderizarProdutos();
}

// Função para adicionar ao carrinho
function adicionarAoCarrinho(produtoId) {
  const produto = allProducts.find((p) => p.id === produtoId);
  if (!produto) return;

  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  const itemExistente = carrinho.find((item) => item.id === produtoId);

  if (itemExistente) {
    itemExistente.quantidade++;
  } else {
    carrinho.push({
      id: produto.id,
      nome: produto.nome,
      preco: produto.preco,
      imagem: produto.imagem,
      quantidade: 1,
    });
  }

  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  atualizarContadorCarrinho();
  mostrarNotificacao("Produto adicionado ao carrinho!", "success");
}

// Função para atualizar contador do carrinho
function atualizarContadorCarrinho() {
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  const total = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
  document.getElementById("carrinho-contador").textContent = total;
}

// Função para mostrar notificações
function mostrarNotificacao(mensagem, tipo) {
  const toast = document.createElement("div");
  toast.className = `toast align-items-center text-white bg-${tipo} border-0 position-fixed bottom-0 end-0 m-3`;
  toast.setAttribute("role", "alert");
  toast.setAttribute("aria-live", "assertive");
  toast.setAttribute("aria-atomic", "true");

  toast.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">
        ${mensagem}
      </div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
    </div>
  `;

  document.body.appendChild(toast);
  const bsToast = new bootstrap.Toast(toast);
  bsToast.show();

  toast.addEventListener("hidden.bs.toast", function () {
    document.body.removeChild(toast);
  });
}

// Função para alternar visualização
function toggleView(view) {
  const container = document.getElementById("produtos-grid");
  const buttons = document.querySelectorAll(".view-options .btn");

  // Atualiza as classes dos botões
  buttons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.view === view);
  });

  // Atualiza a classe do container
  container.className = `row ${view === "list" ? "produtos-lista" : ""}`;

  // Re-renderiza os produtos para atualizar o layout
  renderizarProdutos();
}
