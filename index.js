const Promise = require('bluebird')
const userInput = require('./robots/user-input.js')
require('dotenv').config()

const robots = {
  mycobankSearch: require('./robots/search-robots/mycobank.js'),
  userInput: require('./robots/user-input.js'),
  list: require('./robots/list.js'),
  search: require('./robots/search-robots/index.js')
}

const content = {}

Promise.resolve(teste())
  //.tap(robots.list(content))
  .tap(robots.mycobankSearch(content))

function teste(){
  content.searchParams = {
    kingdon: 'Fungi',
    family: 'Amanitaceae',
    genus: 'Amanita',
  }
  content.species = [{
    scientificName: 'Amanita muscaria'
  }]
}