require('dotenv').config()

const robots = {
  userInput: require('./robots/user-input.js'),
  list: require('./robots/list.js'),
  search: require('./robots/search-robots/index.js')
}

const content = {}

robots.userInput(content)
  .then(async () => {
    await robots.list(content)
    await robots.search(content)
  })

function teste(){
  content.searchParams = {
    kingdon: 'Fungi',
    family: 'Amanitaceae',
    genus: 'Amanita',
  }
  content.species = [{
    scientificName: 'Amanita muscaria'
  }]
  console.log(content)
}