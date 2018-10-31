
const functions = require('firebase-functions')
const cheerio = require('cheerio')
const rp = require('request-promise')

// const fetchBlogs = require('./naver')
// const crawlPreview = require('./crawl')

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send('Hello from Firebase!')
})

exports.crawlPreview = functions.database.ref('/data/{dataId}').onWrite((change, context) => {
  const { link } = change.after.val()

  const options = {
    uri: link,
    transform: (body) => cheerio.load(body)
  }

  // const originalData = change.after.val()
  // originalData.metaTitle = link
  // originalData.metaImage = 'imimi'
  // originalData.metaDescription = 'dede'
  // const metaData = {}
  // metaData.metaTitle = 'd'
  // metaData.metaImage = 'd'
  // metaData.metaDescription = 'c'
  // return change.after.ref.child('meta').set(metaData)
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

// exports.fetchBlogs = fetchBlogs
// exports.crawlPreview = crawlPreview
