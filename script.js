// Unsplash API
import 'regenerator-runtime/runtime'
const count = 10
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${process.env.apiKey}&count=${count}`

// Get photos from Unsplash
async function getPhotos() {
  try {
    const res = await fetch(apiURL)
    const data = await res.json()
    console.log(data)
  } catch (e) {
    console.error(e)
  }
}

// On Load
getPhotos()