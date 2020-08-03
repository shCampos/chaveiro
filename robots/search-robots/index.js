const searchRobots = {
  mycobank: require('./robots/search-robots/mycobank.js'),
}

function robot(content) {  
  content.searchParams.kingdom=='Fungi'?mycobank(content):null
}

module.exports = robot