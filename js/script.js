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

