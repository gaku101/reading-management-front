<template>
  <div class="grid grid-cols-12 h-screen">
    <div class="col-start-2 col-span-10">
      <div class="text-2xl">Following</div>
      <div class="flex flex-wrap justify-around mx-4 my-8">
        <NuxtLink
          v-for="user in users"
          :key="user.id"
          :to="`user/${user.username}`"
          class="sm:w-1/4 md:w-1/4 xl:w-1/4 hover:opacity-50"
        >
          <ProfileImage :url="user.image" class="w-32 h-32 mx-auto" />
          <div class="mx-auto text-center mt-2 text-lg">
            {{ user.username }}
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'

export default defineComponent({
  name: 'Following',
  setup(_, { root }) {
    const pageId = 1
    const pageSize = 30
    const users = ref<UserState[]>()
    const listFollowingUsers = async () => {
      try {
        const { data } = await root.$axios.get(
          `/api/follow?page_id=${pageId}&page_size=${pageSize}`
        )
        users.value = data
        console.log('listFollowingUsers', users.value)
      } catch (e) {
        console.error(e)
      }
    }
    listFollowingUsers()
    return {
      users,
    }
  },
})
</script>
