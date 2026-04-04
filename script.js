const menuToggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");

menuToggle.addEventListener("click", () => {
  menu.classList.toggle("ativo");
});

const elementosReveal = document.querySelectorAll(".reveal");

function revelarAoScroll() {
  const alturaJanela = window.innerHeight;

  elementosReveal.forEach((elemento) => {
    const topoElemento = elemento.getBoundingClientRect().top;
    const pontoRevelacao = 100;

    if (topoElemento < alturaJanela - pontoRevelacao) {
      elemento.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revelarAoScroll);
window.addEventListener("load", revelarAoScroll);

const btnWhatsapp = document.getElementById("btn-whatsapp");
const btnEmail = document.getElementById("btn-email");
const retorno = document.getElementById("retorno-form");

function obterDadosFormulario() {
  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const mensagem = document.getElementById("mensagem").value.trim();

  return { nome, email, mensagem };
}

function validarFormulario(nome, email, mensagem) {
  if (!nome || !email || !mensagem) {
    retorno.textContent = "Preencha todos os campos antes de enviar.";
    retorno.style.color = "red";
    return false;
  }

  retorno.textContent = "";
  return true;
}

btnWhatsapp.addEventListener("click", () => {
  const { nome, email, mensagem } = obterDadosFormulario();

  if (!validarFormulario(nome, email, mensagem)) return;

  const numeroWhatsapp = "5547996771930";
  const texto = `Olá! Meu nome é ${nome}.%0AEmail: ${email}.%0A%0AMensagem:%0A${mensagem}`;
  const link = `https://wa.me/${numeroWhatsapp}?text=${texto}`;

  retorno.textContent = "Abrindo WhatsApp...";
  retorno.style.color = "green";

  window.open(link, "_blank");
});

btnEmail.addEventListener("click", () => {
  const { nome, email, mensagem } = obterDadosFormulario();

  if (!validarFormulario(nome, email, mensagem)) return;

  const emailDestino = "contato@ecologimais.com";
  const assunto = encodeURIComponent(`Contato pelo site - ${nome}`);
  const corpo = encodeURIComponent(
    `Nome: ${nome}\nEmail: ${email}\n\nMensagem:\n${mensagem}`
  );

  const link = `mailto:${emailDestino}?subject=${assunto}&body=${corpo}`;

  retorno.textContent = "Abrindo seu aplicativo de e-mail...";
  retorno.style.color = "green";

  window.location.href = link;
});