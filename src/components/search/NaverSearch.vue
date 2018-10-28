<template>
  <div>NaverSearch</div>
</template>

<script>
import CONFIG from '@/config'

export default {
  name: 'NaverSearch',
  mounted () {
    const url = `https://openapi.naver.com/v1/search/blog?query=${'카카오'}`
    const config = {
      headers: {
        'X-Naver-Client-Id': CONFIG.NAVER_CLIENT_ID,
        'X-Naver-Client-Secret': CONFIG.NAVER_CLIENT_SECRET
      }
    }
    console.log(config)
    this.$http.get(url, config)
      .then((res) => {
        console.log('hi')
      })
  }
}
</script>

<style>

</style>
