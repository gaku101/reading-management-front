<template>
  <div class="grid grid-cols-12">
    <div v-if="notes" class="col-start-2 col-span-10 mt-8">
      <div class="text-xl text-center py-2">Notes</div>
      <hr />
      <textarea
        rows="3"
        class="block w-full bg-gray mt-8 leading-9 text-lg"
        placeholder="Write note here..."
        v-model="note"
      ></textarea>
      <button
        type="button"
        class="
          block
          rounded-md
          border border-transparent
          shadow-sm
          px-4
          py-2
          bg-blue-500
          font-medium
          text-white
          hover:bg-blue-600
          focus:outline-none
          focus:ring-2 focus:ring-offset-2 focus:ring-red-500
          sm:w-auto
          sm:text-sm
          ml-auto
          mt-10
        "
        @click="createNote"
      >
        Send
      </button>
      <div v-for="note in notes" :key="note.id" class="grid grid-cols-10 flex">
        <div
          v-if="!isEditing"
          class="col-span-9 new-line leading-9 mt-8 text-lg"
          v-text="note.body"
        />
        <textarea
          v-else
          rows="3"
          class="col-span-10 block w-full bg-gray mt-8 leading-9 text-lg"
          placeholder="Write body here..."
          v-model="note.body"
        ></textarea>
        <div v-if="isEditing" class="col-span-10 my-6 flex ml-auto">
          <button
            type="button"
            class="
              mt-3
              w-full
              inline-flex
              justify-center
              rounded-md
              border border-gray-300
              shadow-sm
              px-4
              py-2
              bg-white
              text-base
              font-medium
              text-gray-700
              hover:bg-gray-50
              focus:outline-none
              focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
              sm:mt-0
              sm:ml-3
              sm:w-auto
              sm:text-sm
            "
            @click="cancelEditing"
          >
            Cancel
          </button>
          <button
            type="button"
            class="
              w-full
              inline-flex
              justify-center
              rounded-md
              border border-transparent
              shadow-sm
              px-4
              py-2
              bg-blue-500
              text-base
              font-medium
              text-white
              hover:bg-blue-600
              focus:outline-none
              focus:ring-2 focus:ring-offset-2 focus:ring-red-500
              sm:ml-3
              sm:w-auto
              sm:text-sm
            "
            @click="updateNote(note.id, note.body)"
          >
            Update
          </button>
        </div>
        <div v-if="!isEditing" class="col-span-1 flex justify-end self-end">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 inline-block mt-4 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            @click="openEditor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 inline-block mt-4 ml-4 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            @click="openConfirm(note.id)"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </div>
      </div>
    </div>
    <ConfirmDialog
      :is-opened="isOpenedConfirm"
      :cancel-action="() => (isOpenedConfirm = false)"
      :ok-action="deleteNote"
      >Are you sure you want to delete this note?</ConfirmDialog
    >
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from '@vue/composition-api'

export default defineComponent({
  name: 'Notes',
  setup(_, { root }) {
    const user = computed(() => root.$store.getters['user/user'])
    const isEditing = ref(false)
    const openEditor = () => {
      isEditing.value = true
    }
    const cancelEditing = () => {
      isEditing.value = false
    }
    const notes = ref()
    const postId = parseInt(root.$route.params.postId)
    const pageId = 1
    const pageSize = 30
    const listNotes = async () => {
      try {
        const { data } = await root.$axios.get(
          `/api/notes/${postId}?page_id=${pageId}&page_size=${pageSize}`
        )
        console.log('listNotes', data)
        notes.value = data
      } catch (e) {
        console.error(e)
      }
    }
    listNotes()
    const isLoginedUser = computed(
      () => user.value.username === notes.value!.author
    )
    const isOpenedConfirm = ref(false)
    const selectedNote = ref(0)
    const openConfirm = (id: number) => {
      selectedNote.value = id
      isOpenedConfirm.value = true
    }
    const note = ref('')
    const updateNote = async (id: number, body: string) => {
      try {
        const { data } = await root.$axios.put('/api/notes', {
          id,
          body,
          // page: page.value,
          // line: line.value,
        })
        console.log('updateNote', data)
        isEditing.value = false
      } catch (e) {
        console.error(e)
      }
    }
    const deleteNote = async () => {
      try {
        await root.$axios.delete(
          `/api/notes/${selectedNote.value}`
        )
        notes. value = notes.value.filter((note: any) => note.id !== selectedNote.value)
        selectedNote.value = 0
        isOpenedConfirm.value = false
      } catch (e) {
        console.error(e)
      }
    }
    const createNote = async () => {
      try {
        const { data } = await root.$axios.post('/api/notes', {
          postId,
          body: note.value,
        })
        console.log('createComment', data)
        note.value = ''
        listNotes()
      } catch (e) {
        console.error(e)
      }
    }
    return {
      notes,
      isEditing,
      openEditor,
      cancelEditing,
      isLoginedUser,
      isOpenedConfirm,
      openConfirm,
      updateNote,
      deleteNote,
      createNote,
      note,
    }
  },
})
</script>
