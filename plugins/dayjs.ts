import { defineNuxtPlugin } from '@nuxtjs/composition-api'

import dayjs from 'dayjs'
import 'dayjs/locale/ja'
import utc from 'dayjs/plugin/utc'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
dayjs.locale('ja')
dayjs.extend(utc)
dayjs.extend(isSameOrBefore)

declare module 'vue/types/vue' {
  interface Vue {
    $dayjs: typeof dayjs
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $dayjs: typeof dayjs
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    $dayjs: typeof dayjs
  }
}

export default defineNuxtPlugin((_: any, inject: any) => {
  inject(
    'dayjs',
    (date?: string | number | dayjs.Dayjs | Date | undefined): dayjs.Dayjs => {
      return dayjs(date)
    }
  )
})
