import Axios from 'axios'
import auth from './auth'
import dataApi from './data'

const weather = {
  getWeather (locationIds) {
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

export default (request, ...params) => {
  const api = {
    ...weather,
    ...auth,
    ...dataApi
  }
  return api[request](...params).then((result) => {
    if (!result) return
    const { data } = result
    return data
  })
}
