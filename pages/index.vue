<template>
  <div>
    <nav class="flex items-center justify-between mx-5 p-6">
      <div
        class="flex items-center flex-shrink-0 text-white bg-red-500 px-4 mr-6"
      >
        <span class="font-semibold text-xl tracking-tight">My Portfolio</span>
      </div>
      <div class="w-full block flex-grow flex items-center w-auto">
        <div class="text-sm flex-grow">
          <a class="inline-block hover:text-white mr-4"> Posts </a>
          <a
            href="#responsive-header"
            class="inline-block hover:text-white mr-4"
          >
            Account
          </a>
          <a class="inline-block hover:text-white"> Favorites </a>
        </div>
        <div>
          <span v-if="owner">Welcome {{ owner }}</span>
          <a
            v-else
            class="
              inline-block
              text-sm
              px-4
              py-2
              leading-none
              border
              rounded
              border-black
              hover:border-transparent
              hover:text-teal-500
              hover:bg-white
            "
            >SignIn</a
          >
        </div>
      </div>
    </nav>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'

export default defineComponent({
  name: 'SignIn',
  setup(_, { root }) {
    const owner = ref('')
    const getAccount = async () => {
      const { data } = await root.$axios.get('/api/accounts/1')
      console.log('res', data)
      if (data) {
        owner.value = data.owner
      }
    }
    getAccount()
    return {
      getAccount,
      owner,
    }
  },
})
</script>