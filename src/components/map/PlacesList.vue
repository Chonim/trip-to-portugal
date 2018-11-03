<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-list subheader>
          <!-- <v-subheader>Porto</v-subheader> -->
          <v-list-tile
            v-for="item in places"
            :key="item.address"
            avatar
            @click="showInfo(item)"
          >
            <v-list-tile-content>
              <v-list-tile-title v-html="item.name"></v-list-tile-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-icon :color="item.active ? 'teal' : 'grey'">chat_bubble</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { EventBus } from '@/plugins/event-bus.js'

export default {
  name: 'PlacesList',
  props: {
    places: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    showInfo (place) {
      console.log(place)
      EventBus.$emit('placeSelect', place)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
