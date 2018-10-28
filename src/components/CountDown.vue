<template>
  <div class="countdown-wrapper">
    <div id="countdown-clock" :class="countdown-clock"></div>
  </div>
</template>

<script>
import FlipClock from 'flipclock'
import 'flipclock/dist/flipclock.css'

export default {
  name: 'CountDown',
  data () {
    return {
      clock: null
    }
  },
  mounted () {
    const el = document.getElementById('countdown-clock')
    this.clock = new FlipClock(el, new Date(2019, 5, 12), {
      face: 'DayCounter'
    })
  }
}
</script>

<style lang="scss" scoped>
.countdown-wrapper {
  margin-top: 30px;
  transform: scale(1.8);
  transform-origin: top left;
  padding-left: 3%;
  margin-bottom: 20px;
}
</style>
