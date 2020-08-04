const searchRobots = {
  mycobank: require('./mycobank.js'),
  core: require('./core.js')
}

function robot(content) {  
  content.searchParams.kingdon=='Fungi'?searchRobots.mycobank(content):searchRobots.core(content)
}

module.exports = robot