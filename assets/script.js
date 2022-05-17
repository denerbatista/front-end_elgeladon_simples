const baseUrl = "http://localhost:3000/paletas";

function modalErrorA() {
  const modalError = document.querySelector(".modalError");
  modalError.style.display = "block";
}

function modalErrorF() {
  const modalError = document.querySelector(".modalError");
  modalError.style.display = "none";
}

function receberMensagem(array) {
  document.querySelector("#mensagemError").innerText = `${array.mensagem}`;
  modalErrorA();
  setTimeout(() => {
    modalErrorF();
  }, 5000);
}

async function findAllPaletas() {
  const response = await fetch(`${baseUrl}/find-paletas`);

  const paletas = await response.json();

  if (paletas.mensagem) {
    receberMensagem(paletas);
  } else {
    paletas.forEach((paleta) => {
      document.getElementById("paletaList").insertAdjacentHTML(
        "beforeend",
        `<div class="PaletaListaItem">
        <div>
            <div class="PaletaListaItem__sabor">${paleta.sabor}</div>
            <div class="PaletaListaItem__preco">R$ ${paleta.preco.toFixed(
              2
            )}</div>
            <div class="PaletaListaItem__descricao">${paleta.descricao}</div>
          </div>
            <img class="PaletaListaItem__foto" src=${
              paleta.foto
            } alt=${`Paleta de ${paleta.sabor}`} />
        </div>`
      );
    });
  }
}

async function findPaletaById() {
  const id = document.getElementById("idPaleta").value;

  const response = await fetch(`${baseUrl}/find-paleta/${id}`);

  const paleta = await response.json();

  if (paleta.mensagem) {
    receberMensagem(paleta);
  } else {
    const paletaEscolhidaDiv = document.getElementById("paletaEscolhida");

    paletaEscolhidaDiv.innerHTML = `<div class="PaletaCardItem">
      <div>
        <div class="PaletaCardItem__sabor">${paleta.sabor}</div>
        <div class="PaletaCardItem__preco">R$ ${paleta.preco.toFixed(2)}</div>
        <div class="PaletaCardItem__descricao">${paleta.descricao}</div>
      </div>
        <img class="PaletaCardItem__foto" src=${
          paleta.foto
        } alt=${`Paleta de ${paleta.sabor}`} />
    </div>`;
  }
}

findAllPaletas();
