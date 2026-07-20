/**
 * js/cards.js
 * Script responsável por buscar os dados, construir e renderizar os cards da galeria.
 */

const cardsDinoDatabaseReady = window.dinoDatabaseReady || fetch("data/dinoDataBase.json", { credentials: 'omit' })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        return response.json();
    })
    .catch(error => {
        console.error("Erro ao carregar os dados dos cards:", error);
        return null;
    });

window.dinoDatabaseReady = cardsDinoDatabaseReady;

let galleryCards = [];

const DIET_ICONS = {
    herbivoro: "\u{1f33f}", // 🌿
    carnivoro: "\u{1f969}", // 🥩
    peixe: "\u{1f988}"      // 🦈
};

const DIET_GROUPS = {
    herbivoros: {
        id: "diet1",
        matches: diet => diet.includes(DIET_ICONS.herbivoro) && !diet.includes(DIET_ICONS.carnivoro) && !diet.includes(DIET_ICONS.peixe)
    },
    carnivoros: {
        id: "diet2",
        matches: diet => diet.includes(DIET_ICONS.carnivoro) && !diet.includes(DIET_ICONS.herbivoro)
    },
    onivoros: {
        id: "diet3",
        matches: diet => diet.includes(DIET_ICONS.herbivoro) && (diet.includes(DIET_ICONS.carnivoro) || diet.includes(DIET_ICONS.peixe))
    }
};

// Cache de seletores de contêineres do DOM
let cachedContainers = null;

/**
 * Obtém e faz cache dos contêineres DOM das listas de cards.
 * @returns {Object} Contêineres cacheados
 */
function getContainers() {
    if (!cachedContainers) {
        cachedContainers = {
            todos: document.querySelector("#todos .linha-racas"),
            tiers: {
                1: document.querySelector("#tier1 .linha-racas"),
                2: document.querySelector("#tier2 .linha-racas"),
                3: document.querySelector("#tier3 .linha-racas"),
                4: document.querySelector("#tier4 .linha-racas"),
                5: document.querySelector("#tier5 .linha-racas")
            },
            diets: {
                herbivoros: document.querySelector("#diet1 .linha-racas"),
                carnivoros: document.querySelector("#diet2 .linha-racas"),
                onivoros: document.querySelector("#diet3 .linha-racas")
            }
        };
    }
    return cachedContainers;
}

/**
 * Normaliza o texto removendo acentos e convertendo para letras minúsculas.
 * @param {string} value - O texto a ser normalizado.
 * @returns {string} Texto normalizado.
 */
function normalizeText(value = "") {
    return String(value)
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();
}

/**
 * Remove as tags HTML de uma string.
 * @param {string} value - String contendo HTML.
 * @returns {string} Texto limpo sem tags HTML.
 */
function stripHtml(value = "") {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = value;
    return wrapper.textContent || wrapper.innerText || "";
}

/**
 * Obtém a primeira palavra de um texto normalizado (usado para indexar espécies).
 * @param {string} value - Nome completo ou texto.
 * @returns {string} Primeira palavra normalizada.
 */
function getFirstName(value = "") {
    return normalizeText(value).split(/\s+/)[0] || "";
}

/**
 * Retorna os itens da base de dados global dinosData.
 * @returns {Array} Array de status dos dinossauros.
 */
function getStatusItems() {
    return typeof dinosData !== "undefined" && Array.isArray(dinosData) ? dinosData : [];
}

/**
 * Constrói um mapa de indexação dos status baseado no primeiro nome.
 * @returns {Map<string, Object>} Mapa de status.
 */
function getStatusIndex() {
    return new Map(getStatusItems().map(status => [getFirstName(status.nome), status]));
}

/**
 * Constrói um mapa de indexação do banco de dados baseado no primeiro nome.
 * @param {Object} database - Objeto JSON contendo as informações.
 * @returns {Map<string, Object>} Mapa do banco de dados.
 */
function getDatabaseIndex(database) {
    return new Map(Object.entries(database).map(([key, info]) => [getFirstName(key), { key, info }]));
}

/**
 * Determina o grupo de dieta baseado na string de dieta fornecida.
 * @param {string} diet - String contendo os ícones da dieta.
 * @returns {string} Nome do grupo de dieta.
 */
function getDietGroup(diet = "") {
    const match = Object.entries(DIET_GROUPS).find(([, group]) => group.matches(diet));
    return match ? match[0] : "carnivoros";
}

/**
 * Adapta a imagem do perfil para o modelo 3D correspondente.
 * @param {string} image - Caminho da imagem original.
 * @returns {string} Caminho da imagem modificada.
 */
function getCardImage(image = "") {
    if (image.includes("anky")) {
        image = image.replace(".png", ".jpg");
    }

    return image.includes("perfil") ? image.replace("perfil", "model") : image;
}

