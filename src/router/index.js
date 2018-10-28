import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Weather from '@/components/weather/WeatherContainer'
import KeywordSearch from '@/components/KeywordSearch'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/weather',
      name: 'Weather',
      component: Weather
    },
    {
      path: '/search/:keyword',
      name: 'KeywordSearch',
      component: KeywordSearch
    }
  ]
})
