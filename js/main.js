const API_URL_BASE = 'https://api.thecatapi.com/v1/'
const API_KEY = 'live_WVJXjzwxbPGt3q5Hg2KPnRfj3Mg3YYE4umyWN0CFkHrlL7LWY64HbmTkbWF2JleQ'
const API_URL_FAVORITE ='https://api.thecatapi.com/v1/images/favourites?limit=10&api_key=live_WVJXjzwxbPGt3q5Hg2KPnRfj3Mg3YYE4umyWN0CFkHrlL7LWY64HbmTkbWF2JleQ'

// fetch(API_URL).then(response => response.json())
//     .then(data => {
//         const img = document.querySelector('img')
//         img.src = data[0].url
//     })

async function loadRandomCats() {
    removeImages()
    removeBtnFavorite()
    removeimgContent()
    const res = await fetch(`${API_URL_BASE}images/search?limit=10&api_key=${API_KEY}`)
    
    if (res.status !== 200 ) {
        const error = document.querySelector('.error')
        error.innerHTML = 'Hubo un error: ' + res.status + ' ' + data.message
    }else {
        const data = await res.json()
        generateRandomCat(data)
    }
    
}

async function getFavouriteCats() {
    const res = await fetch(`${API_URL_BASE}favourites?limit=10&api_key=${API_KEY}`)
    
    if (res.status !== 200 ) {
        const errorFavorite = document.querySelector('.error-favorite')
        errorFavorite.innerHTML = 'Hubo un error: ' + res.status + ' ' + data.message
    }else {
        const data = await res.json()
        loadFavoriteCat(data)
    }
}

async function saveFavouriteCat(id) {
    const res = await fetch(`${API_URL_BASE}favourites`, {
        method: 'POST',
        headers: {
            'x-api-key': API_KEY,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            image_id: id
        }),
    })
    const data = await res.json()
    if (res.status !== 200 ) {
        const errorFavorite = document.querySelector('.error-favorite')
        errorFavorite.textContent = 'Hubo un error: ' + res.status + ' ' + data.message
    }else {
        getFavouriteCats()
    }
}

async function removeFavouriteCat(id) {
    const res = await fetch(`${API_URL_BASE}favourites/${id}`, {
        method: 'DELETE',
        headers: {
            'x-api-key': API_KEY,
            'Content-Type': 'application/json',
        }
    })
    const data = await res.json()
    if (res.status !== 200 ) {
        const errorFavorite = document.querySelector('.error-favorite')
        errorFavorite.innerHTML = 'Hubo un error: ' + res.status + ' ' + data.message
    }else {
        alert('Michi borrado correctamente...')
        getFavouriteCats()
    }
}

function generateRandomCat(data) {
    data.forEach((element, index) => {
        const catImages = document.querySelector('.cats-random')
        const img = document.createElement('img')
        const imgContent = document.createElement('div')
        imgContent.classList.add('card-cat')
        const i = document.createElement('i')
        const btnAddFavorite = document.createElement('button')
        i.classList.add('fa-solid')
        i.classList.add('fa-circle-plus')
        btnAddFavorite.appendChild(i)
        btnAddFavorite.append('Add favorite')
        btnAddFavorite.classList.add('btn-favorite')
        btnAddFavorite.addEventListener('click', (e) =>{
            e.preventDefault()
            saveFavouriteCat(element.id)
        }) 
        img.src = element.url
        img.alt = 'Imagen de gato_' + index
        imgContent.appendChild(img)
        imgContent.appendChild(btnAddFavorite)
        catImages.appendChild(imgContent)
    });
    
}

function loadFavoriteCat(data) {
    const catFavorite = document.querySelector('.cats-favorite')
    catFavorite.innerHTML = ''
    data.forEach((element, index) => {
        const catFavorite = document.querySelector('.cats-favorite')
        const img = document.createElement('img')
        const containerFavorite = document.createElement('div')
        containerFavorite.classList.add('card-favorite-cat')
        const i = document.createElement('i')
        const btnRemoveFavorite = document.createElement('button')
        i.classList.add('fa-solid')
        i.classList.add('fa-trash-can')
        btnRemoveFavorite.appendChild(i)
        btnRemoveFavorite.append('Remove favorite')
        btnRemoveFavorite.classList.add('btn--remove-favorite')
        btnRemoveFavorite.onclick = () => removeFavouriteCat(element.id)
        img.src = element.image.url
        img.alt = 'Imagen de gato_' + index
        containerFavorite.appendChild(img)
        containerFavorite.appendChild(btnRemoveFavorite)
        catFavorite.appendChild(containerFavorite)
    });
    
}

function removeimgContent () {
    const imgContent = document.querySelectorAll('.card-cat')
    imgContent.forEach(container => {
        container.remove()
    })
}

function removeImages () {
    const images = document.querySelectorAll('img')
    images.forEach(element => {
        element.remove()
    })
}

function removeBtnFavorite () {
    const btnFavorite = document.querySelectorAll('.btn-favorite')
    btnFavorite.forEach(btn => {
        btn.remove()
    })
}

loadRandomCats()
getFavouriteCats()