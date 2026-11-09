const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });
}

// Seleciona todos os dropdowns para garantir que funcionem em qualquer lugar do cabeçalho
const dropdowns = document.querySelectorAll(".dropdown");

dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector(".dropdown-toggle");
    const menu = dropdown.querySelector(".dropdown-menu");

    if (toggle && menu) {
        toggle.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            // Fecha outros menus abertos antes de abrir o atual
            document.querySelectorAll(".dropdown-menu.show").forEach(openMenu => {
                if (openMenu !== menu) openMenu.classList.remove("show");
            });
            menu.classList.toggle("show");
        });
    }
});

window.addEventListener("click", (e) => {
    // Fecha os dropdowns se o clique for fora de qualquer elemento .dropdown
    if (!e.target.closest(".dropdown") && !e.target.closest(".dropdown-toggle")) {
        document.querySelectorAll(".dropdown-menu.show").forEach(menu => menu.classList.remove("show"));
    }

    // Fecha o menu hambúrguer se clicar fora do cabeçalho ou em um link (exceto toggle)
    if (!e.target.closest(".cabecalho") || (e.target.classList.contains('nav-link') && !e.target.closest('.dropdown-toggle'))) {
        hamburger?.classList.remove("active");
        navMenu?.classList.remove("active");
    }
});

let light = localStorage.getItem('light');
const viewMode = document.getElementById('modeView');

const updateModeButton = (isLight) => {
    if (!viewMode) return;

    viewMode.setAttribute('aria-pressed', isLight ? 'true' : 'false');
    viewMode.setAttribute('aria-label', isLight ? 'Ativar tema escuro' : 'Ativar tema claro');
    viewMode.setAttribute('title', isLight ? 'Ativar tema escuro' : 'Ativar tema claro');
};

const lightMode = () => {
    document.documentElement.classList.add('light');
    localStorage.setItem('light', 'active');
    updateModeButton(true);
};

const darkMode = () => {
    document.documentElement.classList.remove('light');
    localStorage.removeItem('light');
    updateModeButton(false);
};

if (light === 'active') {
    lightMode();
} else {
    updateModeButton(false);
}

if (viewMode) {
    viewMode.addEventListener('click', () => {
        light = localStorage.getItem('light');
        light !== 'active' ? lightMode() : darkMode();
    });
}

const GA_MEASUREMENT_ID = 'G-SEU_ID_AQUI'; // <--- INSIRA SEU ID DO GA4 AQUI

// Cria a camada de dados global exigida pelo Google
window.dataLayer = window.dataLayer || [];
function gtag(){ dataLayer.push(arguments); }

// Determina o estado inicial baseado no que foi salvo no navegador anteriormente
const consentimentoSalvo = localStorage.getItem('cookies-consent-v2');

if (consentimentoSalvo === 'concedido') {
    // Se já aceitou no passado, define tudo como 'granted'
    gtag('consent', 'default', {
        'analytics_storage': 'granted',
        'ad_storage': 'granted',
        'ad_user_data': 'granted',
        'ad_personalization': 'granted'
    });
} else {
    // Por padrão (ou se recusou), tudo inicia como 'denied'
    gtag('consent', 'default', {
        'analytics_storage': 'denied',
        'ad_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied'
    });
}

// Carrega o script base do Google Analytics imediatamente (Abordagem Avançada)
const scriptUrl = document.createElement('script');
scriptUrl.async = true;
scriptUrl.src = `https://googletagmanager.com{GA_MEASUREMENT_ID}`;
document.head.appendChild(scriptUrl);

// Inicializa as configurações padrão da tag
gtag('js', new Date());
gtag('config', GA_MEASUREMENT_ID);

// Lógica visual do Banner e atualização de consentimento em tempo de execução
window.addEventListener('DOMContentLoaded', () => {
    const banner = document.getElementById('cookie-banner');

    // Se o usuário ainda não tomou uma decisão nesta ou em sessões anteriores, exibe o banner
    if (consentimentoSalvo === null) {
        banner.style.display = 'block';
    }

    // Ação ao clicar em "Aceitar Todos"
    document.getElementById('accept-cookies').addEventListener('click', () => {
        localStorage.setItem('cookies-consent-v2', 'concedido');
        banner.style.display = 'none';
        
        // Dispara a atualização dos parâmetros para o Google Analytics notar a mudança imediatamente
        gtag('consent', 'update', {
            'analytics_storage': 'granted',
            'ad_storage': 'granted',
            'ad_user_data': 'granted',
            'ad_personalization': 'granted'
        });
    });

    // Ação ao clicar em "Recusar"
    document.getElementById('reject-cookies').addEventListener('click', () => {
        localStorage.setItem('cookies-consent-v2', 'recusado');
        banner.style.display = 'none';
        
        // Atualiza explicitamente como negado (mantém o padrão, mas formaliza a escolha do usuário)
        gtag('consent', 'update', {
            'analytics_storage': 'denied',
            'ad_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied'
        });
    });
});