<template>
  <v-app id="app" dark>
  <!-- <v-app id="app"> -->
    <side-menu
      :is-open="isSideMenuOpen"
      @close="isSideMenuOpen = false"
    ></side-menu>
    <header class="app-header">
      <div class="header-title">
        <i class="material-icons"
          @click="isSideMenuOpen = true"
        >
          menu
        </i>
        <div>2019 Portugal</div>
        <div class="logout-button">
          <div
            v-show="$store.getters['auth/getUsername']"
            @click="signout()"
          >로그아웃</div>
        </div>
      </div>
    </header>
    <main>
      <v-content>
        <router-view></router-view>
      </v-content>
    </main>
  </v-app>
</template>

<script>
import firebase from '@/plugins/firebase'
import SideMenu from './components/SideMenu'

export default {
  name: 'app',
  components: {
    SideMenu
  },
  data () {
    return {
      isSideMenuOpen: false
    }
  },
  methods: {
    signout () {
      firebase.auth().signOut().then(() => {
        this.$store.dispatch('auth/changeUsername', '')
      })
    }
  }
}
</script>

<style lang="scss">
html, body {
  margin: 0;
  max-width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  height: auto;
}

div, h1, h2, h3, h4 {
  color: #fff;
}

h2 {
  margin-bottom: 16px;
}

a {
  text-decoration: none;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

main {
  text-align: center;
  height: 100%;
  /* padding-left: 10px;
  padding-right: 10px; */
  /* margin-top: 56px; */
}

.app-header {
  margin: 0;
  height: 56px;
  padding: 0 16px 0 24px;
  background-color: #FE0000;
  color: #ffffff;
  /* position: fixed; */
  width: 100%;
  z-index: 1;
  .header-title {
    height: 100%;
    display: flex;
    align-items: center;
    font-size: 20px;
    i {
      min-width: 2em;
    }
    .logout-button {
      width: 40%;
      text-align: right;
      font-size: 16px;
      font-weight: 600;
    }
  }
}

@font-face {
  font-family: 'Material Icons';
  font-style: normal;
  font-weight: 400;
  src: url(https://example.com/MaterialIcons-Regular.eot); /* For IE6-8 */
  src: local('Material Icons'),
    local('MaterialIcons-Regular')
}

.material-icons {
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  font-size: 24px;  /* Preferred icon size */
  display: inline-block;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;

  /* Support for all WebKit browsers. */
  -webkit-font-smoothing: antialiased;
  /* Support for Safari and Chrome. */
  text-rendering: optimizeLegibility;

  /* Support for Firefox. */
  -moz-osx-font-smoothing: grayscale;

  /* Support for IE. */
  font-feature-settings: 'liga';
}

</style>
