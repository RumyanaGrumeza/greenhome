const filters = document.querySelectorAll('.filter');

filters.forEach(filter => {

    filter.addEventListener('change', loadPlants);

});

async function loadPlants() {

    const size =
        document.querySelector(
            'input[name="size"]:checked'
        ).value;

    const watering =
        document.querySelector(
            'input[name="watering"]:checked'
        ).value;

    const light =
        document.querySelector(
            'input[name="light"]:checked'
        ).value;

    try {

        const response = await fetch(
            `/Plants/Filter?size=${size}&watering=${watering}&light=${light}`
        );

        const plants = await response.json();

        renderPlants(plants);

    } catch (error) {

        console.error('Ошибка фильтра:', error);

    }
}

function renderPlants(plants) {

    const grid = document.querySelector('.plant-grid');

    grid.innerHTML = '';

    plants.forEach(plant => {

        grid.innerHTML += `

            <a class="plant-card"
               href="/Plants/Details/${plant.id}">

                <img src="/img/plants/${plant.image}"
                     alt="${plant.name}">

                <p>${plant.name}</p>

            </a>

        `;

    });

}