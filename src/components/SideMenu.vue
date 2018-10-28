<template>
  <v-layout
    wrap
  >
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      dark
      @input="$emit('change')"
    >
      <!-- <v-list class="pa-1">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img src="https://randomuser.me/api/portraits/men/85.jpg">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>John Leider</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list> -->

      <v-list class="pt-0" dense>
        <v-divider></v-divider>

        <v-list-tile
          v-for="item in items"
          :key="item.title"
          @click="goToPage(item.route)"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </v-layout>
</template>

<script>
export default {
  name: 'SideMenu',
  props: {
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      drawer: false,
      items: [
        {
          title: '홈으로',
          icon: 'home',
          route: '/'
        },
        {
          title: '스크랩',
          icon: 'favorite',
          route: '/'
        },
        {
          title: '날씨',
          icon: 'wb_sunny',
          route: '/weather'
        },
        {
          title: '항공권',
          icon: 'flight',
          route: '/weather'
        },
        {
          title: '지도',
          icon: 'map',
          route: '/weather'
        },
        {
          title: '숙소',
          icon: 'local_hotel',
          route: '/accomodation'
        },
        {
          title: '맛집',
          icon: 'restaurant',
          route: '/weather'
        },
        {
          title: '카페',
          icon: 'local_cafe',
          route: '/weather'
        },
        {
          title: '디저트',
          icon: 'cake',
          route: '/weather'
        },
        {
          title: '와인',
          icon: 'local_bar',
          route: '/weather'
        },
        {
          title: '쇼핑',
          icon: 'shop',
          route: '/weather'
        },
        {
          title: '액티비티',
          icon: 'local_activity',
          route: '/weather'
        }
      ]
    }
  },
  watch: {
    isOpen (newVal) {
      this.drawer = newVal
    },
    drawer (newVal) {
      if (!newVal) {
        this.$emit('close')
      }
    }
  },
  methods: {
    goToPage (route) {
      console.log(route)
      this.$router.push(route)
    }
  }
}
</script>

<style>

</style>
