<script setup lang="ts">
import { useScrollLock } from '../composables/useScrollLock'
import { onMounted, ref, watch } from 'vue'

const props = withDefaults(defineProps<{
  width?: string
  open?: boolean
}>(), {
  width: '420px',
  open: false,
})

defineEmits<{
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
</script>

<template>
  <dialog
    ref="dialogRef"
    class="overflow-visible bg-transparent p-0 backdrop:bg-neutral-900/80 backdrop:backdrop-blur-[1px]"
    @close="$emit('close')"
  >
    <div
      class="max-w-full rounded-xl bg-neutral-900 p-5 text-neutral-300 shadow-2xl"
      :style="{ width }"
    >
      <slot />
    </div>
  </dialog>
</template>
