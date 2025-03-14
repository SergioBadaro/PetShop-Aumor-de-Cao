// Variáveis globais
let modalAgendamento;
let servicoSelecionado;

// Inicialização
document.addEventListener("DOMContentLoaded", function () {
  // Inicializa o modal de agendamento
  modalAgendamento = new bootstrap.Modal(
    document.getElementById("modalAgendamento")
  );

  // Configura a data mínima para agendamento (hoje)
  const dataInput = document.getElementById("data");
  const hoje = new Date().toISOString().split("T")[0];
  dataInput.min = hoje;

  // Atualiza o contador do carrinho
  atualizarContadorCarrinho();

  // Inicializa os tooltips
  var tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // Adiciona animação aos cards quando ficarem visíveis
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animated");
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll(".servico-card").forEach((card) => {
    observer.observe(card);
  });
});

// Função para abrir o modal de agendamento
function agendarServico(servico) {
  servicoSelecionado = servico;
  const modalTitle = document.querySelector("#modalAgendamento .modal-title");
  const titulos = {
    "banho-basico": "Agendar Banho e Tosa Básico",
    "banho-premium": "Agendar Banho e Tosa Premium",
    spa: "Agendar Spa Day",
    consulta: "Agendar Consulta Veterinária",
    exames: "Agendar Exames Laboratoriais",
    fisioterapia: "Agendar Fisioterapia",
    creche: "Agendar Creche",
    hotel: "Reservar Hospedagem",
    adestramento: "Agendar Adestramento",
    festa: "Reservar Festa de Aniversário",
    foto: "Agendar Sessão de Fotos",
    taxi: "Solicitar Taxi Dog",
  };

  if (modalTitle) {
    modalTitle.textContent = titulos[servico] || "Agendar Serviço";
  }

  modalAgendamento.show();
}

// Função para confirmar o agendamento
function confirmarAgendamento() {
  const form = document.getElementById("formAgendamento");

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  // Coleta os dados do formulário
  const dados = {
    servico: servicoSelecionado,
    nome: document.getElementById("nome").value,
    email: document.getElementById("email").value,
    telefone: document.getElementById("telefone").value,
    pet: document.getElementById("pet").value,
    especie: document.getElementById("especie").value,
    data: document.getElementById("data").value,
    hora: document.getElementById("hora").value,
    observacoes: document.getElementById("observacoes").value,
  };

  // Simula o envio dos dados (aqui você implementaria a chamada ao backend)
  const btnConfirmar = document.querySelector("#modalAgendamento .btn-primary");
  const textoOriginal = btnConfirmar.innerHTML;

  btnConfirmar.innerHTML =
    '<i class="fas fa-spinner fa-spin"></i> Processando...';
  btnConfirmar.disabled = true;

  setTimeout(() => {
    // Simula resposta do servidor
    mostrarNotificacao(
      "Agendamento realizado com sucesso! Entraremos em contato para confirmar.",
      "success"
    );

    // Fecha o modal
    modalAgendamento.hide();

    // Limpa o formulário
    form.reset();

    // Restaura o botão
    btnConfirmar.innerHTML = textoOriginal;
    btnConfirmar.disabled = false;
  }, 1500);
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

// Validação do formulário
document
  .getElementById("formAgendamento")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    if (this.checkValidity()) {
      confirmarAgendamento();
    }

    this.classList.add("was-validated");
  });

// Função para formatar o telefone
document.getElementById("telefone")?.addEventListener("input", function (e) {
  let value = e.target.value.replace(/\D/g, "");
  if (value.length > 11) value = value.slice(0, 11);

  if (value.length > 2) {
    value = "(" + value.slice(0, 2) + ") " + value.slice(2);
  }
  if (value.length > 9) {
    value = value.slice(0, 9) + "-" + value.slice(9);
  }

  e.target.value = value;
});

// Função para validar a data selecionada
document.getElementById("data")?.addEventListener("change", function (e) {
  const hoje = new Date();
  const dataSelecionada = new Date(e.target.value);

  if (dataSelecionada < hoje) {
    alert("Por favor, selecione uma data futura.");
    e.target.value = "";
  }
});

// Atualiza os horários disponíveis com base na data
document.getElementById("data")?.addEventListener("change", function (e) {
  const horaSelect = document.getElementById("hora");
  const dataSelecionada = new Date(e.target.value);

  // Simula horários disponíveis (aqui você implementaria a chamada ao backend)
  const horarios = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"];

  // Limpa as opções atuais
  horaSelect.innerHTML = '<option value="">Selecione...</option>';

  // Adiciona os horários disponíveis
  horarios.forEach((horario) => {
    const option = document.createElement("option");
    option.value = horario;
    option.textContent = horario;
    horaSelect.appendChild(option);
  });
});
