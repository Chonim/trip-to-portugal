<template>
  <div>
    <delete-confirm
      :is-open="isModalOpen"
      @cancel="isModalOpen = false"
      @confirm="deleteLink(selectedKey)"
    ></delete-confirm>
    <template v-for="(item, key, index) in obj">
      <list-entity
        :item="item"
        :obj-key="key"
        :obj-index="index"
        :obj-length="obj.length"
        :key="item.type + index"
        @openModal="openModal(key)"
      ></list-entity>
    </template>
  </div>
</template>

<script>
import firebase from '@/plugins/firebase'
import DeleteConfirm from '../elements/DeleteConfirm'
import ListEntity from './ListEntity'

export default {
  name: 'LinkList',
  props: {
    obj: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    DeleteConfirm,
    ListEntity
  },
  data () {
    return {
      isModalOpen: false,
      selectedKey: ''
    }
  },
  methods: {
    openModal (key) {
      this.selectedKey = key
      this.isModalOpen = true
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
