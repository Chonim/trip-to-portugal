<template>
  <div
    v-touch="{
      left: () => swipe('next'),
      right: () => swipe('prev'),
      up: () => swipe('Up'),
      down: () => swipe('Down')
    }"
    transition="fade-transition"
  >
    <h1>{{ keyword }}</h1>
    <div>
      <div
        v-for="post in posts"
        :key="post.url"
        class="post-container"
      >
        <post-card
          :title="post.title"
          :thumbnail="post.thumbnail"
          :contents="post.contents"
          :url="post.url"
        >
        </post-card>
        <!-- <div>{{post.datetime}}</div> -->
      </div>
    </div>
    <div class="text-xs-center" v-if="pages > 1">
      <v-pagination
        v-model="page"
        :length="pages"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
import { apiHandler } from '@/utils/api-handler'
import CONFIG from '@/config'
import PostCard from './search/PostCard'

export default {
  name: 'KeywordSearch',
  components: {
    PostCard
  },
  data () {
    return {
      keyword: '',
      page: 1,
      pages: 1,
      posts: []
    }
  },
  watch: {
    page (newPage) {
      this.searchByKeyword(newPage)
    }
  },
  methods: {
    searchByKeyword (page) {
      this.$http.get(`https://dapi.kakao.com/v2/search/blog?query=${this.keyword}&page=${page}`, {
        headers: {
          Authorization: CONFIG.KAKAO_AUTH
        }
      }).then((result) => {
        apiHandler(result)
        console.log(result)
        const { data } = result
        this.posts = data.documents
        this.pages = data.meta.pageable_count
        console.log(this.posts)
        this.$vuetify.goTo(0, {
          duration: 300,
          offset: 0,
          easing: 'easeInOutCubic'
        })
      })
    },
    swipe (direction) {
      console.log(direction)
      switch (direction) {
        case 'next':
          this.page++
          break
        case 'prev':
          this.page--
          break
        default:
          break
      }
    }
  },
  mounted () {
    this.keyword = this.$route.params.keyword
    this.searchByKeyword(1)
  }
}
</script>

<style lang="scss">
.post-contents {
  font-size: 13px;
}
</style>

<style lang="scss" scoped>
.post-container {
  margin-top: 20px;
  background-color: #fff;
  h3 {
    margin-bottom: 10px;
  }
  .description-wrapper {
    display: flex;
    img {
      min-width: 6em;
      height: 6em;
    }
  }
}
.paginator {
  max-width: 100%;
}
</style>
