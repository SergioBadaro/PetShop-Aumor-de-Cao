// Variáveis globais
let produtos = [];
let carrinho = [];

// Inicialização
document.addEventListener("DOMContentLoaded", function () {
  // Carrega o carrinho do localStorage
  carregarCarrinho();

  // Configura os event listeners para as opções de pagamento
  configurarPagamento();

  // Atualiza o contador do carrinho
  atualizarContadorCarrinho();
});

// Função para carregar o carrinho
function carregarCarrinho() {
  carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  renderizarProdutos();
  atualizarResumo();
}

// Função para renderizar os produtos no carrinho
function renderizarProdutos() {
  const container = document.getElementById("carrinho-items");

  if (!container) return;

  if (carrinho.length === 0) {
    container.innerHTML = `
      <div class="text-center py-5">
        <i class="fas fa-shopping-cart fa-3x text-muted mb-3"></i>
        <p class="text-muted">Seu carrinho está vazio</p>
        <a href="produtos.html" class="btn btn-primary">Continuar Comprando</a>
      </div>
    `;
    return;
  }

  let html = "";
  carrinho.forEach((item, index) => {
    html += `
      <div class="carrinho-item d-flex align-items-center mb-3 pb-3 border-bottom">
        <img src="${item.imagem}" alt="${
      item.nome
    }" class="img-thumbnail me-3" style="width: 100px;">
        <div class="flex-grow-1">
          <h5 class="mb-1">${item.nome}</h5>
          <div class="d-flex align-items-center">
            <div class="input-group input-group-sm" style="width: 120px;">
              <button class="btn btn-outline-secondary" type="button" onclick="atualizarQuantidade(${index}, -1)">-</button>
              <input type="text" class="form-control text-center" value="${
                item.quantidade
              }" readonly>
              <button class="btn btn-outline-secondary" type="button" onclick="atualizarQuantidade(${index}, 1)">+</button>
            </div>
            <span class="ms-3">R$ ${(item.preco * item.quantidade).toFixed(
              2
            )}</span>
          </div>
        </div>
        <button class="btn btn-link text-danger" onclick="removerItem(${index})">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    `;
  });

  container.innerHTML = html;
}

// Função para atualizar a quantidade de um item
function atualizarQuantidade(index, delta) {
  const item = carrinho[index];
  const novaQuantidade = item.quantidade + delta;

  if (novaQuantidade > 0) {
    item.quantidade = novaQuantidade;
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    renderizarProdutos();
    atualizarResumo();
    atualizarContadorCarrinho();
  }
}

// Função para remover um item do carrinho
function removerItem(index) {
  carrinho.splice(index, 1);
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  renderizarProdutos();
  atualizarResumo();
  atualizarContadorCarrinho();
}

// Função para atualizar o resumo do pedido
function atualizarResumo() {
  const subtotal = carrinho.reduce((total, item) => {
    return total + item.preco * item.quantidade;
  }, 0);

  const frete = carrinho.length > 0 ? 15 : 0;
  const total = subtotal + frete;

  document.getElementById("subtotal").textContent = `R$ ${subtotal.toFixed(2)}`;
  document.getElementById("frete").textContent = `R$ ${frete.toFixed(2)}`;
  document.getElementById("total").textContent = `R$ ${total.toFixed(2)}`;
}

// Função para configurar as opções de pagamento
function configurarPagamento() {
  const metodoPagamento = document.getElementsByName("metodoPagamento");
  metodoPagamento.forEach((metodo) => {
    metodo.addEventListener("change", () => {
      atualizarFormaPagamento(metodo.value);
    });
  });

  // Configurar máscaras de input
  const numeroCartao = document.querySelector(
    '#formCartao input[placeholder="0000 0000 0000 0000"]'
  );
  if (numeroCartao) {
    numeroCartao.addEventListener("input", function (e) {
      let value = e.target.value.replace(/\D/g, "");
      value = value.replace(/(\d{4})(?=\d)/g, "$1 ");
      e.target.value = value;
    });
  }

  const validade = document.querySelector(
    '#formCartao input[placeholder="MM/AA"]'
  );
  if (validade) {
    validade.addEventListener("input", function (e) {
      let value = e.target.value.replace(/\D/g, "");
      if (value.length >= 2) {
        value = value.substring(0, 2) + "/" + value.substring(2);
      }
      e.target.value = value;
    });
  }

  const cvv = document.querySelector('#formCartao input[placeholder="123"]');
  if (cvv) {
    cvv.addEventListener("input", function (e) {
      e.target.value = e.target.value.replace(/\D/g, "");
    });
  }
}

