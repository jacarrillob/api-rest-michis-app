const API_URL ='https://api.thecatapi.com/v1/images/search?limit=10&api_key=live_WVJXjzwxbPGt3q5Hg2KPnRfj3Mg3YYE4umyWN0CFkHrlL7LWY64HbmTkbWF2JleQ'

// fetch(API_URL).then(response => response.json())
//     .then(data => {
//         const img = document.querySelector('img')
//         img.src = data[0].url
//     })

async function loadRandonCats() {
    removeImages()
    removeBtnFavorite()
    removeimgContent()
    const res = await fetch(API_URL)
    const data = await res.json()
    addImage(data)
}

function addImage(data) {
    data.forEach((element, index) => {
        const catImages = document.querySelector('.cats-images')
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
        img.src = element.url
        img.alt = 'Imagen de gato_' + index
        imgContent.appendChild(img)
        imgContent.appendChild(btnAddFavorite)
        catImages.appendChild(imgContent)
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



loadRandonCats()