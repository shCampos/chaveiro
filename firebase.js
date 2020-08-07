const firebase = require('firebase/app')
require('firebase/database')

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
}

firebase.initializeApp(firebaseConfig)
const database = firebase.database()

async function checkSpecieInDb(scientificName) {
  let isInDb = false
  await firebase.database().ref('species/').on('value', (snapshot) => {
    snapshot.exists()?
      snapshot.forEach((child) => {
        (child.val().scientificName == scientificName)&&(isInDb = true)
      })
    :isInDb = false
  })
  return isInDb
}


async function writeSpecie(specie) {
  console.log(`[database] Sending ${JSON.stringify(specie)}`)
  await firebase.database().ref('species/').push(specie)
  .then(() => console.log(`[database] Sent to database`))
  .catch((err) => {
    console.log(`[database] Submission to the database failed`)
    console.log(err)
  })
}
module.exports.checkSpecieInDb = checkSpecieInDb
module.exports.writeSpecie = writeSpecie