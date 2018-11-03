<template>
  <div class="map-container">
    <div id="map"></div>
    <button
      v-show="photos.length"
      @click="isGalleryOpen = true"
    >
    open gallery
    </button>
    <photo-gallery
      :is-gallery-open="isGalleryOpen"
      :photos="photos"
      @close="isGalleryOpen = false"
    ></photo-gallery>
  </div>
</template>

<script>
import { EventBus } from '@/plugins/event-bus.js'
import PhotoGallery from './PhotoGallery'

const { google } = window

export default {
  name: 'GoogleMap',
  props: {
    places: {
      type: Array,
      default: () => []
    }
  },
  components: {
    PhotoGallery
  },
  data () {
    return {
      map: null,
      marker: null,
      markers: [],
      photos: [],
      isGalleryOpen: false
    }
  },
  watch: {
    places (places) {
      if (!places.length) return
      places.forEach((place) => {
        const { position } = place
        const icon = {
          url: '/static/img/markers/lodging.svg',
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25)
        }
        const marker = new google.maps.Marker({
          position,
          map: this.map,
          icon
          // icon: '/static/img/markers/lodging.svg'
        })
        this.markers.push(marker)
        console.log(marker)
      })
    }
  },
  methods: {
    initMap () {
      const myLatLng = { lat: 41.140497, lng: -8.609677 }

      this.map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: myLatLng
      })
    },
    initAutocomplete () {
      const input = document.getElementById('pac-input')
      const searchBox = new google.maps.places.SearchBox(input)
      console.log(searchBox)

      searchBox.addListener('places_changed', () => {
        const places = searchBox.getPlaces()
        if (!places.length) return

        // Clear out the old markers.
        // markers.forEach(function(marker) {
        //   marker.setMap(null);
        // });
        const markers = []

        // For each place, get the icon, name and location.
        const bounds = new google.maps.LatLngBounds()
        places.forEach((place) => {
          if (!place.geometry) {
            console.log('Returned place contains no geometry')
            return
          }

          const { photos } = place
          this.photos = []
          if (photos && photos.length) {
            this.photos = photos.map(photo => photo.getUrl())
          }

          const position = place.geometry.location
          console.log(place)
          console.log(place.vicinity)
          console.log(position.lat())
          var icon = {
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
          }

          // Create a marker for each place.
          markers.push(new google.maps.Marker({
            map: this.map,
            icon,
            title: place.name,
            position
          }))

          if (place.geometry.viewport) {
            // Only geocodes have viewport.
            bounds.union(place.geometry.viewport)
          } else {
            bounds.extend(place.geometry.location)
          }
        })
        this.map.fitBounds(bounds)
      })
    }
  },
  created () {
    EventBus.$on('placeSelect', (place) => {
      console.log(place)
      this.map.panTo(place.position)
    })
  },
  async mounted () {
    await this.initMap()
    this.initAutocomplete()
  }
}
</script>

<style lang="scss" scoped>
.map-container {
  #map {
    width: 100%;
    height: 300px;
  }
}
</style>
