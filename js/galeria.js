/**
 * js/galeria.js
 * Script de controle da galeria, modais e visualização de espécies.
 */

// Cache dos elementos do DOM e do modal
const modal = document.getElementById("myModal");
const botaoFechar = document.getElementsByClassName("close")[0];
const imagemModal = document.getElementById("modal-img");
const nomeModal = document.getElementById("modal-dino-name");
const dietaModal = document.getElementById("modal-diet-icon");

const elemPrecoM = document.getElementById("precoM");
const elemAvatarM = document.getElementById("avatarM");

const elemEspacos = document.getElementById("stat-group");
const elemCrescimento = document.getElementById("stat-growth");
const elemPreco = document.getElementById("stat-price");
const elemSkin1 = document.getElementById("stat-skin1");
const elemSkin2 = document.getElementById("stat-skin2");
const elemAvatar = document.getElementById("stat-fotinha");
const elemCorGema = document.getElementById("stat-corgema");
const elemCorMoeda = document.getElementById("stat-cormoeda");

const dinoHp = document.getElementById("hp-dino");
const dinoDano = document.getElementById("dmg-dino");
const dinoPeso = document.getElementById("peso-dino");
const dinoFratura = document.getElementById("frat-dino");
const dinoSangramento = document.getElementById("sangra-dino");
const dinoNata = document.getElementById("nata-dino");
const dinoVelo = document.getElementById("velo-dino");
const dinoVoo = document.getElementById("voo-dino");

const containerPassivas = document.getElementById("passives-container");
const containerAtivas = document.getElementById("actives-container");
const botaoPaleo = document.getElementById("btn-paleo-modal");

const modalImgCont = document.getElementById("imgModal");
const modalImgContent = document.getElementById("imgModalContent");

const seletorFiltro = document.getElementById("filtroAtributo");
const campoPesquisa = document.getElementById("dinoEspecifico");

// Cache da base de dados imutável
let cachedDinoDatabase = null;

/**
 * Carrega a base de dados de forma assíncrona, tratando erros e retornando um objeto imutável.
 * @returns {Promise<Object>} Objeto congelado com a base de dados dos dinossauros
 */
async function obterBancoDadosDinos() {
    if (cachedDinoDatabase) return cachedDinoDatabase;

    if (!window.dinoDatabaseReady) {
        window.dinoDatabaseReady = fetch("data/dinoDataBase.json", { credentials: 'omit' }).then(response => {
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return response.json();
        });
    }

    try {
        const data = await window.dinoDatabaseReady;
        cachedDinoDatabase = Object.freeze({ ...data });
        return cachedDinoDatabase;
    } catch (error) {
        console.error("Erro ao carregar a base de dados dos dinossauros:", error);
        alert("Falha ao carregar os dados dos dinossauros. Verifique sua conexão.");
        throw error;
    }
}

/**
 * Normaliza strings removendo acentos e convertendo para minúsculas.
 * @param {string} value - String para normalizar
 * @returns {string} String normalizada
 */
function normalizarTexto(value = "") {
    return String(value)
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();
}

/**
 * Busca o status do dinossauro a partir da base de dados global dinosData.
 * @param {string} chaveDino - Nome curto ou chave do dinossauro
 * @returns {Object|null} Objeto com os status do dinossauro ou null
 */
function obterStatusDino(chaveDino) {
    if (typeof dinosData === "undefined" || !Array.isArray(dinosData)) return null;

    const chaveNormalizada = normalizarTexto(chaveDino);
    return dinosData.find(dino => normalizarTexto(dino.nome).split(/\s+/)[0] === chaveNormalizada) || null;
}

/**
 * Formata e obtém o texto do efeito ativo baseado nos dados do dinossauro.
 * @param {string} chaveDino - Chave do dinossauro
 * @param {number} indiceAtiva - Índice da habilidade ativa
 * @returns {string} Descrição do efeito da habilidade
 */
function obterEfeitoAtiva(chaveDino, indiceAtiva) {

    const statusDino = obterStatusDino(chaveDino);
    if (!statusDino?.ativas) return null;

    const chaveHabilidade = `skill${indiceAtiva + 1}`;
    if (!statusDino.ativas[chaveHabilidade]) return "Nenhum efeito cadastrado!";

    let dano = statusDino.ativas[chaveHabilidade].dano;
    let recarga = null;

    if (dano == null || dano === "" || dano === "indefinido") {
        return "Nenhum efeito cadastrado!";
    } else {
        recarga = statusDino.ativas[chaveHabilidade].tr;
    }

    if (recarga != null && recarga !== "" && recarga !== "indefinido") {
        dano = `${dano} de dano.`;
        recarga = `Recarga em ${recarga} segundos.`;
    }
    return `${dano} ${recarga || ""}`.trim();
}

