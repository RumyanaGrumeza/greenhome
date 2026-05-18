const submitBtn =
    document.getElementById('submitBtn');

const nameInput =
    document.getElementById('name');

const latinInput =
    document.getElementById('latin');

const tempInput =
    document.getElementById('temperature');

const imageInput =
    document.getElementById('image');

// ТОЛЬКО ВИДИМЫЕ ПОЛЯ
const fields =
    document.querySelectorAll(
        'input:not([type="hidden"]), textarea, select'
    );

function validate() {

    let valid = true;

    // NAME
    const nameRegex =
        /^[А-ЯЁ][а-яёё\s-]+$/;

    const nameValid =
        nameRegex.test(nameInput.value.trim());

    setError(
        nameInput,
        nameValid || nameInput.value === '',
        'Название только на русском и с большой буквы'
    );

    if (!nameValid && nameInput.value !== '') {
        valid = false;
    }

    // LATIN
    const latinRegex =
        /^[A-Z][a-zA-Z\s-]+$/;

    const latinValid =
        latinRegex.test(latinInput.value.trim());

    setError(
        latinInput,
        latinValid || latinInput.value === '',
        'Название только на латинице и с большой буквы'
    );

    if (!latinValid && latinInput.value !== '') {
        valid = false;
    }

    // TEMP
    const tempRegex =
        /^\d+(-\d+)?$/;

    const tempValid =
        tempRegex.test(tempInput.value.trim());

    setError(
        tempInput,
        tempValid || tempInput.value === '',
        'Пример: 15 или 20-32'
    );

    if (!tempValid && tempInput.value !== '') {
        valid = false;
    }

    // IMAGE
    const imageRegex =
        /^[a-z0-9-]+\.jpg$/;

    const imageValid =
        imageRegex.test(imageInput.value.trim());

    setError(
        imageInput,
        imageValid || imageInput.value === '',
        'Формат: name.jpg'
    );

    if (!imageValid && imageInput.value !== '') {
        valid = false;
    }

    // EMPTY CHECK
    fields.forEach(field => {

        if (!field.value.trim()) {

            valid = false;
        }
    });

    submitBtn.disabled = !valid;
}

function setError(input, ok, text) {

    const error =
        input.closest('.field')
            .querySelector('.error');

    if (!ok) {

        error.textContent = text;

    } else {

        error.textContent = '';
    }
}

fields.forEach(field => {

    field.addEventListener(
        'input',
        validate
    );

    field.addEventListener(
        'change',
        validate
    );
});

// MODAL

const modal =
    document.getElementById('successModal');

if (modal) {

    setTimeout(() => {

        modal.remove();

    }, 10000);

    document
        .getElementById('okBtn')
        .addEventListener('click', () => {

            window.location.href =
                '/Plants/Create';
        });
}