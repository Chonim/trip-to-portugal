<template>
  <div class="hello">
    <v-form @submit.prevent="goToSearch($event.target.value)">
      <v-text-field
        v-model="searchText"
        label="Keyword"
        ref="searchKeyword"
        @keyup.enter="goToSearch($event.target.value)"
      ></v-text-field>
      <v-btn
        @click="goToSearch($refs.searchKeyword.value)"
      >검색</v-btn>
    </v-form>
    <div v-for="post in posts" :key="post.id">
      {{post.body}}
    </div>
    <div
      v-for="keyword in keywords" :key="keyword.en"
      class="city-container"
    >
      <div>{{keyword.en}}</div>
      <div
        class="portugal-bg"
        :style="{ backgroundImage: `url('${baseUrl}${keyword.en}')` }"
        @click="goToSearch(keyword.ko)"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      baseUrl: 'https://source.unsplash.com/featured/?',
      keywords: [{
        en: 'Portugal',
        ko: '포르투갈'
      }, {
        en: 'Porto',
        ko: '포르투'
      }, {
        en: 'Lisbon',
        ko: '리스본'
      }],
      posts: [],
      searchText: ''
    }
  },
  methods: {
    goToSearch (keyword) {
      console.log(keyword)
      this.$router.push({
        name: 'KeywordSearch',
        params: { keyword }
      })
    }
  },
  mounted () {
    // this.$http.get('https://jsonplaceholder.typicode.com/posts').then((result) => {
    // this.$http.get('https://cors-anywhere.herokuapp.com/https://jsonplaceholder.typicode.com/posts').then((result) => {
    // this.$http.get('https://dapi.kakao.com/v2/search/blog?query=블로그').then((result) => {
    //   console.log(result)
    //   this.posts = result.data
    // })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #35495E;
}

.city-container {
  margin-top: 10px;
}
.portugal-bg {
  background-size: cover;
  height: 200px;
}
</style>
