<script setup lang="ts">
import { useScrollLock } from '../composables/useScrollLock'
import { onMounted, ref, watch } from 'vue'

const props = withDefaults(defineProps<{
  width?: string
  open?: boolean
  closeOnClickOutside?: boolean
}>(), {
  width: '420px',
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
    class="max-h-full overflow-auto bg-transparent p-4 backdrop:bg-neutral-900/80 backdrop:backdrop-blur-[1px]"
    @click="handleClickDialog"
    @close="close"
  >
    <div
      class="max-h-full max-w-full rounded-xl bg-neutral-900 p-5 text-neutral-300 shadow-2xl"
      :style="{ width }"
    >
      <slot />
    </div>
  </dialog>
</template>
