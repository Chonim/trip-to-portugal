import Vue from 'vue'
import VueFire from 'vuefire'
import firebaseApp from './firebase'
import 'firebase/database'

Vue.use(VueFire)

const db = firebaseApp.database()
const firebase = {
  anArray: db.ref('data')
}
console.log(db)
console.log(firebase)

export default firebase
