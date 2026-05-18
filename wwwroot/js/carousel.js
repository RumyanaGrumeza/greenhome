console.log("CAROUSEL JS LOADED");


document.addEventListener("DOMContentLoaded", () => {

    const track = document.querySelector('.carousel-track');
    const items = document.querySelectorAll('.carousel-item');

    const next = document.getElementById('next');
    const prev = document.getElementById('prev');

    let index = 0;
    const visibleItems = 2;

    function step() {
        const item = document.querySelector('.carousel-item');
        const style = window.getComputedStyle(item);
        return item.offsetWidth + parseInt(style.gap || 20);
    }

    next.addEventListener('click', () => {
        const maxIndex = items.length - visibleItems;
        if (index < maxIndex) {
            index++;
            update();
        }
    });

    prev.addEventListener('click', () => {
        if (index > 0) {
            index--;
            update();
        }
    });

    function update() {
        const s = step();
        track.style.transform = `translateX(-${index * s}px)`;
    }

});