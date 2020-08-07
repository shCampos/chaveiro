const prompts = require('prompts')
const { Promise } = require('bluebird')

async function userInput(content) {
  const questions = [
    {
      type: 'select',
      name: 'kingdon',
      message: 'Choose the kingdon:',
      choices: ['Fungi', 'Plantae'],
      validate: value => typeof value === 'string' ? value.trim() !== '' : false,
    },
    {
      type: 'text',
      name: 'family',
      message: 'Type the family:',
      validate: value => typeof value === 'string' ? value.trim() !== '' : false,
    },
    {
      type: 'text',
      name: 'genus',
      message: 'Type the genus:',
      validate: value => typeof value === 'string' ? value.trim() !== '' : false,
    }
  ]
  
  content.searchParams = await prompts(questions)
  content.searchParams.kingdon = questions[0].choices[content.searchParams.kingdon]
  console.log(content)
  /* new Promise (async () => {
    content.searchParams = await prompts(questions)
    content.searchParams.kingdon = questions[0].choices[content.searchParams.kingdon]
    console.log(content)
  /* let response = await prompts(questions)
    response.kingdon = questions[0].choices[response.kingdon]
    return response *
  }) */
}

module.exports = userInput