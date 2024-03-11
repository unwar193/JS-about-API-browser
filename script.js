// Цель: Разработать веб-приложение, которое каждый день будет отображать новое случайное изображение из коллекции Unsplash,
//  давая пользователю возможность узнать больше о фотографе и сделать "лайк" изображению.

// Регистрация на Unsplash:

// • Перейдите на веб-сайт Unsplash (https://unsplash.com/).
// • Зарегистрируйтесь или войдите в свой аккаунт. (если у вас не было регистрации до этого, новый аккаунт создавать не нужно).

// Создание приложения:

// • Перейдите на страницу разработчика Unsplash (https://unsplash.com/developers).
// • Нажмите "New Application".
// • Заполните необходимую информацию о приложении (можете использовать http://localhost для тестирования).
// • Получите свой API-ключ после создания приложения.

// Разработка веб-приложения:

// • Создайте HTML-страницу с элементами: изображение, имя фотографа, кнопка "лайк",
//  при нажатии на которую подсвечивается "лайкнутый" элемент

const YOUR_ACCESS_KEY = 'Co27d0QM6OARcGHrT6m2P86B5xw_qc1PV6XAkrgNBAw';
const photoContainer = document.getElementById('photo-container');
let page = 1;

async function fetchPhotos() {
    try {
        const response = await fetch(`https://api.unsplash.com/photos?page=${page}&per_page=9&client_id=${YOUR_ACCESS_KEY}`);
        const photos = await response.json();
        return photos;
    } catch (error) {
        console.error('Ошибка при загрузке фотографий:', error);
        return [];
    }
}
    
console.log(fetchPhotos())

async function loadMorePhotos() {
    const responseObj = await fetchPhotos();
    responseObj.forEach((photo) => {
        const divEl = document.createElement("div");
        const imgEl = document.createElement("img");
        const numEl =document.createElement("h3")
        const buttonEl = document.createElement("button");
        divEl.className = "divEl";
        buttonEl.className = "btn";
        numEl.textContent = "0";
        buttonEl.textContent = "Лайк";
        divEl.appendChild(imgEl);
        divEl.appendChild(numEl)
        divEl.appendChild(buttonEl);
        imgEl.src = photo.urls.small;
        photoContainer.appendChild(divEl)
    });
}
    
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        loadMorePhotos();
    }
});

document.addEventListener('click', (e) => {
    if (e.target.classList.contains("btn")) {
        console.log(e.target.parentElement.querySelector("h3"))
      ++e.target.parentElement.querySelector("h3").textContent;
    }
})

loadMorePhotos();