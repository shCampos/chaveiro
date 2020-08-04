require('dotenv').config()
const axios = require('axios')
/* 
https://core.ac.uk/api-v2/articles/search/title%3Ataxonomy?page=1&pageSize=10&metadata=true&fulltext=false&citations=false&similar=false&duplicate=false&urls=false&faithfulMetadata=false&apiKey=n2hECBkWOUXH351r8TxMfGPYFgbI9uoa
*/

async function robot(content) {
  let queryParams = {
    page: 1,
    pageSize: 10,
    metadata: true,
    fulltext: false,
    citations: false,
    similar: true,
    duplicate: false,
    urls: true,
    faithfulMetadata: false,
    apiKey: process.env.CORE_API_KEY
  }

  await accessCoreApi('Taxonomy')
  
  function accessCoreApi(therm){
    axios.get(`https://core.ac.uk/api-v2/articles/search/title%3A${therm}?`+
    `page=${queryParams.page}&pageSize=${queryParams.pageSize}&metadata=${queryParams.metadata}&`+
    `fulltext=${queryParams.fulltext}&citations=${queryParams.citations}&similar=${queryParams.similar}&`+
    `duplicate=${queryParams.duplicate}&urls=${queryParams.urls}&faithfulMetadata=${queryParams.faithfulMetadata}&`+
    `apiKey=${queryParams.apiKey}`)
    .then(res => {
      console.log(res.status)
    })
    .catch(err => {
      console.log(err)
    })
  }
}

module.exports = robot