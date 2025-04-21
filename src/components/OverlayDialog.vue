<script setup lang="ts">
import { useScrollLock } from '../composables/useScrollLock'
import { onMounted, ref, watch } from 'vue'

const props = withDefaults(defineProps<{
  open?: boolean
  closeOnClickOutside?: boolean
}>(), {
  open: false,
  closeOnClickOutside: false,
})

const emit = defineEmits<{
  'close': []
}>()

const dialogRef = ref<HTMLDialogElement | null>(null)

const isLocked = useScrollLock()

onMounted(() => {
  watch(() => props.open, (isOpened) => {
    isLocked.value = isOpened
    if (isOpened) {
      dialogRef.value?.showModal()
    } else {
      dialogRef.value?.close()
    }
  }, { immediate: true })
})

function close () {
  emit('close')
}

function handleClickDialog (event: Event) {
  if (!props.closeOnClickOutside) return
  if (event.target !== dialogRef.value) return
  close()
}
</script>

<template>
  <dialog
    ref="dialogRef"
    class="m-0 overflow-auto border-none p-0 outline-none backdrop:bg-neutral-900/50"
    @click="handleClickDialog"
    @close="close"
  >
    <div class="fixed right-0 top-0 h-full w-[1000px] max-w-full bg-gradient-to-l from-neutral-950/90 from-50% to-transparent">
      <div class="ml-auto h-full w-[700px] max-w-full">
        <slot />
      </div>
    </div>
  </dialog>
</template>
