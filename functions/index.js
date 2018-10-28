
const functions = require('firebase-functions')
// const fetchBlogs = require('./naver')
// const crawlPreview = require('./crawl')

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions
exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send('Hello from Firebase!')
})

// exports.fetchBlogs = fetchBlogs
// exports.crawlPreview = crawlPreview
