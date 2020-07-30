const readline  = require('readline-sync')

function begin() {
  const content = {}
  
  content.kingdon = askAndReturnKingdon()
  function askAndReturnKingdon() {
    const kingdons = ['Fungi', 'Plantae']
    const selectedKingdonIndex = readline.keyInSelect(kingdons, 'Choose the Kingdon: ')
    const selectedKingdon = kingdons[selectedKingdonIndex]
    return selectedKingdon
  }
  
  content.family = askAndReturnFamily()
  function askAndReturnFamily() {
    return readline.question('Type the Family: ')
  }

  content.genus = askAndReturnGenus()
  function askAndReturnGenus() {
    return readline.question('Type the Genus: ')
  }

  console.log(content)
}

begin()