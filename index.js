const robots = {
  userInput: require('./robots/user-input.js'),
  list: require('./robots/list.js')
}

function begin() {
  const content = {}
  
  robots.userInput(content)
  console.log(content)
  robots.list(content)
}

begin()