<template>
  <div>
    <v-list-tile
      :key="objKey"
      avatar
      ripple
    >
      <v-list-tile-content @click="openLink(item.link)">
        <v-list-tile-title>{{ item.note }}</v-list-tile-title>
        <v-list-tile-sub-title class="text--primary">{{ item.link }}</v-list-tile-sub-title>
        <!-- <v-list-tile-sub-title>{{ item.link }}</v-list-tile-sub-title> -->
      </v-list-tile-content>

      <!-- <v-list-tile-action>
        <v-list-tile-action-text>{{ item.addedDate }}</v-list-tile-action-text>
      </v-list-tile-action> -->
      <v-list-tile-action>
        <v-icon
          :color="item.isFavorite ? 'yellow darken-2' : 'grey lighten-1'"
          @click="updateIsFavorite(objKey, !item.isFavorite)"
        >
          {{item.isFavorite ? 'star' : 'star_border' }}
        </v-icon>
        <v-icon @click="$emit('openModal', objKey)">
          delete
        </v-icon>
      </v-list-tile-action>

    </v-list-tile>
    <post-card
      v-if="meta"
      :title="meta.metaTitle"
      :thumbnail="meta.metaImage"
      :contents="meta.metaDescription"
      :url="item.link"
    ></post-card>
    <v-divider
      v-if="Objindex + 1 < objLength"
      :key="Objindex"
    ></v-divider>
  </div>
</template>

<script>
import firebase from '@/plugins/firebase'
import PostCard from '../search/PostCard'

export default {
  name: 'ListEntity',
  components: {
    PostCard
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    objKey: {
      type: String,
      default: ''
    },
    Objindex: {
      type: Number,
      default: 0
    },
    objLength: {
      type: Number,
      default: 0
    }
  },
  computed: {
    meta () {
      // if (!this.meta) {
      //   return {}
      // }
      return this.item.meta
    }
  },
  methods: {
    openLink (link) {
      window.open(link)
    },
    openModal (key) {
      this.selectedKey = key
      this.isModalOpen = true
    },
    updateIsFavorite (key, isFavorite) {
      const ref = firebase.database().ref(`data/${key}`)
      ref.update({ isFavorite })
    },
    deleteLink (key) {
      this.isModalOpen = false
      const ref = firebase.database().ref(`data/${key}`)
      ref.remove()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
