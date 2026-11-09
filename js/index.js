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

const GA_MEASUREMENT_ID = 'G-SEU_ID_AQUI'; // Substitua pelo seu ID real

// Função que injeta dinamicamente o script do Google Analytics
function ativarGoogleAnalytics() {
    const scriptUrl = document.createElement('script');
    scriptUrl.async = true;
    scriptUrl.src = `https://googletagmanager.com{GA_MEASUREMENT_ID}`;
    document.head.appendChild(scriptUrl);

    const scriptInline = document.createElement('script');
    scriptInline.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA_MEASUREMENT_ID}');
    `;
    document.head.appendChild(scriptInline);
}

// Executa ao carregar a página
window.addEventListener('DOMContentLoaded', () => {
    const consentimento = localStorage.getItem('cookies-consent');
    const banner = document.getElementById('cookie-banner');

    if (consentimento === 'aceito') {
        ativarGoogleAnalytics();
    } else if (consentimento === null) {
        // Se nunca tomou uma decisão, mostra o banner
        banner.style.display = 'block';
    }

    // Evento do botão Aceitar
    document.getElementById('accept-cookies').addEventListener('click', () => {
        localStorage.setItem('cookies-consent', 'aceito');
        banner.style.display = 'none';
        ativarGoogleAnalytics();
    });

    // Evento do botão Recusar
    document.getElementById('reject-cookies').addEventListener('click', () => {
        localStorage.setItem('cookies-consent', 'recusado');
        banner.style.display = 'none';
    });
});