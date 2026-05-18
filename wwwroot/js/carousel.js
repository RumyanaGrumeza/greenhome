document.addEventListener('DOMContentLoaded', function () {
    const track = document.querySelector('.carousel-track');
    const items = document.querySelectorAll('.carousel-item');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    const viewport = document.querySelector('.carousel-viewport');

    if (!track || !items.length || !prevBtn || !nextBtn || !viewport) {
        console.error('Элементы карусели не найдены');
        return;
    }

    let currentIndex = 0;

    // Получаем актуальные размеры
    function getItemWidth() {
        const itemStyle = window.getComputedStyle(items[0]);
        const itemWidth = items[0].offsetWidth;
        const gap = parseInt(itemStyle.marginRight) || 20; // gap из CSS
        return itemWidth + gap;
    }

    function getVisibleItems() {
        const viewportWidth = viewport.offsetWidth;
        const itemWidth = getItemWidth();
        return Math.floor(viewportWidth / itemWidth);
    }

    function updateCarousel() {
        const itemWidth = getItemWidth();
        const offset = -currentIndex * itemWidth;
        track.style.transform = `translateX(${offset}px)`;

        // Показываем/скрываем кнопки
        prevBtn.style.display = currentIndex === 0 ? 'none' : 'flex';
        nextBtn.style.display = currentIndex >= items.length - getVisibleItems() ? 'none' : 'flex';
    }

    nextBtn.addEventListener('click', function () {
        const maxIndex = items.length - getVisibleItems();
        if (currentIndex < maxIndex) {
            currentIndex++;
        }
        updateCarousel();
    });

    prevBtn.addEventListener('click', function () {
        if (currentIndex > 0) {
            currentIndex--;
        }
        updateCarousel();
    });

    // Поддержка свайпов
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > 50) {
            const maxIndex = items.length - getVisibleItems();
            if (diff > 0 && currentIndex < maxIndex) {
                // свайп влево
                currentIndex++;
            } else if (diff < 0 && currentIndex > 0) {
                // свайп вправо
                currentIndex--;
            }
            updateCarousel();
        }
    }, { passive: true });

    // Обработка изменения размера окна
    window.addEventListener('resize', () => {
        const maxIndex = items.length - getVisibleItems();
        if (currentIndex > maxIndex) {
            currentIndex = Math.max(0, maxIndex);
        }
        updateCarousel();
    });

    // Инициализация
    updateCarousel();

    console.log('Карусель инициализирована', {
        itemsCount: items.length,
        itemWidth: getItemWidth(),
        visibleItems: getVisibleItems()
    });
});