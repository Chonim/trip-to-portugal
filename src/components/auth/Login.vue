<template>
  <div id="firebaseui-auth-container"></div>
</template>

<script>
import firebase from '@/plugins/firebase'
import * as firebaseui from 'firebaseui'

import 'firebaseui/dist/firebaseui.css'

export default {
  name: 'Login',
  mounted () {
    // const provider = new firebase.auth.GoogleAuthProvider()
    // firebase.auth().signInWithPopup(provider).then((result) => {
    //   // This gives you a Google Access Token. You can use it to access the Google API.
    //   // const token = result.credential.accessToken
    //   const user = result.user
    //   // console.log(token)
    //   console.log(user)
    //   this.$router.push('/accomodation')
    // }).catch((error) => {
    //   console.log(error)
    // })
    const uiConfig = {
      signInSuccessUrl: 'https://trip-to-portugal.firebaseapp.com/',
      signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.PhoneAuthProvider.PROVIDER_ID
      ],
      // tosUrl and privacyPolicyUrl accept either url string or a callback
      // function.
      // Terms of service url/callback.
      tosUrl: 'https://trip-to-portugal.firebaseapp.com/',
      // Privacy policy url/callback.
      privacyPolicyUrl: () => {
        window.location.assign('https://trip-to-portugal.firebaseapp.com/')
      }
    }

    // Initialize the FirebaseUI Widget using Firebase.
    const ui = new firebaseui.auth.AuthUI(firebase.auth())
    // The start method will wait until the DOM is loaded.
    ui.start('#firebaseui-auth-container', uiConfig)
  }
}
</script>

<style lang="scss" scoped>
</style>
