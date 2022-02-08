const puppeteer = require('puppeteer')
const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(cors())

app.get('/:id', (req, res) => {
  const id = req.params.id
  async function search3() {
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()
    await page.goto(`https://www.google.com/search?q=${id}&num=2&gl=usa`, {
      waitUntil: 'domcontentloaded',
    })

    // await page.waitForSelector('.NJo7tc.Z26q7c.uUuwM div span')
    const getSearchResult = await page.evaluate(() => {
      const getdiv = document.querySelectorAll('.g.tF2Cxc')
      let a = []
      var id = 0
      getdiv.forEach((x) => {
        const aboveUrl = x.querySelector('cite[role="text"]')
        const aboveUrlText = aboveUrl.innerText

        const link = x.querySelector('a')
        const linkText = link.getAttribute('href')

        const linkdata = link.querySelector('.LC20lb.MBeuO.DKV0Md')
        const linkdataText = linkdata.innerText

        const data = x.querySelector('.NJo7tc.Z26q7c.uUuwM div ')

        const dataText = data.innerText

        id++
        a.push({
          id: id,
          aboveUrlText: aboveUrlText,
          linkText: linkText,
          linkdataText: linkdataText,
          dataText: dataText,
        })
      })
      return a
    })
    console.log('hello')
    console.log(getSearchResult)
    await browser.close()
    res.send(getSearchResult)
  }
  search3()
})

app.listen(5000, () => {
  console.log('listning to port 5000')
})
///hello
///////////////////////
// const express = require('express') // Adding Express
// const app = express() // Initializing Express
// const puppeteer = require('puppeteer') // Adding Puppeteer

// // Wrapping the Puppeteer browser logic in a GET request
// app.get('/', function (req, res) {
//   // Launching the Puppeteer controlled headless browser and navigate to the Digimon website
//   puppeteer.launch().then(async function (browser) {
//     const page = await browser.newPage()
//     await page.goto('http://digidb.io/digimon-list/')

//     // Targeting the DOM Nodes that contain the Digimon names
//     const digimonNames = await page.$$eval(
//       '#digiList tbody tr td:nth-child(2) a',
//       function (digimons) {
//         // Mapping each Digimon name to an array
//         return digimons.map(function (digimon) {
//           return digimon.innerText
//         })
//       },
//     )
//     console
//     // Closing the Puppeteer controlled headless browser
//     await browser.close()

//     // Sending the Digimon names to Postman
//     res.send(digimonNames)
//   })
// })

// // Making Express listen on port 7000
// app.listen(7000, function () {
//   console.log('Running on port 7000.')
// })
