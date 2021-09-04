export default function ({ $axios }) {
  $axios.onRequest((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
  })
}