/**
 * Obtém a string de pesquisa combinada de um card.
 * @param {Object} card - Objeto do card.
 * @returns {string} Texto de busca normalizado.
 */
function getCardSearchText(card) {
    return normalizeText([
        card.name,
        card.fullName
    ].join(" "));
}

/**
 * Constrói a estrutura de dados de um card de galeria.
 * @param {Object} params - Parâmetros contendo chave, info do JSON e status global.
 * @returns {Object} Objeto do card estruturado.
 */
function buildGalleryCard({ key, info, status }) {
    const name = info.shortName || key;
    const fullName = status?.nome || stripHtml(info.fullName) || name;
    const diet = info.diet || status?.dieta || "";
    const tier = Number(status?.tier || info.tier || 0);
    const id = info.idStatus || normalizeText(key).replace(/\s+/g, "-");

    const card = {
        key,
        id,
        name,
        fullName,
        description: info.desc || "",
        image: getCardImage(info.image || "img/logo.png"),
        alt: `Modelo de ${name}`,
        diet,
        dietGroup: getDietGroup(diet),
        tier
    };

    card.searchText = getCardSearchText(card);
    return card;
}

/**
 * Constrói a lista completa de cards mesclando dinosData e o arquivo JSON.
 * @param {Object} database - Banco de dados JSON.
 * @returns {Array<Object>} Lista de cards ordenados.
 */
function buildGalleryCards(database = {}) {
    const statusIndex = getStatusIndex();
    const databaseIndex = getDatabaseIndex(database);
    const usedKeys = new Set();
    const cards = [];

    getStatusItems().forEach(status => {
        const databaseEntry = databaseIndex.get(getFirstName(status.nome));
        if (!databaseEntry) return;

        usedKeys.add(databaseEntry.key);
        cards.push(buildGalleryCard({
            key: databaseEntry.key,
            info: databaseEntry.info,
            status
        }));
    });

    Object.entries(database).forEach(([key, info]) => {
        if (usedKeys.has(key)) return;

        cards.push(buildGalleryCard({
            key,
            info,
            status: statusIndex.get(getFirstName(key))
        }));
    });

    // Organiza todos os cards em ordem alfabética pelo nome (garante consistência na listagem)
    cards.sort((a, b) => a.name.localeCompare(b.name));

    return cards;
}

/**
 * Cria o elemento DOM do card do dinossauro.
 * @param {Object} cardData - Dados do card.
 * @param {string} idSuffix - Sufixo opcional para evitar colisão de IDs nas abas.
 * @returns {HTMLElement} Elemento da coluna contendo o card.
 */
function createDinoCard(cardData, idSuffix = "") {
    const column = document.createElement("div");
    column.className = "col-md-4 gallery-card-item";
    column.id = idSuffix ? `${cardData.id}-${idSuffix}` : cardData.id;
    column.dataset.dinoId = cardData.id;
    column.dataset.search = cardData.searchText;

    const card = document.createElement("article");
    card.className = "card-raca";
    card.dataset.dino = cardData.key;
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    card.setAttribute("aria-label", `Ver detalhes de ${cardData.name}`);

    const cardImage = document.createElement("img");
    cardImage.src = cardData.image;
    cardImage.alt = cardData.alt;
    cardImage.className = "img-dino";
    cardImage.loading = "lazy";

    const body = document.createElement("div");
    body.className = "card-body-custom";

    const title = document.createElement("h3");
    title.textContent = cardData.name;

    const meta = document.createElement("span");

    const text = document.createElement("p");
    text.textContent = cardData.description;

    body.append(title, meta, text);
    card.append(cardImage, body);
    column.appendChild(card);

    return column;
}

/**
 * Obtém ou cria a mensagem de estado vazio, garantindo que apenas uma exista.
 * @param {HTMLElement} container - Contêiner dos cards.
 * @returns {HTMLElement} Elemento da mensagem de vazio.
 */
function getOrCreateEmptyMessage(container) {
    const parent = container.parentElement;
    let message = parent.querySelector(".gallery-empty");

    if (!message) {
        message = document.createElement("p");
        message.className = "gallery-empty";
        message.textContent = "Nenhum dinossauro encontrado.";
        parent.appendChild(message);
    }

    return message;
}

/**
 * Renderiza uma lista de cards em um contêiner utilizando DocumentFragment para performance.
 * @param {HTMLElement} container - Elemento contêiner.
 * @param {Array<Object>} cards - Lista de cards.
 * @param {string} idSuffix - Sufixo para IDs.
 */
