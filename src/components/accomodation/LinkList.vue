<template>
  <div>
    <delete-confirm
      :is-open="isModalOpen"
      @cancel="isModalOpen = false"
      @confirm="deleteLink(selectedKey)"
    ></delete-confirm>
    <template v-for="(item, key, index) in obj">
      <v-list-tile
        :key="key"
        avatar
        ripple
      >
        <v-list-tile-content @click="openLink(item.link)">
          <v-list-tile-title>{{ item.note }}</v-list-tile-title>
          <v-list-tile-sub-title class="text--primary">{{ item.link }}</v-list-tile-sub-title>
          <v-list-tile-sub-title>{{ item.link }}</v-list-tile-sub-title>
        </v-list-tile-content>

        <v-list-tile-action>
          <v-list-tile-action-text>{{ item.addedDate }}</v-list-tile-action-text>
        </v-list-tile-action>
        <v-list-tile-action>
          <v-icon
            :color="item.isFavorite ? 'yellow darken-2' : 'grey lighten-1'"
            @click="updateIsFavorite(key, !item.isFavorite)"
          >
            {{item.isFavorite ? 'star' : 'star_border' }}
          </v-icon>
          <v-icon @click="openModal(key)">
            delete
          </v-icon>
        </v-list-tile-action>

      </v-list-tile>
      <v-divider
        v-if="index + 1 < obj.length"
        :key="index"
      ></v-divider>
    </template>
  </div>
</template>

<script>
import DeleteConfirm from '../elements/DeleteConfirm'

export default {
  name: 'LinkList',
  props: {
    obj: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    DeleteConfirm
  },
  data () {
    return {
      isModalOpen: false,
      selectedKey: ''
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
      this.$http.patch(`data/${key}.json`, { isFavorite }).then((res) => {
        this.$emit('update')
      })
    },
    deleteLink (key) {
      this.isModalOpen = false
      this.$http.delete(`data/${key}.json`).then((res) => {
        this.$emit('update')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
