import Vue from 'vue'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'
import CONFIG from '@/config'
import store from '@/store'

const config = {
  apiKey: CONFIG.FIREBASE_API_KEY,
  authDomain: 'trip-to-portugal.firebaseapp.com',
  databaseURL: 'https://trip-to-portugal.firebaseio.com',
  projectId: 'trip-to-portugal',
  storageBucket: 'gs://trip-to-portugal.appspot.com'
}
firebase.initializeApp(config)
console.log(firebase)

firebase.auth().onAuthStateChanged((user) => {
  const { displayName, photoURL } = user
  console.log(user)
  store.dispatch('auth/changeUsername', displayName)
  store.dispatch('auth/changeUserPhoto', photoURL)
})

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  .then(() => {
    // Existing and future Auth states are now persisted in the current
    // session only. Closing the window would clear any existing state even
    // if a user forgets to sign out.
    // ...
    // New sign-in will be persisted with session persistence.
    // return firebase.auth().signInWithEmailAndPassword(email, password);
  })
  .catch((error) => {
    // Handle Errors here.
    console.log(error)
    // var errorCode = error.code;
    // var errorMessage = error.message;
  })

Vue.prototype.$firebase = firebase

export default firebase
