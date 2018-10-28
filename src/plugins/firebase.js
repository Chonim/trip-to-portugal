import firebase from 'firebase/app'
import 'firebase/auth'
import CONFIG from '@/config'

const config = {
  apiKey: CONFIG.FIREBASE_API_KEY,
  authDomain: 'trip-to-portugal.firebaseapp.com',
  databaseURL: 'https://trip-to-portugal.firebaseio.com',
  projectId: 'trip-to-portugal',
  storageBucket: 'gs://trip-to-portugal.appspot.com'
}
firebase.initializeApp(config)
console.log(firebase)

export default firebase
