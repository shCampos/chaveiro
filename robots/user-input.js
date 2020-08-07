const prompts = require('prompts')

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
}

module.exports = userInput