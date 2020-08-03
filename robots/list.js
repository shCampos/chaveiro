const axios = require('axios');

function robot(content) {
  console.log(`[list-robot] Searching species in: ${content.searchParams.genus}`)
  getGenusId(content)

  function getGenusId(content) {
    axios.get(`https://api.gbif.org/v1/species/match?kingdon=${content.searchParams.kingdom}&family=${content.searchParams.family}&genus=${content.searchParams.genus}`)
    .then(res => {
      getSpeciesByGenusKey(res.data.genusKey)
    })
    .catch(err => {
      console.log('[list-robot] Error in search genus: ', err.message)
    })
  }

  async function getSpeciesByGenusKey(genusKey) {
    content.species = []
    await axios.get(`https://api.gbif.org/v1/species/${genusKey}/children?limit=1000`)
    .then(res => {
      res.data.results.forEach(el => el.taxonomicStatus=='ACCEPTED'&&content.species.push({
        scientificName: el.scientificName,
        taxonomyHierarchy: {
          kingdom: el.kingdom,
          phylum: el.phylum,
          order: el.order,
          class: el.class,
          family: el.family,
          genus: el.genus
        }
      }))
      content.species = [... new Set(content.species)]
    })
    .catch(err => {
      console.log('[list-robot] Error in get species by genus id: ', err.message)
    })
    console.log(`[list-robot] ${content.species.length} species found for the genus ${content.searchParams.genus}`)
  }
}

module.exports = robot