function renderCardsInContainer(container, cards, idSuffix) {
    if (!container) return;

    container.innerHTML = "";
    const fragment = document.createDocumentFragment();
    cards.forEach(card => {
        fragment.appendChild(createDinoCard(card, idSuffix));
    });
    container.appendChild(fragment);

    getOrCreateEmptyMessage(container);
}

/**
 * Renderiza todos os cards nas respectivas seções e trata erros de rede/banco vazio.
 * @param {Object} database - Banco de dados JSON.
 */
function renderDinoCards(database = {}) {
    const containers = getContainers();

    if (!database || Object.keys(database).length === 0) {
        if (containers.todos) {
            containers.todos.innerHTML = "<p class='error-message gallery-empty' style='display:block;'>Falha ao carregar os dados dos dinossauros. Tente novamente mais tarde.</p>";
        }
        return;
    }

    galleryCards = buildGalleryCards(database);

    renderCardsInContainer(containers.todos, galleryCards, "");

    for (let tier = 1; tier <= 5; tier += 1) {
        renderCardsInContainer(
            containers.tiers[tier],
            galleryCards.filter(card => card.tier === tier),
            `tier${tier}`
        );
    }

    Object.entries(DIET_GROUPS).forEach(([groupName, group]) => {
        renderCardsInContainer(
            containers.diets[groupName],
            galleryCards.filter(card => card.dietGroup === groupName),
            group.id
        );
    });

    applyGallerySearch(document.getElementById("dinoEspecifico")?.value || "");
}

/**
 * Atualiza a visibilidade das mensagens de estado vazio.
 */
function updateEmptyMessages() {
    document.querySelectorAll(".linha-racas").forEach(container => {
        const hasVisibleCards = Array.from(container.querySelectorAll(".gallery-card-item"))
            .some(card => card.style.display !== "none");
        const message = getOrCreateEmptyMessage(container);
        message.style.display = hasVisibleCards ? "none" : "block";
    });
}

/**
 * Filtra a galeria com base no termo de busca.
 * @param {string} term - Termo pesquisado.
 */
function applyGallerySearch(term = "") {
    const normalizedTerm = normalizeText(term);

    document.querySelectorAll(".gallery-card-item").forEach(card => {
        const matches = !normalizedTerm || card.dataset.search.includes(normalizedTerm);
        card.style.display = matches ? "" : "none";
    });

    updateEmptyMessages();
}

let searchTimeout = null;

/**
 * Versão com debounce da busca para evitar processamento excessivo a cada tecla digitada.
 * @param {string} term - Termo pesquisado.
 */
function debouncedGallerySearch(term = "") {
    if (searchTimeout) clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        applyGallerySearch(term);
    }, 200);
}

/**
 * Executa o callback quando o DOM estiver pronto.
 * @param {Function} callback - Função callback.
 */
function whenDocumentIsReady(callback) {
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", callback, { once: true });
        return;
    }
    callback();
}

const dinoCardsReady = cardsDinoDatabaseReady.then(database => new Promise(resolve => {
    whenDocumentIsReady(() => {
        renderDinoCards(database);
        resolve(galleryCards);
    });
}));

/**
 * Alterna a ordenação por peso usando a propriedade CSS order para evitar layout thrashing.
 */
function ordemPeso() {
    const toggle = document.getElementById("toggleOrdem");
    const labelTexto = document.getElementById("ordemPeso");
    if (!toggle || !labelTexto) return;

    const isDecrescente = toggle.checked;
    labelTexto.textContent = isDecrescente ? "Decrescente" : "Crescente";
    const statusIndex = getStatusIndex();

    document.querySelectorAll(".linha-racas").forEach(container => {
        const cards = Array.from(container.querySelectorAll(".gallery-card-item"));

        cards.sort((a, b) => {
            const articleA = a.querySelector(".card-raca");
            const articleB = b.querySelector(".card-raca");

            const keyA = articleA ? getFirstName(articleA.dataset.dino) : "";
            const keyB = articleB ? getFirstName(articleB.dataset.dino) : "";

            const statusA = statusIndex.get(keyA);
            const statusB = statusIndex.get(keyB);

            const pesoA = statusA ? Number(statusA.peso) || 0 : 0;
            const pesoB = statusB ? Number(statusB.peso) || 0 : 0;

            return isDecrescente ? pesoB - pesoA : pesoA - pesoB;
        });

        // Utiliza a propriedade CSS order para reordenar sem manipular posições pesadas no DOM
        cards.forEach((card, index) => {
            card.style.order = index;
        });
    });
}

window.renderDinoCards = renderDinoCards;
window.applyGallerySearch = applyGallerySearch;
window.debouncedGallerySearch = debouncedGallerySearch;
window.dinoCardsReady = dinoCardsReady;
window.getGalleryCards = () => galleryCards;
