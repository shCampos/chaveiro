const readline  = require('readline-sync')

function userInput(content) {
  content.searchParams.kingdon = askAndReturnKingdon()
  function askAndReturnKingdon() {
    const kingdons = ['Fungi', 'Plantae']
    const selectedKingdonIndex = readline.keyInSelect(kingdons, 'Choose the Kingdon: ')
    const selectedKingdon = kingdons[selectedKingdonIndex]
    return selectedKingdon
  }
  
  content.searchParams.family = askAndReturnFamily()
  function askAndReturnFamily() {
    return readline.question('Type the Family: ')
  }

  content.searchParams.genus = askAndReturnGenus()
  function askAndReturnGenus() {
    return readline.question('Type the Genus: ')
  }
}

module.exports = userInput