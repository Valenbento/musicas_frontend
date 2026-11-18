
const urlBackend = "http://localhost:3000"

const parametros = new URLSearchParams(window.location.search)
const id = parametros.get("id")

const inputTitulo = document.getElementById("titulo")
const inputArtista = document.getElementById("artista")
const inputGenero = document.getElementById("genero")
const inputAno = document.getElementById("ano")
const inputDuracao = document.getElementById("duracao")

const botaoSalvar = document.getElementById("botaoSalvar")

// BUSCAR MÚSICA
async function buscarMusica() {
    try {
        console.log("Buscando música. ID:", id)

        const resposta = await fetch(`${urlBackend}/musica/${id}`)

        console.log("Status da busca:", resposta.status)

        if (!resposta.ok) {
            throw new Error("Não foi possível buscar a música.")
        }

        const musica = await resposta.json()

        inputTitulo.value = musica.titulo
        inputArtista.value = musica.artista
        inputGenero.value = musica.genero
        inputAno.value = musica.ano
        inputDuracao.value = musica.duracao

        console.log("Música carregada:", musica)

    } catch (error) {
        console.log("Erro ao buscar música:", error)
        alert("Erro ao carregar os dados da música!")
    }
}

buscarMusica()

// SALVAR ALTERAÇÕES
async function salvarAlteracoes() {

    console.log("Função salvarAlteracoes chamada!")
    console.log("ID da música:", id)

    if (
        inputTitulo.value === "" ||
        inputArtista.value === "" ||
        inputGenero.value === "" ||
        inputAno.value === "" ||
        inputDuracao.value === ""
    ) {
        alert("Preencha todos os campos!")
        return
    }

    const musica = {
        titulo: inputTitulo.value,
        artista: inputArtista.value,
        genero: inputGenero.value,
        ano: inputAno.valueAsNumber,
        duracao: inputDuracao.valueAsNumber
    }

    console.log("Dados enviados:", musica)

    try {
        const resposta = await fetch(`${urlBackend}/editar/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(musica)
        })

        console.log("Status da resposta:", resposta.status)

        const respostaTransformada = await resposta.json()

        console.log("Mensagem do backend:", respostaTransformada.mensagem)

        if (!resposta.ok) {
            throw new Error(respostaTransformada.mensagem || "Erro ao editar música.")
        }

        alert(respostaTransformada.mensagem)

        window.location.href = "index.html"

    } catch (error) {
        console.log("Erro ao salvar alterações:", error)
        alert("Não foi possível salvar as alterações. Verifique o Console (F12).")
    }
}

// EVENTO DO BOTÃO
botaoSalvar.addEventListener("click", salvarAlteracoes)

console.log("JavaScript carregado!")
console.log("Botão encontrado:", botaoSalvar)
