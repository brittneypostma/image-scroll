import 'regenerator-runtime/runtime'

const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')

let photosArray = []
let ready = false
let imagesLoaded = 0
let totalImages = 0

// Check all images loaded
function imageLoaded() {
  imagesLoaded++
  loader.hidden = true
  if (imagesLoaded === totalImages) ready = true
}

// Helper function
function setAttributes(el, att) {
  for (const key in att) {
    el.setAttribute(key, att[key])
  }
}

// Create elements on page
function displayPhotos() {
  imagesLoaded = 0
  totalImages = photosArray.length
  photosArray.forEach(photo => {
    const item = document.createElement('a')
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
      rel: 'noopener noreffer'
    })
    const img = document.createElement('img')
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description
    })
    img.addEventListener('load', imageLoaded)

    item.appendChild(img)
    imageContainer.appendChild(item)
  })
}

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

// see if near bottom
window.addEventListener('scroll', () => {
  // window.innerHeight and window.scrollY to calc
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false
    getPhotos()
  }
})


// On Load
getPhotos()
