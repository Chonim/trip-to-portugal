const functions = require('firebase-functions')

const crawlPreview = functions.database.ref('/data/{dataId}').onWrite((change, context) => {
  console.log(change)
  console.log(context)
})
// const crawlPreview = functions.database.ref('/accomodation/porto')
//   .onWrite(event => {
//     console.log(event)
//     // set() returns a promise. We keep the function alive by returning it.
//     return event.data.ref.set('world!').then(() => {
//       console.log('Write succeeded!')
//     })
//   })

module.exports = crawlPreview
