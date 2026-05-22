let = light = localStorage.getItem('light');
const viewMode = document.getElementById('modeView');

const lightMode = () => {
    document.documentElement.classList.add('light');
    localStorage.setItem('light', 'active');
}

const darkMode = () => {
    document.documentElement.classList.remove('light');
    localStorage.setItem('light', null);
}

if (light === 'active') lightMode();

viewMode.addEventListener('click', () => {
    light = localStorage.getItem('light');
    light !== 'active' ? lightMode() : darkMode();
});

