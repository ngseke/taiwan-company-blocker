import { onUnmounted, ref, watch } from 'vue'

const singletonRegisteredTokens = ref(new Set<symbol>())

watch(singletonRegisteredTokens, (tokens) => {
  window.onbeforeunload = tokens.size
    ? () => {}
    : null
}, { immediate: true })

export function useBeforeUnload () {
  const token = Symbol('')
  const isRegisteredBeforeUnload = ref(false)

  function add (token: symbol) {
    const tokens = new Set(singletonRegisteredTokens.value)
    tokens.add(token)
    singletonRegisteredTokens.value = tokens
  }

  function remove (token: symbol) {
    const tokens = new Set(singletonRegisteredTokens.value)
    tokens.delete(token)
    singletonRegisteredTokens.value = tokens
  }

  watch(isRegisteredBeforeUnload, (value) => {
    if (value) {
      add(token)
    } else {
      remove(token)
    }
  }, { immediate: true })

  onUnmounted(() => {
    remove(token)
  })

  return {
    isRegisteredBeforeUnload,
  }
}
