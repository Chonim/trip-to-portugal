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
      <v-list class="pa-1">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img src="https://randomuser.me/api/portraits/men/85.jpg">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>{{username}}님 하잉</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

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
import { mapGetters } from 'vuex'
import firebase from '@/plugins/firebase'

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
      currentUser: '',
      items: [
        {
          title: '홈으로',
          icon: 'home',
          route: '/'
        },
        {
          title: '즐겨찾기',
          icon: 'favorite',
          route: '/data/favorite'
        },
        {
          title: '메모',
          icon: 'note',
          route: '/note'
        },
        {
          title: '할일',
          icon: 'format_list_numbered',
          route: '/todo'
        },
        {
          title: '포르투',
          icon: 'flight_land',
          route: '/data/porto'
        },
        {
          title: '리스본',
          icon: 'flight_takeoff',
          route: '/data/lisbon'
        },
        {
          title: '날씨',
          icon: 'wb_sunny',
          route: '/weather'
        },
        // {
        //   title: '항공권',
        //   icon: 'flight',
        //   route: '/weather'
        // },
        {
          title: '교통수단',
          icon: 'tram',
          route: '/data/transportation'
        },
        // {
        //   title: '지도',
        //   icon: 'map',
        //   route: '/weather'
        // },
        {
          title: '숙소',
          icon: 'local_hotel',
          route: '/data/accomodation'
        },
        {
          title: '맛집',
          icon: 'restaurant',
          route: '/data/restaurant'
        },
        // 관광 (포르투, 리스본?)
        // 포르투 리스본 체크박스
        // {
        //   title: '카페',
        //   icon: 'local_cafe',
        //   route: '/data/cafe'
        // },
        // {
        //   title: '디저트',
        //   icon: 'cake',
        //   route: '/data/desert'
        // },
        {
          title: '와인 / 맥주',
          icon: 'local_bar',
          route: '/data/wine'
        },
        {
          title: '쇼핑',
          icon: 'shop',
          route: '/data/shopping'
        },
        {
          title: '액티비티',
          icon: 'local_activity',
          route: '/data/activity'
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      username: 'auth/getUsername'
    })
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
  },
  mounted () {
    console.log(firebase.auth().currentUser)
    // this.currentUser = firebase.auth().currentUser.displayName
    // console.log(this.currentUser)
  }
}
</script>

<style>

</style>