/**
 * Cria o HTML estruturado para uma habilidade.
 * @param {Object} dadosHabilidade - Dados contendo ícone, título, descrição e efeito
 * @returns {string} HTML estruturado
 */
function criarHtmlHabilidade({ icon = "img/logo.png", title = "Habilidade", desc = "", effect = null }) {
    const efeitoHtml = effect != null && effect !== "null"
        ? `<div class="skill-effect"><strong></strong> ${effect}</div>`
        : "";

    return `
        <div class="skill-item">
            <img src="${icon}" class="skill-icon" alt="${title}">
            <div class="skill-text">
                <h5>${title}</h5>
                <p>${desc}</p>
            </div>
        </div>
        ${efeitoHtml}`;
}

/**
 * Fecha o modal principal utilizando classes CSS e fallback de display.
 */
function fecharModal() {
    if (!modal) return;
    modal.classList.remove("open");
    modal.style.display = "none";
}

/**
 * Preenche os atributos de status de combate no modal.
 * @param {Object|null} statusDino - Objeto com os status de combate
 */
function preencherStatusModal(statusDino) {
    const atribuirTexto = (elemento, valor) => {
        if (elemento) elemento.innerText = valor ?? "N/A";
    };

    const mapaStatus = [
        { elem: dinoHp, val: statusDino?.hp },
        { elem: dinoDano, val: statusDino?.dano_base },
        { elem: dinoPeso, val: statusDino?.peso },
        { elem: dinoFratura, val: statusDino ? `${statusDino.fratura}%` : "N/A" },
        { elem: dinoSangramento, val: statusDino ? `${statusDino.sangramento}%` : "N/A" },
        { elem: dinoNata, val: statusDino?.vel_agua },
        { elem: dinoVelo, val: statusDino?.vel_terra },
        { elem: dinoVoo, val: statusDino?.vel_ar ?? "N/A" }
    ];

    mapaStatus.forEach(({ elem, val }) => atribuirTexto(elem, val));
}

/**
 * Preenche todas as informações do dinossauro no modal e o exibe.
 * @param {string} chaveDino - Chave identificadora
 * @param {Object} dados - Dados específicos do arquivo JSON
 */
function preencherModalDino(chaveDino, dados) {
    if (nomeModal) nomeModal.innerHTML = dados.fullName || dados.shortName || chaveDino;
    if (imagemModal) {
        imagemModal.src = dados.image || "img/logo.png";
        imagemModal.alt = `Retrato de ${dados.shortName || chaveDino}`;
    }
    if (dietaModal) dietaModal.innerText = dados.diet || "";

    const dicionarioImagens = {
        "free": "img/free.png",
        "gema": "img/gema.png",
        "moeda": "img/moeda.png"
    };

    const avatarVal = dados.prices?.avatar ?? "free";
    if (elemAvatarM) {
        elemAvatarM.src = avatarVal.includes("/") ? avatarVal : (dicionarioImagens[avatarVal] || avatarVal);
        elemAvatarM.alt = avatarVal;
    }

    const precoVal = dados.prices?.price ?? "free";
    if (elemPrecoM) {
        elemPrecoM.src = precoVal.includes("/") ? precoVal : (dicionarioImagens[precoVal] || precoVal);
        elemPrecoM.alt = precoVal;
    }

    const mapaEstatisticas = [
        { elem: elemEspacos, val: dados.stats?.group },
        { elem: elemCrescimento, val: dados.stats?.growth },
        { elem: elemPreco, val: dados.stats?.price },
        { elem: elemSkin1, val: dados.stats?.skin1 },
        { elem: elemSkin2, val: dados.stats?.skin2 },
        { elem: elemAvatar, val: dados.stats?.fotinha },
        { elem: elemCorGema, val: dados.stats?.corgema },
        { elem: elemCorMoeda, val: dados.stats?.cormoeda }
    ];

    mapaEstatisticas.forEach(({ elem, val }) => {
        if (elem) elem.innerText = val ?? "N/A";
    });

    preencherStatusModal(obterStatusDino(chaveDino));

    if (containerPassivas) {
        containerPassivas.innerHTML = (dados.passives || []).map(criarHtmlHabilidade).join("");
    }
    if (containerAtivas) {
        containerAtivas.innerHTML = (dados.actives || []).map((habilidade, indice) => {
            if(habilidade.icon === "img/skill/investida.png" || habilidade.icon === "img/skill/investidaP.png") {
                const efeitoFinal1 = `+25% velocidade, +15% consumo de vigor. Dano base máximo ${obterEfeitoAtiva(chaveDino, indice)}`;
                return criarHtmlHabilidade({
                    ...habilidade,
                    effect: efeitoFinal1
                });
            } else{
                const efeitoFinal = habilidade.effect != null && habilidade.effect !== "" 
                    ? habilidade.effect
                    : obterEfeitoAtiva(chaveDino, indice);

                return criarHtmlHabilidade({
                    ...habilidade,
                    effect: efeitoFinal
                });
            }
        }).join("");
    }

    if (botaoPaleo) {
        botaoPaleo.dataset.url = `https://en.wikipedia.org/wiki/${encodeURIComponent(dados.shortName || chaveDino)}`;
    }

    if (modal) {
        modal.classList.add("open");
        modal.style.display = "block";
    }
}

