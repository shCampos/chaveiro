const readline  = require('readline-sync')

function userInput(content) {
  content.kingdon = 'Fungi'
  //content.kingdon = askAndReturnKingdon()
  function askAndReturnKingdon() {
    const kingdons = ['Fungi', 'Plantae']
    const selectedKingdonIndex = readline.keyInSelect(kingdons, 'Choose the Kingdon: ')
    const selectedKingdon = kingdons[selectedKingdonIndex]
    return selectedKingdon
  }
  
  content.family = 'Amanitaceae'
  //content.family = askAndReturnFamily()
  function askAndReturnFamily() {
    return readline.question('Type the Family: ')
  }

  content.genus = 'Amanita'
  //content.genus = askAndReturnGenus()
  function askAndReturnGenus() {
    return readline.question('Type the Genus: ')
  }
}

module.exports = userInput