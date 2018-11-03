<template>
  <div>
    <input-box></input-box>
    <google-map
      :places="places"
    ></google-map>
    <places-list
      :places="places"
    ></places-list>
  </div>
</template>

<script>
import 'firebase/database'
import InputBox from './InputBox'
import GoogleMap from './GoogleMap'
import PlacesList from './PlacesList'

export default {
  name: 'MapWrapper',
  components: {
    GoogleMap,
    InputBox,
    PlacesList
  },
  data () {
    return {
      ref: this.$firebase.database().ref('places'),
      // ref: this.$firebase.database().ref('places'),
      places: []
    }
  },
  methods: {
    getPlaces () {
      this.ref.once('value').then((snapshot) => {
        this.places = []
        const results = snapshot.val()
        Object.keys(results).forEach((objKey) => {
          results[objKey].key = objKey
          this.places.push(results[objKey])
        })
        // this.notes = _orderBy(results, ['key'], ['desc'])
      })
    }
  },
  mounted () {
    this.ref.on('value', () => this.getPlaces())
  }
}
</script>

<style lang="scss" scoped>
</style>
