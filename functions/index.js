
const functions = require('firebase-functions')
const cheerio = require('cheerio')
const rp = require('request-promise')

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send('Hello from Firebase!')
})

exports.crawlPreview = functions.database.ref('/data/{dataId}').onWrite((change, context) => {
  const { link } = change.after.val()

  const options = {
    uri: link,
    transform: (body) => cheerio.load(body)
  }

  rp(options)
    .then(($) => {
      const metaData = {}
      metaData.metaTitle = $('meta[property="og:title"]').attr('content')
      metaData.metaImage = $('meta[property="og:image"]').attr('content')
      metaData.metaDescription = $('meta[property="og:description"]').attr('content')
      return change.after.ref.child('meta').set(metaData)
    })
    .catch((err) => {
      console.error(err)
      return change.after.ref.set(change.after.val())
    })
})
