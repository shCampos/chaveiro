let { checkSpecieInDb } = require('../../firebase.js')
const searchRobots = {
  mycobank: require('./mycobank.js'),
  core: require('./core.js')
}

function robot(content) {
  content.species.forEach(el => {
    !checkSpecieInDb(el.scientificName)&&
    content.searchParams.kingdon=='Fungi'?searchRobots.mycobank(content):searchRobots.core(content)
  })
}

module.exports = robot