import store from '@/store'

export const createPayload = (fields) => {
  const author = store.getters['auth/getUsername']
  const date = new Date().toLocaleDateString()
  const payload = {
    ...fields,
    author,
    date
  }
  return payload
}
