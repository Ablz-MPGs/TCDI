document.addEventListener('DOMContentLoaded', () => {
    const accordions = document.querySelectorAll('.accordion-header');

    accordions.forEach(acc => {
        acc.addEventListener('click', function() {
            this.classList.toggle('active');

            const panel = this.nextElementSibling;
            
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
                panel.style.paddingTop = "0";
                panel.style.paddingBottom = "0";
            } else {
                panel.style.maxHeight = panel.scrollHeight + 50 + "px"; 
                panel.style.paddingTop = "15px";
                panel.style.paddingBottom = "15px";
            } 
        });
    });
});
