document.addEventListener('DOMContentLoaded', () => {
    const mapContainer = document.getElementById('mapContainer');
    const mapContent = document.getElementById('mapContent');
    const mapImage = document.getElementById('mapImage');
    const mapLegend = document.getElementById('mapLegend');
    const mapEmpty = document.getElementById('mapEmpty');
    
    const mapLegendField = document.getElementById('mapLegendField');
    const mapFullscreenLegend = document.getElementById('mapFullscreenLegend');
    const mapTypeButtons = document.querySelectorAll('.map-type-btn');
    
    const btnZoomIn = document.getElementById('zoomIn');
    const btnZoomOut = document.getElementById('zoomOut');
    const btnReset = document.getElementById('resetZoom');
    const btnExpand = document.getElementById('expandMap');
    
    if (!mapContainer || !mapContent) return;

    let scale = 1;
    let isDragging = false;
    let startX, startY;
    let translateX = 0;
    let translateY = 0;
    
    const minScale = 1;
    const maxScale = 5;
    const step = 0.5;

    /**
     * Retorna a imagem do mapa que está atualmente visível.
     */
    function getActiveImage() {
        const visibleImg = mapContent.querySelector('.map-img:not([hidden])');
        return visibleImg || mapImage || mapContent.querySelector('img');
    }

    /**
     * Calcula os limites máximos de translação para evitar que a imagem
     * saia dos limites visíveis do container.
     */
    function getTranslateLimits() {
        const activeImg = getActiveImage();
        if (!activeImg) return { maxX: 0, maxY: 0 };

        const containerRect = mapContainer.getBoundingClientRect();
        const imgW = activeImg.offsetWidth || containerRect.width;
        const imgH = activeImg.offsetHeight || containerRect.height;

        // O espaço extra que a imagem escalonada ocupa além do container
        const overflowX = Math.max(0, (imgW * scale - containerRect.width) / 2);
        const overflowY = Math.max(0, (imgH * scale - containerRect.height) / 2);

        return { maxX: overflowX, maxY: overflowY };
    }

    /**
     * Atualiza a visualização do mapa, restringindo a translação aos limites.
     */
    function updateTransform() {
        if (scale <= 1) {
            translateX = 0;
            translateY = 0;
        } else {
            const { maxX, maxY } = getTranslateLimits();
            translateX = Math.max(-maxX, Math.min(maxX, translateX));
            translateY = Math.max(-maxY, Math.min(maxY, translateY));
        }

        const activeImg = getActiveImage();
        if (activeImg) {
            activeImg.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
        }
    }

    function zoom(amount) {
        scale += amount;
        if (scale < minScale) {
            scale = minScale;
            translateX = 0;
            translateY = 0;
        }
        if (scale > maxScale) scale = maxScale;
        updateTransform();
    }

    function resetZoom() {
        scale = 1;
        translateX = 0;
        translateY = 0;
        updateTransform();
    }

    btnZoomIn?.addEventListener('click', () => zoom(step));
    btnZoomOut?.addEventListener('click', () => zoom(-step));
    btnReset?.addEventListener('click', resetZoom);

    // Expande o container para o modo Fullscreen
    btnExpand?.addEventListener('click', () => {
        mapContainer.classList.toggle('fullscreen');
        if (mapContainer.classList.contains('fullscreen')) {
            document.body.style.overflow = 'hidden';
            btnExpand.textContent = '✖';
            btnExpand.setAttribute('title', 'Sair da Tela Cheia');
        } else {
            document.body.style.overflow = '';
            btnExpand.textContent = '⛶';
            btnExpand.setAttribute('title', 'Expandir Mapa');
        }
        resetZoom();
    });

    // ============================================
    // Lógica de Seleção de Mapas e Legenda
    // ============================================
    const mapDictionary = {
        padrao: mapImage,
        legendado: mapLegend,
        vazio: mapEmpty
    };

    /**
     * Sincroniza as descrições da legenda com a versão de tela cheia.
     */
    function syncLegendDescriptions() {
        if (!mapLegendField || !mapFullscreenLegend) return;
        const fieldTexts = mapLegendField.querySelectorAll('.legend-text');
        const fsTexts = mapFullscreenLegend.querySelectorAll('.fs-legend-desc');
        fieldTexts.forEach((elem, index) => {
            if (fsTexts[index]) {
                fsTexts[index].textContent = elem.textContent.trim();
            }
        });
    }

    /**
     * Altera o mapa exibido e controla a visibilidade da legenda.
     * @param {'padrao' | 'legendado' | 'vazio'} mapType
     */
    function selectMap(mapType) {
        const targetImg = mapDictionary[mapType];
        if (!targetImg) return;

        // Atualiza estilo dos botões seletores
        mapTypeButtons.forEach(btn => {
            const isActive = (btn.dataset.map === mapType);
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        });

        // Alterna visibilidade das imagens
        [mapImage, mapLegend, mapEmpty].forEach(img => {
            if (!img) return;
            if (img === targetImg) {
                img.removeAttribute('hidden');
                img.style.display = 'block';
            } else {
                img.setAttribute('hidden', '');
                img.style.display = 'none';
            }
        });

        // Exibe o campo de legenda somente quando o mapa escolhido for 'legendado'
        const isLegendado = (mapType === 'legendado');
        if (mapLegendField) {
            if (isLegendado) {
                mapLegendField.removeAttribute('hidden');
            } else {
                mapLegendField.setAttribute('hidden', '');
            }
        }

        // Overlay da legenda no modo tela cheia
        if (mapFullscreenLegend) {
            if (isLegendado) {
                mapFullscreenLegend.removeAttribute('hidden');
            } else {
                mapFullscreenLegend.setAttribute('hidden', '');
            }
        }

        // Aplica transformações atuais na nova imagem ativa
        updateTransform();
    }

    // Associa eventos de clique aos botões seletores
    mapTypeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const mapType = btn.dataset.map;
            selectMap(mapType);
        });
    });

    // Pré-carrega as imagens para troca instantânea
    [mapImage, mapLegend, mapEmpty].forEach(img => {
        if (img && img.src) {
            const preloader = new Image();
            preloader.src = img.src;
        }
    });

    // Ao alternar abas para 'mapas', garante cálculo correto de dimensões
    const tabMapasBtn = document.querySelector('button[onclick*="mapas"]');
    if (tabMapasBtn) {
        tabMapasBtn.addEventListener('click', () => {
            setTimeout(updateTransform, 50);
        });
    }

    // ============================================
    // Eventos de Mouse (Desktop)
    // ============================================
    mapContent.addEventListener('mousedown', (e) => {
        if (scale > 1) {
            e.preventDefault();
            isDragging = true;
            startX = e.clientX - translateX;
            startY = e.clientY - translateY;
            mapContent.style.cursor = 'grabbing';
        }
    });

    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        if (scale > 1) {
            translateX = e.clientX - startX;
            translateY = e.clientY - startY;
            updateTransform();
        }
    });

    window.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            mapContent.style.cursor = scale > 1 ? 'grab' : '';
        }
    });

    mapContainer.addEventListener('wheel', (e) => {
        e.preventDefault();
        if (e.deltaY < 0) zoom(step);
        else zoom(-step);
    }, { passive: false });

    // ============================================
    // Eventos de Touch (Mobile)
    // ============================================
    let initialPinchDistance = null;

    mapContent.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1 && scale > 1) {
            isDragging = true;
            startX = e.touches[0].clientX - translateX;
            startY = e.touches[0].clientY - translateY;
        } else if (e.touches.length === 2) {
            isDragging = false;
            initialPinchDistance = Math.hypot(
                e.touches[0].clientX - e.touches[1].clientX,
                e.touches[0].clientY - e.touches[1].clientY
            );
        }
    }, { passive: false });

    window.addEventListener('touchmove', (e) => {
        if (isDragging && e.touches.length === 1 && scale > 1) {
            e.preventDefault();
            translateX = e.touches[0].clientX - startX;
            translateY = e.touches[0].clientY - startY;
            updateTransform();
        } else if (e.touches.length === 2 && initialPinchDistance) {
            e.preventDefault();
            const currentDistance = Math.hypot(
                e.touches[0].clientX - e.touches[1].clientX,
                e.touches[0].clientY - e.touches[1].clientY
            );
            const delta = currentDistance - initialPinchDistance;
            
            if (Math.abs(delta) > 10) {
                if (delta > 0) zoom(0.1);
                else zoom(-0.1);
                initialPinchDistance = currentDistance;
            }
        }
    }, { passive: false });

    window.addEventListener('touchend', () => {
        isDragging = false;
        initialPinchDistance = null;
    });

    // Inicialização
    syncLegendDescriptions();
    selectMap('padrao');
});