import Vue from 'vue'
import Axios from 'axios'
import CONFIG from '@/config'

Axios.defaults.baseURL = CONFIG.BASE_URL
// Axios.defaults.headers = {
//   Authorization: 'KakaoAK 191f4e4baf3ada22a2990b2097f4911d'
// }
// console.log(Axios.defaults)
// console.log(Axios.defaults.baseURL)

Vue.prototype.$http = Axios
