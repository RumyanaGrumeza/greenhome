document.addEventListener('DOMContentLoaded', function () {
    const track = document.querySelector('.carousel-track');
    const items = document.querySelectorAll('.carousel-item');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');

    if (!track || !items.length || !prevBtn || !nextBtn) return;

    let currentIndex = 0;
    const itemWidth = items[0].offsetWidth + 20; // 20px — gap между элементами

    function updateCarousel() {
        const offset = -currentIndex * itemWidth;
        track.style.transform = `translateX(${offset}px)`;
    }

    nextBtn.addEventListener('click', function () {
        if (currentIndex < items.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0; // зацикливаем
        }
        updateCarousel();
    });

    prevBtn.addEventListener('click', function () {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = items.length - 1; // зацикливаем
        }
        updateCarousel();
    });

    // Поддержка свайпов на мобильных
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        if (touchEndX < touchStartX - 50) {
            // свайп влево — следующий
            if (currentIndex < items.length - 1) currentIndex++;
            else currentIndex = 0;
        } else if (touchEndX > touchStartX + 50) {
            // свайп вправо — предыдущий
            if (currentIndex > 0) currentIndex--;
            else currentIndex = items.length - 1;
        }
        updateCarousel();
    });
});