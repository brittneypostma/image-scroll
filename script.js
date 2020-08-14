import 'regenerator-runtime/runtime'

const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')

let photosArray = []

// Unsplash API
const count = 10
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${process.env.apiKey}&count=${count}`

// Get photos from Unsplash
async function getPhotos() {
  try {
    const res = await fetch(apiURL)
    photosArray = await res.json()
    displayPhotos()
  } catch (e) {
    console.error(e)
  }
}

function displayPhotos() {
  photosArray.forEach(photo => {
    console.log(photo)
    const item = document.createElement('a')
    item.setAttribute('href', photo.links.html)
    item.setAttribute('target', '_blank')
    item.setAttribute('rel', 'noopener noreffer')

    const img = document.createElement('img')
    img.setAttribute('src', photo.urls.regular)
    img.setAttribute('alt', photo.alt_description)

    item.appendChild(img)
    imageContainer.appendChild(item)
  })
}
// On Load
getPhotos()
