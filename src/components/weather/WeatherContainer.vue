<template>
  <div class="weather-container">
    <div v-for="i in 3" :key="i">
      <weather-card></weather-card>
    </div>
  </div>
</template>

<script>
import WeatherCard from './WeatherCard'

export default {
  name: 'WeatherContainer',
  components: {
    WeatherCard
  }
}
</script>

<style scoped>
.weather-container {
  height: auto;
}
</style>
