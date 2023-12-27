<script setup lang="ts">
import { computed, ref } from 'vue'
import { Codemirror } from 'vue-codemirror'
import { useVModel } from '@vueuse/core'
import { EditorView } from '@codemirror/view'
import { rulesLanguage } from '../modules/codeMirror'
import { codeMirrorTheme } from '../modules/codeMirrorTheme'
import { type Nullish } from '../types/Nullish'

const props = withDefaults(defineProps<{
  modelValue: Nullish<string>
  disabled?: boolean
  height?: number | 'auto'
  lineWrapping?: boolean
}>(), {
  height: 350,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const extensions = computed(() => [
  rulesLanguage,
  codeMirrorTheme,
  ...(props.lineWrapping ? [EditorView.lineWrapping] : []),
])

const vModel = useVModel(props, 'modelValue', emit)

const codeMirrorRef = ref<InstanceType<typeof Codemirror> | null>(null)
async function handleReady () {
  await new Promise((resolve) => setTimeout(resolve, 0))
  codeMirrorRef.value?.$el.querySelector('.cm-scroller')?.scrollTo?.(0, 0)
}
</script>

<template>
  <Codemirror
    v-if="vModel != null"
    ref="codeMirrorRef"
    v-model="vModel"
    :disabled="disabled"
    :extensions="extensions"
    :style="{ height: typeof height === 'string' ? height : `${height}px` }"
    @ready="handleReady"
  />
</template>
