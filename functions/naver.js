const functions = require('firebase-functions')
const CONFIG = require('../src/config/require')

const fetchBlogs = functions.https.onRequest((request, response) => {
  const rp = require('request-promise')
  const { query } = request
  let uri = `https://openapi.naver.com/v1/search/blog?query=${encodeURI(query.q)}&display=100`
  if (query.page) uri += `&start=${query.page * 100 - 99}`
  const options = {
    uri,
    headers: {
      'X-Naver-Client-Id': CONFIG.NAVER_CLIENT_ID,
      'X-Naver-Client-Secret': CONFIG.NAVER_CLIENT_SECRET
    },
    json: true
  }
  rp.get(options)
    .then((res) => {
      // console.log(Object.keys(request))
      console.log(request.query)
      console.log(uri)
      response.send(res)
    })
    .catch((err) => {
      response.send(err)
    })
})

module.exports = fetchBlogs
