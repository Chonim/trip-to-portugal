export default {
  getList (ref, keyField, equalToVal) {
    return ref.orderByChild(keyField).equalTo(equalToVal).once('value')
  },
  pushData (ref, payload) {
    return ref.push().set(payload)
  }
}