/**
 * Abre o modal do dinossauro buscando os dados no banco de forma assíncrona.
 * @param {string} chaveDino - Chave do dinossauro
 */
async function abrirModalDino(chaveDino) {
    if (!chaveDino) return;

    try {
        const bancoDados = await obterBancoDadosDinos();
        const dados = bancoDados[chaveDino];
        if (!dados) return;
        preencherModalDino(chaveDino, dados);
    } catch (erro) {
        console.error("Falha ao abrir o modal do dinossauro:", erro);
    }
}

/**
 * Abre a imagem ampliada em modal próprio.
 * @param {HTMLImageElement} img - Elemento de imagem clicado
 */
function abrirImagemDino(img) {
    if (!modalImgCont || !modalImgContent) return;
    modalImgCont.classList.add("open");
    modalImgCont.style.display = "flex";
    modalImgContent.src = img.src;
    modalImgContent.alt = img.alt || "Imagem ampliada";
}

/**
 * Define a aba ativa e altera os atributos ARIA correspondentes.
 * @param {HTMLElement} botao - Botão da aba clicada
 * @param {string} seletorBotao - Seletor CSS dos botões da aba
 * @param {string} seletorPainel - Seletor CSS dos painéis
 */
function definirAbaAtiva(botao, seletorBotao, seletorPainel) {
    const idAlvo = botao.getAttribute("data-target");

    document.querySelectorAll(seletorBotao).forEach(btnAba => {
        const estaAtivo = btnAba === botao;
        btnAba.classList.toggle("active", estaAtivo);
        btnAba.setAttribute("aria-selected", estaAtivo ? "true" : "false");
    });

    document.querySelectorAll(seletorPainel).forEach(painel => {
        const estaAtivo = painel.id === idAlvo;
        painel.classList.toggle("active-content", estaAtivo);
    });
}

/**
 * Inicializa os eventos de clique nas abas.
 * @param {string} seletorBotao - Seletor CSS dos botões da aba
 * @param {string} seletorPainel - Seletor CSS dos painéis
 */
function configurarAbas(seletorBotao, seletorPainel) {
    document.querySelectorAll(seletorBotao).forEach(botao => {
        botao.addEventListener("click", () => {
            definirAbaAtiva(botao, seletorBotao, seletorPainel);
            window.applyGallerySearch?.(campoPesquisa?.value || "");
        });
    });
}

/**
 * Gerencia a alteração de visualização (todos, tier, dieta) validando a entrada.
 * @param {string} visualizacao - Nome da visualização a ser ativada
 */
function gerenciarVisualizacaoGaleria(visualizacao) {
    const visualizacoesValidas = ["todos", "tier", "dieta"];
    if (!visualizacoesValidas.includes(visualizacao)) {
        console.warn(`Visualização inválida solicitada: ${visualizacao}`);
        return;
    }

    const secoesPorVisualizacao = {
        todos: document.getElementById("todos"),
        tier: document.getElementById("byTiers"),
        dieta: document.getElementById("byDiet")
    };

    Object.entries(secoesPorVisualizacao).forEach(([chave, secao]) => {
        if (!secao) return;
        secao.hidden = chave !== visualizacao;
    });

    window.applyGallerySearch?.(campoPesquisa?.value || "");
}

