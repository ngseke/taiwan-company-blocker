<script setup lang="ts">
import { Codemirror } from 'vue-codemirror'
import { useVModel } from '@vueuse/core'
import { rulesLanguage } from '../modules/codeMirror'
import { codeMirrorTheme } from '../modules/codeMirrorTheme'
import { type Nullish } from '../types/Nullish'

const props = withDefaults(defineProps<{
  modelValue: Nullish<string>
  disabled?: boolean
  height?: number
}>(), {
  height: 350,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const extensions = [rulesLanguage, codeMirrorTheme]

const vModel = useVModel(props, 'modelValue', emit)
</script>

<template>
  <Codemirror
    v-if="vModel != null"
    v-model="vModel"
    :disabled="disabled"
    :extensions="extensions"
    :style="{ height: `${height}px` }"
  />
</template>
