<template>
  <div class="grid grid-cols-12">
    <div v-if="notes" class="col-start-2 col-span-10 mt-8">
      <div class="text-xl text-center py-2">Notes</div>
      <hr />
      <template v-if="isAuthor">
        <textarea
          rows="3"
          class="block w-full bg-gray mt-8 leading-9 text-lg"
          placeholder="Write note here..."
          v-model="note"
        ></textarea>
        <div class="flex place-items-center mt-2">
          <div>
            <input
              v-model="page"
              class="
                border-2 border-gray-300
                bg-white
                h-10
                pr-2
                rounded-lg
                text-sm
                focus:outline-none
                text-right
              "
              size="5"
              name="page"
              placeholder="page"
              type="text"
              inputmode="numeric"
              @click="removeZero"
            />
            <span class="ml-1">ページ</span>
            <input
              v-model="line"
              class="
                border-2 border-gray-300
                bg-white
                h-10
                ml-4
                pr-2
                rounded-lg
                text-sm
                focus:outline-none
                text-right
              "
              size="5"
              name="line"
              placeholder="line"
              type="text"
              inputmode="numeric"
              @click="removeZero"
            />
            <span class="ml-1">行</span>
          </div>
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
              focus:ring-2
              focus:ring-offset-2
              focus:ring-red-500
              sm:w-auto sm:text-sm
              ml-auto
            "
            :disabled="createValidation"
            @click="createNote"
          >
            Send
          </button>
        </div>
      </template>
      <span class="text-red-400 text-xs"
        >{{ notePageValidation }}&nbsp;&nbsp;</span
      >
      <span class="text-red-400 text-xs">{{ noteLineValidation }}</span>

      <div v-for="note in notes" :key="note.id">
        <textarea
          v-if="isEditing && note.id == selectedNote.id"
          rows="3"
          class="block w-full bg-gray mt-8 leading-9 text-lg"
          placeholder="Write body here..."
          v-model="selectedNote.body"
        ></textarea>
        <div
          v-else
          class="new-line leading-9 mt-8 text-lg"
          v-text="note.body"
        />
        <div class="place-items-center flex justify-between mt-2">
          <div v-if="isEditing && note.id == selectedNote.id">
            <input
              v-model="selectedNote.page"
              class="
                border-2 border-gray-300
                bg-white
                h-10
                pr-2
                rounded-lg
                text-sm
                focus:outline-none
                text-right
              "
              size="5"
              name="page"
              placeholder="page"
              type="text"
              inputmode="numeric"
              @click="removeZero"
            />
            <span class="ml-1">ページ</span>
            <input
              v-model="selectedNote.line"
              class="
                border-2 border-gray-300
                bg-white
                h-10
                ml-4
                pr-2
                rounded-lg
                text-sm
                focus:outline-none
                text-right
              "
              size="5"
              name="line"
              placeholder="line"
              type="text"
              inputmode="numeric"
              @click="removeZero"
            />
            <span class="ml-1">行</span>
          </div>
          <div v-else-if="note.page" class="flex text-lg">
            <div>
              <span class="text-blue-600">{{ note.page }}</span
              >&nbsp;ページ&nbsp;
            </div>
            <span class="text-gray-400">/&nbsp;</span>
            <div>
              <span class="text-blue-500">{{ note.line }}</span
              >&nbsp;行目
            </div>
          </div>
          <div v-else />

          <div
            v-if="isEditing && note.id == selectedNote.id"
            class="flex ml-auto"
          >
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
                focus:ring-2
                focus:ring-offset-2
                focus:ring-indigo-500
                sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm
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
                focus:ring-2
                focus:ring-offset-2
                focus:ring-red-500
                sm:ml-3 sm:w-auto sm:text-sm
              "
              :disabled="updateValidation"
              @click="updateNote"
            >
              Update
            </button>
          </div>
          <div v-else class="flex">
            <template v-if="isAuthor">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 inline-block text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                @click="openEditor(note)"
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
                class="h-6 w-6 inline-block ml-4 text-gray-500"
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
            </template>
          </div>
        </div>
        <div v-if="isEditing && note.id == selectedNote.id">
          <span class="text-red-400 text-xs"
            >{{ notePageUpdateValidation }}&nbsp;&nbsp;</span
          >
          <span class="text-red-400 text-xs">{{
            noteLineUpdateValidation
          }}</span>
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
import {
  computed,
  defineComponent,
  reactive,
  ref,
  useContext,
  watch,
} from '@nuxtjs/composition-api'
import { removeZero } from '~/utils/useNumber'
import useValidationRules from '@/utils/useValidation'

