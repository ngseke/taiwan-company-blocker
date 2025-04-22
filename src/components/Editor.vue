<script setup lang="ts">
import { computed } from 'vue'
import { Codemirror } from 'vue-codemirror'
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
  height: 300,
})

defineEmits<{
  'update:modelValue': [value: string]
}>()

const extensions = computed(() => [
  rulesLanguage,
  codeMirrorTheme,
  ...(props.lineWrapping ? [EditorView.lineWrapping] : []),
])
</script>

<template>
  <Codemirror
    :disabled="disabled"
    :extensions="extensions"
    :indentWithTab="false"
    :modelValue="modelValue ?? undefined"
    :style="{ height: typeof height === 'string' ? height : `${height}px` }"
    @update:modelValue="$emit('update:modelValue', $event)"
  />
</template>