// Função para abrir o modal de pagamento
function abrirModalPagamento() {
  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }

  const modalPagamento = new bootstrap.Modal(
    document.getElementById("modalPagamento")
  );
  const metodoPagamento = document.querySelector(
    'input[name="metodoPagamento"]:checked'
  ).value;

  atualizarFormaPagamento(metodoPagamento);
  modalPagamento.show();

  // Adiciona animação de entrada
  const modalContent = document.querySelector(".modal-content");
  modalContent.style.animation = "slideIn 0.3s ease-out";
}

// Função para atualizar forma de pagamento
function atualizarFormaPagamento(metodo) {
  const formasPagamento = document.querySelectorAll(".forma-pagamento");
  formasPagamento.forEach((forma) => {
    forma.classList.add("d-none");
    forma.style.opacity = "0";
  });

  const formaSelecionada = document.getElementById(
    `form${metodo.charAt(0).toUpperCase() + metodo.slice(1)}`
  );
  if (formaSelecionada) {
    formaSelecionada.classList.remove("d-none");
    // Adiciona animação de fade
    setTimeout(() => {
      formaSelecionada.style.opacity = "1";
      formaSelecionada.style.transform = "translateY(0)";
    }, 50);
  }
}

// Função para copiar chave PIX
function copiarChavePix() {
  const chavePix = document.querySelector(".pix-key-container input");
  if (chavePix) {
    chavePix.select();
    document.execCommand("copy");

    // Feedback visual
    const botaoCopiar = document.querySelector(".pix-key-container button");
    const iconOriginal = botaoCopiar.innerHTML;
    botaoCopiar.innerHTML = '<i class="fas fa-check"></i>';
    botaoCopiar.classList.add("btn-success");

    setTimeout(() => {
      botaoCopiar.innerHTML = iconOriginal;
      botaoCopiar.classList.remove("btn-success");
    }, 2000);
  }
}

// Função para finalizar compra
function finalizarCompra() {
  const metodoPagamento = document.querySelector(
    'input[name="metodoPagamento"]:checked'
  ).value;
  let mensagem = "";

  switch (metodoPagamento) {
    case "cartao":
      // Validar campos do cartão aqui
      mensagem = "Pagamento com cartão processado com sucesso!";
      break;
    case "pix":
      mensagem = "Aguardando confirmação do pagamento via PIX";
      break;
    case "boleto":
      mensagem = "Boleto gerado com sucesso! Verifique seu email.";
      break;
  }

  // Animação de loading
  const btnConfirmar = document.querySelector(".modal-footer .btn-primary");
  const textoOriginal = btnConfirmar.innerHTML;
  btnConfirmar.innerHTML =
    '<i class="fas fa-spinner fa-spin"></i> Processando...';
  btnConfirmar.disabled = true;

  setTimeout(() => {
    // Simula processamento
    alert(mensagem);

    // Limpa o carrinho
    carrinho = [];
    localStorage.setItem("carrinho", JSON.stringify(carrinho));

    // Fecha o modal
    const modalPagamento = bootstrap.Modal.getInstance(
      document.getElementById("modalPagamento")
    );
    modalPagamento.hide();

    // Atualiza a página
    renderizarProdutos();
    atualizarResumo();
    atualizarContadorCarrinho();

    // Restaura o botão
    btnConfirmar.innerHTML = textoOriginal;
    btnConfirmar.disabled = false;
  }, 2000);
}

// Função para atualizar contador do carrinho
function atualizarContadorCarrinho() {
  const contador = document.getElementById("carrinho-contador");
  if (contador) {
    const totalItens = carrinho.reduce(
      (total, item) => total + item.quantidade,
      0
    );
    contador.textContent = totalItens;
    contador.style.display = totalItens > 0 ? "block" : "none";
  }
}
