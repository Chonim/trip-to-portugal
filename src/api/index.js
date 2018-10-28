import Axios from 'axios'

const weather = {
  getWeather (locationIds) {
    console.log(locationIds)
    let woeid = [locationIds[0]]
    if (locationIds.length > 1) {
      locationIds.forEach((id, index) => {
        if (index < 1) {
          return
        }
        woeid += ` or woeid=${id}`
      })
    }
    const q = `select * from weather.forecast where woeid=${woeid}`
    const params = {
      format: 'json',
      q
    }
    const url = 'https://query.yahooapis.com/v1/public/yql'
    return Axios.get(url, { params })
  }
}

const handleApi = (request, ...params) => {
  console.log(request)
  const api = {...weather}
  return api[request](...params).then((result) => {
    const { data } = result
    return data
  })
}

export default handleApi
