<template>
  <v-list two-line>
    <delete-confirm
      :is-open="isModalOpen"
      @cancel="isModalOpen = false"
      @confirm="deleteLink(selectedKey)"
    ></delete-confirm>
    <v-text-field
      v-model="link"
      label="링크"
    ></v-text-field>
    <v-text-field
      v-model="note"
      label="설명"
    ></v-text-field>
    <v-btn
      @click="addLink(link)"
    >추가</v-btn>
    <template v-for="(item, key, index) in items">
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
        v-if="index + 1 < items.length"
        :key="index"
      ></v-divider>
    </template>
  </v-list>
</template>

<script>
// import _sortBy from 'lodash/sor'
import DeleteConfirm from '../elements/DeleteConfirm'

export default {
  name: 'Accomodation',
  components: {
    DeleteConfirm
  },
  data () {
    return {
      isModalOpen: false,
      note: '',
      link: '',
      selectedKey: '',
      items: [
        {
          action: '15 min',
          headline: 'Brunch this weekend?',
          title: 'Ali Connors',
          subtitle: "I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
        }
      ]
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
    getList () {
      this.$http.get('/accomodation.json').then((res) => {
        const { data } = res
        this.items = data.porto
      })
    },
    addLink () {
      const payload = {
        index: this.items.length,
        note: this.note,
        isFavorite: false,
        addedDate: new Date(),
        link: this.link
      }
      this.$http.post('accomodation/porto.json', payload).then((res) => {
        this.getList()
      })
    },
    deleteLink (key) {
      this.isModalOpen = false
      this.$http.delete(`accomodation/porto/${key}.json`).then((res) => {
        this.getList()
      })
    },
    updateIsFavorite (key, isFavorite) {
      this.$http.patch(`accomodation/porto/${key}.json`, { isFavorite }).then((res) => {
        this.getList()
      })
    }
  },
  mounted () {
    this.getList()
  }
}
</script>

<style lang="scss" scoped>
</style>

