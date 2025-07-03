// Inicialização
document.addEventListener("DOMContentLoaded", function () {
  // Atualiza o contador do carrinho
  atualizarContadorCarrinho();

  // Inicializa a validação do formulário
  const form = document.getElementById("formContato");
  form.addEventListener("submit", validarFormulario);
});

// Função para validar o formulário
function validarFormulario(event) {
  event.preventDefault();

  const form = event.target;

  if (!form.checkValidity()) {
    event.stopPropagation();
    form.classList.add("was-validated");
    return;
  }

  // Coleta os dados do formulário
  const dados = {
    nome: document.getElementById("nome").value,
    email: document.getElementById("email").value,
    assunto: document.getElementById("assunto").value,
    mensagem: document.getElementById("mensagem").value,
  };

  // Aqui você pode implementar a lógica para enviar os dados para um servidor
  // Por enquanto, vamos apenas mostrar uma mensagem de sucesso
  mostrarNotificacao(
    "Mensagem enviada com sucesso! Entraremos em contato em breve.",
    "success"
  );

  // Limpa o formulário
  form.reset();
  form.classList.remove("was-validated");
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

  // Remove o toast após ser fechado
  toast.addEventListener("hidden.bs.toast", function () {
    document.body.removeChild(toast);
  });
}

// Função para atualizar o contador do carrinho
function atualizarContadorCarrinho() {
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  const contador = document.getElementById("carrinho-contador");
  const totalItens = carrinho.reduce(
    (total, item) => total + item.quantidade,
    0
  );
  contador.textContent = totalItens;
}

// Validação de email
function validarEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Validação em tempo real do email
document.getElementById("email").addEventListener("input", function () {
  const email = this.value;
  const feedback = this.nextElementSibling;

  if (!validarEmail(email)) {
    this.setCustomValidity("Por favor, informe um email válido.");
    feedback.textContent = "Por favor, informe um email válido.";
  } else {
    this.setCustomValidity("");
    feedback.textContent = "Por favor, informe seu email.";
  }
});
