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

    // Atualiza a visualização do mapa evitando que saia da tela
    function updateTransform() {
        const maxTranslateX = Math.max(0, (mapImage.clientWidth * scale - mapContainer.clientWidth) / 2);
        const maxTranslateY = Math.max(0, (mapImage.clientHeight * scale - mapContainer.clientHeight) / 2);
        
        if (scale > 1) {
            if (translateX > maxTranslateX / scale) translateX = maxTranslateX / scale;
            if (translateX < -maxTranslateX / scale) translateX = -maxTranslateX / scale;
            if (translateY > maxTranslateY / scale) translateY = maxTranslateY / scale;
            if (translateY < -maxTranslateY / scale) translateY = -maxTranslateY / scale;
        } else {
            translateX = 0;
            translateY = 0;
        }
        
        mapImage.style.transform = `scale(${scale}) translate(${translateX}px, ${translateY}px)`;
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

    btnZoomIn.addEventListener('click', () => zoom(step));
    btnZoomOut.addEventListener('click', () => zoom(-step));
    btnReset.addEventListener('click', () => {
        scale = 1;
        translateX = 0;
        translateY = 0;
        updateTransform();
    });

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
        scale = 1;
        translateX = 0;
        translateY = 0;
        updateTransform();
    });

    // ============================================
    // Eventos de Mouse (Desktop)
    // ============================================
    mapContent.addEventListener('mousedown', (e) => {
        if (scale > 1) {
            e.preventDefault();
            isDragging = true;
            startX = e.clientX - translateX * scale;
            startY = e.clientY - translateY * scale;
            mapContent.style.cursor = 'grabbing';
        }
    });

    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        if (scale > 1) {
            translateX = (e.clientX - startX) / scale;
            translateY = (e.clientY - startY) / scale;
            updateTransform();
        }
    });

    window.addEventListener('mouseup', () => {
        isDragging = false;
        mapContent.style.cursor = 'grab';
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
            startX = e.touches[0].clientX - translateX * scale;
            startY = e.touches[0].clientY - translateY * scale;
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
            translateX = (e.touches[0].clientX - startX) / scale;
            translateY = (e.touches[0].clientY - startY) / scale;
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