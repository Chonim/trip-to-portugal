import firebase from '@/plugins/firebase'

export default {
  signOut () {
    return firebase.auth().signOut()
  }
}
