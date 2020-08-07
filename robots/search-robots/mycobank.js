const { Builder, By, Key, until, Wait } = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')
const chromedriver = require('chromedriver')
const { writeSpecie } = require('../../firebase.js')

async function robot(specie) {
  chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build())
  let formatedSpecieName, infoPageLink, descriptionPageLink

  await searchPageHander()
  await infoPageHandler()
  await descriptionPageHandler()
  
  async function searchPageHander() {
    formatedSpecieName = scientificNameFormat(specie.scientificName)
    let searchPageDriver = new Builder().forBrowser('chrome').build()
    console.log(`[search-robot [MycoBank] | ${formatedSpecieName}] Building browser...`)
    try {
      await searchPageDriver.get('http://www.mycobank.org/quicksearch.aspx')
      .then(()=>console.log(`[search-robot [MycoBank] | ${formatedSpecieName}] Searching...`));
      await searchPageDriver.findElement(By.id('ctl00_Main_txtSearchLookBioaware'))
        .sendKeys(formatedSpecieName)
        .then(()=>console.log(`[search-robot [MycoBank] | ${formatedSpecieName}] Specie found...`))
      await searchPageDriver.findElement(By.id('ctl00_Main_txtSearchLookBioaware'))
        .sendKeys(Key.ENTER)
        .then(()=>console.log(`[search-robot [MycoBank] | ${formatedSpecieName}] Accessing more informations...`))
      await searchPageDriver.findElement(By.linkText(formatedSpecieName)).click()
        .then(()=>console.log(`[search-robot [MycoBank] | ${formatedSpecieName}] Looking closer...`))
      let infoPageLinkElement = await searchPageDriver.findElement(By.linkText(formatedSpecieName))
      await infoPageLinkElement.getAttribute('href')
      .then((href) => {
        infoPageLink = href
      })
    } catch(err) {
      console.log(`[search-robot [MycoBank] | ${formatedSpecieName}] Search failed`)
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
        descriptionPageLink = href
        console.log(`[search-robot [MycoBank] | ${formatedSpecieName}] Finding description...`)
      })
    } catch(err) {
      console.log(`[search-robot [MycoBank] | ${formatedSpecieName}] Description doesn't found...`)
      console.log(err)
    } finally {
      await infoPageDriver.quit()
    }
  }

  async function descriptionPageHandler() {
    let descriptionPageDriver = new Builder().forBrowser('chrome').build()
    try {      
      await descriptionPageDriver.get(descriptionPageLink)
      .then(() => console.log(`[search-robot [MycoBank] | ${formatedSpecieName}] Getting description...`))
      .catch((err) => console.log(`[search-robot [MycoBank] | ${formatedSpecieName}] Error in getting description...`))
      let descriptionTextElement = await descriptionPageDriver.findElement(By.id('ctl00_Main_RG_Detail_ctl00__3'))
      .findElement(By.className('RightColCSS'))
      specie.descriptionDirty = await descriptionTextElement.getText()
      specie.descriptionDirty?writeSpecie(specie):console.log(`[search-robot [MycoBank] | ${formatedSpecieName}] Error in getting description...`)
    } catch(err) {
      console.log(`[search-robot [MycoBank] | ${formatedSpecieName}] Error in getting description...`)
      console.log(err)
    } finally {
      await descriptionPageDriver.quit()
    }
  }

  function scientificNameFormat(scientificName){
    return scientificName.split(' ')[0]+' '+scientificName.split(' ')[1]
  }
}

module.exports = robot