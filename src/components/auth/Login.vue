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
    console.log(firebaseui.auth.AuthUI)
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
    if (!window.firebaseAuthUi) {
      window.firebaseAuthUi = new firebaseui.auth.AuthUI(firebase.auth())
    }
    // The start method will wait until the DOM is loaded.
    window.firebaseAuthUi.start('#firebaseui-auth-container', uiConfig)
  }
}
</script>

<style lang="scss" scoped>
</style>
