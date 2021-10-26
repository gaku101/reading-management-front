import { defineNuxtPlugin } from '@nuxtjs/composition-api'

export default defineNuxtPlugin(({ $axios }) => {
  $axios.onRequest((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
  })
})
