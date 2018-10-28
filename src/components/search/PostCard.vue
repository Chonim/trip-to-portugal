<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <a :href="url" target="_blank">
        <v-card>
          <v-img
            :src="thumbnail"
            aspect-ratio="2.75"
          ></v-img>

          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0" v-html="title"></h3>
              <div v-html="contents"></div>
            </div>
          </v-card-title>

          <v-card-actions>
            <v-btn flat color="orange">열기</v-btn>
          </v-card-actions>
        </v-card>
      </a>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'PostCard',
  props: {
    title: {
      type: String,
      default: ''
    },
    thumbnail: {
      type: String,
      default: ''
    },
    contents: {
      type: String,
      default: ''
    },
    url: {
      type: String,
      default: ''
    }
  }
}
</script>

<style>

</style>
