export default [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/components/Home')
  },
  {
    path: '/weather',
    name: 'Weather',
    component: () => import('@/components/weather/WeatherContainer')
  },
  {
    path: '/search/:keyword',
    name: 'KeywordSearch',
    component: () => import('@/components/KeywordSearch')
  }
]
