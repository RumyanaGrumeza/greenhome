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

    // slug из URL
    const parts = window.location.pathname.split('/');

    const slug = parts[parts.length - 1];

    const response = await fetch(

        `/Plants/Category?id=${slug}&size=${size}&watering=${watering}&light=${light}`

    );

    const html = await response.text();

    const parser = new DOMParser();

    const doc = parser.parseFromString(html, 'text/html');

    const newGrid =
        doc.querySelector('.plant-grid');

    document.querySelector('.plant-grid').innerHTML =
        newGrid.innerHTML;
}