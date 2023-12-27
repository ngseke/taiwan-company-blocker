import { ref, watch } from 'vue'
import { useStyleTag } from '@vueuse/core'
import { nanoid } from 'nanoid'

export function useScrollLock () {
  const className = `scroll-lock-${nanoid()}`
  useStyleTag(`.${className} { overflow: hidden; }`)

  const isLocked = ref(false)

  watch(isLocked, (isLocked) => {
    if (isLocked) {
      document.body.classList.add(className)
    } else {
      document.body.classList.remove(className)
    }
  }, { immediate: true })

  return isLocked
}
