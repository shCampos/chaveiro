const { checkSpecieInDb } = require('../../firebase.js')
const searchRobots = {
  mycobank: require('./mycobank.js'),
  core: require('./core.js')
}

function robot(content) {
  console.log(content)
  content.species.forEach((specie) => {
    console.log(`Starting the searching process for ${specie.scientificName}`)
    checkSpecieInDb(specie.scientificName)&&
    content.searchParams.kingdon=='Fungi'?searchRobots.mycobank(specie):searchRobots.core(specie)
  })
}

module.exports = robot