export default defineComponent({
  name: 'Notes',
  setup() {
    const { params, $axios, store } = useContext()
    const user = computed(() => store.getters['user/user'])
    const isEditing = ref(false)
    const openEditor = (note: any) => {
      Object.assign(selectedNote, note)
      isEditing.value = true
    }
    const cancelEditing = () => {
      isEditing.value = false
    }
    const notes = ref()
    const postId = parseInt(params.value.postId)
    const pageId = 1
    const pageSize = 30
    const listNotes = async () => {
      try {
        const { data } = await $axios.get(
          `/api/notes/${postId}?page_id=${pageId}&page_size=${pageSize}`
        )
        console.log('listNotes', data)
        notes.value = data
      } catch (e) {
        console.error(e)
      }
    }
    listNotes()
    const getPost = async () => {
      try {
        const { data } = await $axios.get(`/api/posts/${postId}`)
        author.value = data.post.author
      } catch (e) {
        console.error(e)
      }
    }
    getPost()
    const author = ref('')
    const isAuthor = computed(() => {
      return user.value.username === author.value
    })
    const isOpenedConfirm = ref(false)
    const selectedNote = reactive({ id: 0, body: '', page: '', line: '' })
    const selectedNoteId = ref(0)
    const openConfirm = (id: number) => {
      selectedNoteId.value = id
      isOpenedConfirm.value = true
    }
    const note = ref()
    const updateNote = async () => {
      try {
        const { data } = await $axios.put('/api/notes', {
          id: selectedNote.id,
          body: selectedNote.body,
          page: parseInt(selectedNote.page),
          line: parseInt(selectedNote.line),
        })
        console.log('updateNote', data)
        isEditing.value = false
        notes.value.forEach((note: any) => {
          if (note.id === selectedNote.id) {
            Object.assign(note, selectedNote)
          }
        })
      } catch (e) {
        console.error(e)
      }
    }
    const deleteNote = async () => {
      try {
        await $axios.delete(`/api/notes/${selectedNoteId.value}`)
        notes.value = notes.value.filter(
          (note: any) => note.id !== selectedNoteId.value
        )
        selectedNoteId.value = 0
        isOpenedConfirm.value = false
      } catch (e) {
        console.error(e)
      }
    }
    const page = ref()
    const line = ref()
    const createNote = async () => {
      try {
        const { data } = await $axios.post('/api/notes', {
          postId,
          body: note.value,
          page: parseInt(page.value),
          line: parseInt(page.value),
        })
        console.log('createComment', data)
        note.value = ''
        page.value = ''
        line.value = ''
        listNotes()
      } catch (e) {
        console.error(e)
      }
    }
    const { notePageRules, noteLineRules } = useValidationRules()
    const notePageValidation = ref('')
    const noteLineValidation = ref('')
    const notePageUpdateValidation = ref('')
    const noteLineUpdateValidation = ref('')
    const validation = ref(false)
    watch(
      () => page.value,
      (v: number) => {
        validation.value = notePageRules(String(v), notePageValidation)
        if (!v) notePageValidation.value = ''
      }
    )
    watch(
      () => line.value,
      (v: number) => {
        validation.value = noteLineRules(String(v), noteLineValidation)
        if (!v) noteLineValidation.value = ''
      }
    )
    watch(
      () => selectedNote.page,
      (v: string) => {
        validation.value = notePageRules(String(v), notePageUpdateValidation)
        if (!v) notePageUpdateValidation.value = ''
      }
    )
    watch(
      () => selectedNote.line,
      (v: string) => {
        validation.value = noteLineRules(String(v), noteLineUpdateValidation)
        if (!v) noteLineUpdateValidation.value = ''
      }
    )
    const createValidation = computed(() => {
      if (!note.value) {
        console.log('some userInfo not set')
        return true
      } else if ((page.value || line.value) && !validation.value) {
        console.log('passed validation')
        return true
      } else if (notePageValidation.value || notePageValidation.value) {
        return true
      } else if (!page.value && line.value) {
        return true
      } else {
        return false
      }
    })
    const updateValidation = computed(() => {
      if (!selectedNote.body) {
        console.log('some userInfo not set')
        return true
      } else if (
        (selectedNote.page || selectedNote.line) &&
        !validation.value
      ) {
        console.log('passed validation')
        return true
      } else if (
        notePageUpdateValidation.value ||
        noteLineUpdateValidation.value
      ) {
        return true
      } else if (!selectedNote.page && selectedNote.line) {
        return true
      } else {
        return false
      }
    })

    return {
      notes,
      isEditing,
      openEditor,
      cancelEditing,
      isOpenedConfirm,
      openConfirm,
      updateNote,
      deleteNote,
      createNote,
      note,
      selectedNote,
      page,
      line,
      removeZero,
      notePageValidation,
      noteLineValidation,
      notePageUpdateValidation,
      noteLineUpdateValidation,
      createValidation,
      updateValidation,
      isAuthor,
    }
  },
})
</script>
