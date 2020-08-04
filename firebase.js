const firebase = require('firebase/app')
require('firebase/database')

const firebaseConfig = {}

firebase.initializeApp(firebaseConfig)
const database = firebase.database()

export async function checkSpecieInDb(scientificName) {
  let isInDb = false
  await firebase.database().ref('species/').on('value', (snapshot) => {
    snapshot.exists()?
      snapshot.forEach(child => {
        (child.val().scientificName == scientificName)&&(isInDb = true)
      })
    :isInDb = false
  })
  return isInDb
}