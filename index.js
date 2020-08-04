const Promise = require('bluebird')

const robots = {
  userInput: require('./robots/user-input.js'),
  list: require('./robots/list.js'),
  search: require('./robots/search-robots/index.js')
}

const content = {}

Promise.resolve(teste())
  //.tap(robots.list(content))
  .tap(robots.search(content))

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