const Promise = require('bluebird')
const { Builder, By, Key, until, Wait } = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')
const chromedriver = require('chromedriver')

async function robot(content) {
  chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build())
  let infoPageLink, descriptionPageLink 

  await searchPageHander()
  await infoPageHandler()
  await descriptionPageHandler()

  async function searchPageHander() {
    let searchPageDriver = new Builder().forBrowser('chrome').build()
    try {
      await searchPageDriver.get('http://www.mycobank.org/quicksearch.aspx');
      let formatedSpecieName = scientificNameFormat(content.species[0].scientificName)
      await searchPageDriver.findElement(By.id('ctl00_Main_txtSearchLookBioaware'))
        .sendKeys(formatedSpecieName)
        .then(()=>console.log(`[search-robot in MycoBank | ${formatedSpecieName}] Searching...`))
      await searchPageDriver.findElement(By.id('ctl00_Main_txtSearchLookBioaware'))
        .sendKeys(Key.ENTER)
        .then(()=>console.log(`[search-robot in MycoBank | ${formatedSpecieName}] Accessing more informations...`))
      await searchPageDriver.findElement(By.linkText(formatedSpecieName)).click()
        .then(()=>console.log(`[search-robot in MycoBank | ${formatedSpecieName}] Getting feature...`))
      let infoPageLinkElement = await searchPageDriver.findElement(By.linkText(formatedSpecieName))
      await infoPageLinkElement.getAttribute('href')
      .then((href) => {
        infoPageLink = href
      })
    } catch(err) {
      console.log(err)
    } finally {
      await searchPageDriver.quit()
    }
  }
  async function infoPageHandler() {
    let infoPageDriver = new Builder().forBrowser('chrome').build()
    try {
      await infoPageDriver.get(infoPageLink)
      let descriptionLinkElement = await infoPageDriver.findElement(By.id('ctl00_Main_RG_Detail_ctl00__27'))
      .findElement(By.className('RightColCSS'))
      .findElement(By.className('wrapBreakWord'))
      .findElement(By.tagName('a'))
      await descriptionLinkElement.getAttribute('href')
      .then((href) => {
        console.log('\n\n\nhref\n\n\n', href)
        descriptionPageLink = href
      })
    } catch(err) {
      console.log(err)
    }/*  finally {
      await infoPageDriver.quit()
    } */
  }

  async function descriptionPageHandler() {
    let descriptionPageDriver = new Builder().forBrowser('chrome').build()
    try {
      await descriptionPageDriver.get(descriptionPageLink)
    } catch(err) {
      console.log(err)
    } /* finally {
      await descriptionPageDriver.quit()
    } */
  }

  function scientificNameFormat(scientificName){
    return scientificName.split(' ')[0]+' '+scientificName.split(' ')[1]
  }
}

module.exports = robot