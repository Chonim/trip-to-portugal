export default [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/components/Home')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/components/auth/Login')
  },
  {
    path: '/weather',
    name: 'Weather',
    component: () => import('@/components/weather/WeatherContainer')
  },
  {
    path: '/naver',
    name: 'Naver',
    component: () => import('@/components/search/NaverSearch')
  },
  {
    path: '/note',
    name: 'Note',
    component: () => import('@/components/Note')
  },
  {
    path: '/data/:type',
    name: 'Data',
    component: () => import('@/components/data-view')
  },
  {
    path: '/search/:keyword',
    name: 'KeywordSearch',
    component: () => import('@/components/KeywordSearch')
  },
  {
    path: '/todo',
    name: 'Todo',
    component: () => import('@/components/Todo')
  }
]
