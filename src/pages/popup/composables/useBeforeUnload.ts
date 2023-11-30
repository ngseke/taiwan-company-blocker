import { defineStore } from 'pinia'
import { onUnmounted, reactive, ref, watch } from 'vue'

const useBeforeUnloadTokensStore = defineStore('beforeUnloadTokens', () => {
  const tokens = reactive(new Set<symbol>())

  watch(tokens, (tokens) => {
    window.onbeforeunload = tokens.size
      ? () => ''
      : null
  }, { immediate: true })

  function add (token: symbol) {
    tokens.add(token)
  }

  function remove (token: symbol) {
    tokens.delete(token)
  }

  return {
    add,
    remove,
  }
})

export function useBeforeUnload () {
  const store = useBeforeUnloadTokensStore()

  const token = Symbol('')
  const isRegisteredBeforeUnload = ref(false)

  watch(isRegisteredBeforeUnload, (value) => {
    if (value) {
      store.add(token)
    } else {
      store.remove(token)
    }
  }, { immediate: true })

  onUnmounted(() => {
    store.remove(token)
  })

  return {
    isRegisteredBeforeUnload,
  }
}
