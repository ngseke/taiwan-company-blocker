import { ref, watch } from 'vue'
import style from '../styles/scroll-lock.module.sass'

export function useScrollLock () {
  const isLocked = ref(false)

  watch(isLocked, (isLocked) => {
    if (isLocked) {
      document.body.classList.add(style.lock)
    } else {
      document.body.classList.remove(style.lock)
    }
  }, { immediate: true })

  return isLocked
}
