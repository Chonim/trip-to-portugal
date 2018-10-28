<template>
  <div class="weather-container">
    <div v-for="(weather, i) in weathers" :key="i">
      <weather-card
        :weather="weather"
      ></weather-card>
    </div>
  </div>
</template>

<script>
import api from '@/api'
import WeatherCard from './WeatherCard'
import countdown from 'countdown'

export default {
  name: 'WeatherContainer',
  components: {
    WeatherCard
  },
  data () {
    return {
      locations: [{
        city: 'Seoul',
        id: '1132599'
      }, {
        city: 'Porto',
        id: '746203'
      }, {
        city: 'Lisbon',
        id: '742676'
      }],
      weathers: []
    }
  },
  methods: {
    fetchWeather () {
      const ids = this.locations.map(location => location.id)
      api('getWeather', ids).then((result) => {
        const { channel } = result.query.results
        this.weathers = channel
      })
    }
  },
  mounted () {
    this.fetchWeather()
    console.log(countdown(new Date(2019, 5, 12)).toString())
  }
}
</script>

<style scoped>
.weather-container {
  height: auto;
}
</style>
