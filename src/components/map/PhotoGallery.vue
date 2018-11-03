<template>
  <v-dialog
    v-model="showPhotos"
    width="500"
  >
    <v-card>
      <v-carousel
        height="200"
      >
        <v-carousel-item
          v-for="(photo,i) in photos"
          :key="i"
          :src="photo"
        ></v-carousel-item>
      </v-carousel>
      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          flat
          @click="showPhotos = false"
        >
          닫기
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'PhotoGallery',
  props: {
    isGalleryOpen: {
      type: Boolean,
      default: false
    },
    photos: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      showPhotos: false
    }
  },
  watch: {
    isGalleryOpen (newVal) {
      this.showPhotos = newVal
    },
    showPhotos (newVal) {
      if (newVal) {
        return
      }
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
