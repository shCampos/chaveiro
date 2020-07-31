const axios = require('axios');

function robot(content) {
  console.log(`Searching species in: ${content.genus}`)
  getGenusId(content)

  function getGenusId(content) {
    axios.get(`https://api.gbif.org/v1/species/match?kingdon=${content.kingdom}&family=${content.family}&genus=${content.genus}`)
    .then(res => {
      getSpeciesByGenusKey(res.data.genusKey)
    })
    .catch(err => {
      console.log('Error in search genus: ', err.message)
    })
  }

  async function getSpeciesByGenusKey(genusKey) {
    content.speciesNameList = []
    await axios.get(`https://api.gbif.org/v1/species/${genusKey}/children?limit=1000`)
    .then(res => {
      res.data.results.forEach(el => el.taxonomicStatus=='ACCEPTED'&&content.speciesNameList.push(el.scientificName))
      content.speciesNameList = [... new Set(content.speciesNameList)]
    })
    .catch(err => {
      console.log('Error in get species by genus id: ', err.message)
    })
  }
}

module.exports = robot