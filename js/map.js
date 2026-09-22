document.addEventListener('DOMContentLoaded', () => {
    const mapContainer = document.getElementById('mapContainer');
    const mapContent = document.getElementById('mapContent');
    const mapImage = document.getElementById('mapImage');
    
    const btnZoomIn = document.getElementById('zoomIn');
    const btnZoomOut = document.getElementById('zoomOut');
    const btnReset = document.getElementById('resetZoom');
    const btnExpand = document.getElementById('expandMap');
    
    if (!mapContainer || !mapImage) return;

    let scale = 1;
    let isDragging = false;
    let startX, startY;
    let translateX = 0;
    let translateY = 0;
    
    const minScale = 1;
    const maxScale = 5;
    const step = 0.5;

    /**
     * Calcula os limites máximos de translação para evitar que a imagem
     * saia dos limites visíveis do container.
     */
    function getTranslateLimits() {
        const imgRect = mapImage.getBoundingClientRect();
        const containerRect = mapContainer.getBoundingClientRect();

        // Dimensões reais da imagem sem scale (usar naturalWidth faria sentido,
        // mas o tamanho renderizado pode ser menor por max-width/max-height)
        const imgW = mapImage.offsetWidth;
        const imgH = mapImage.offsetHeight;

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

        mapImage.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
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

    btnZoomIn.addEventListener('click', () => zoom(step));
    btnZoomOut.addEventListener('click', () => zoom(-step));
    btnReset.addEventListener('click', resetZoom);

    // Expande o container para o modo Fullscreen
    btnExpand.addEventListener('click', () => {
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
            e.preventDefault(); // Evita scroll ao fazer o movimento de pinça (pinch)
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
});