/**
 * Foca no elemento indicado pela hash da URL ao carregar a página.
 */
function focarAlvoHash() {
    const hash = window.location.hash.substring(1);
    if (!hash) return;

    const elementoAlvo = document.getElementById(hash);
    if (!elementoAlvo) return;

    const paiTier = elementoAlvo.closest(".tier-indicator");
    const paiDieta = elementoAlvo.closest(".diet-indicator");

    if (paiTier) {
        if (seletorFiltro) seletorFiltro.value = "tier";
        gerenciarVisualizacaoGaleria("tier");
        const botaoTier = document.querySelector(`.tier-btn[data-target="${paiTier.id}"]`);
        if (botaoTier) definirAbaAtiva(botaoTier, ".tier-btn", ".tier-indicator");
    } else if (paiDieta) {
        if (seletorFiltro) seletorFiltro.value = "dieta";
        gerenciarVisualizacaoGaleria("dieta");
        const botaoDieta = document.querySelector(`.diet-btn[data-target="${paiDieta.id}"]`);
        if (botaoDieta) definirAbaAtiva(botaoDieta, ".diet-btn", ".diet-indicator");
    } else {
        if (seletorFiltro) seletorFiltro.value = "todos";
        gerenciarVisualizacaoGaleria("todos");
    }

    setTimeout(() => {
        elementoAlvo.scrollIntoView({ behavior: "smooth", block: "center" });
        const card = elementoAlvo.querySelector(".card-raca");
        if (card) {
            abrirModalDino(card.dataset.dino);
        }
    }, 150);
}

// Prevenção de memory leaks e duplicação de listeners em SPAs
if (!window.listenersGaleriaConfigurados) {
    window.listenersGaleriaConfigurados = true;

    document.addEventListener("click", event => {
        const img = event.target.closest(".img-dino");
        if (img) {
            abrirImagemDino(img);
            return;
        }

        const card = event.target.closest(".card-raca");
        if (card) {
            abrirModalDino(card.dataset.dino);
        }
    });

    document.addEventListener("keydown", event => {
        const card = event.target.closest(".card-raca");
        if (!card || (event.key !== "Enter" && event.key !== " ")) return;

        event.preventDefault();
        abrirModalDino(card.dataset.dino);
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            if (modal?.style.display === "block") fecharModal();
            if (modalImgCont?.style.display === "flex") {
                modalImgCont.classList.remove("open");
                modalImgCont.style.display = "none";
            }
        }
    });
}

if (botaoFechar && !botaoFechar.dataset.listener) {
    botaoFechar.dataset.listener = "true";
    botaoFechar.addEventListener("click", fecharModal);
}

if (modal && !modal.dataset.listener) {
    modal.dataset.listener = "true";
    modal.addEventListener("click", event => {
        if (event.target === modal) fecharModal();
    });
}

if (modalImgCont && !modalImgCont.dataset.listener) {
    modalImgCont.dataset.listener = "true";
    modalImgCont.addEventListener("click", () => {
        modalImgCont.classList.remove("open");
        modalImgCont.style.display = "none";
    });
}

if (botaoPaleo && !botaoPaleo.dataset.listener) {
    botaoPaleo.dataset.listener = "true";
    botaoPaleo.addEventListener("click", () => {
        if (botaoPaleo.dataset.url) {
            window.open(botaoPaleo.dataset.url, "_blank", "noopener,noreferrer");
        }
    });
}

document.addEventListener("DOMContentLoaded", async () => {
    configurarAbas(".tier-btn", ".tier-indicator");
    configurarAbas(".diet-btn", ".diet-indicator");

    seletorFiltro?.addEventListener("change", event => {
        gerenciarVisualizacaoGaleria(event.target.value);
    });

    campoPesquisa?.addEventListener("input", event => {
        if (window.debouncedGallerySearch) {
            window.debouncedGallerySearch(event.target.value);
        } else {
            window.applyGallerySearch?.(event.target.value);
        }
    });

    gerenciarVisualizacaoGaleria(seletorFiltro?.value || "todos");

    if (window.dinoCardsReady) {
        await window.dinoCardsReady;
    }

    window.applyGallerySearch?.(campoPesquisa?.value || "");
    focarAlvoHash();
});

window.showGalleryView = gerenciarVisualizacaoGaleria;