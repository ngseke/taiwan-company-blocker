<script setup lang="ts">
import { computed, ref } from 'vue'
import Textarea from '../../../components/Textarea.vue'
import { loadPatterns, savePatterns } from '../../../modules/storage'
import { type Pattern, type PatternType } from '../../content/modules/pattern'
import InstructionArticle from './InstructionArticle.vue'
import Title from './Title.vue'
import Button from '../../../components/Button.vue'
import { useBeforeUnload } from '../../content/composables/useBeforeUnload'
import { syncRef } from '@vueuse/core'

const jobTitlePatternsDraft = ref<Pattern[] | null>(null)
const companyNamePatternsDraft = ref<Pattern[] | null>(null)

async function initializeDrafts () {
  jobTitlePatternsDraft.value = await loadPatterns('jobTitle')
  companyNamePatternsDraft.value = await loadPatterns('companyName')
}

initializeDrafts()

const isDirty = ref(false)

function getTextareaRef (type: PatternType) {
  const draftRef = ({
    jobTitle: jobTitlePatternsDraft,
    companyName: companyNamePatternsDraft,
  })[type]

  return computed({
    get () {
      return draftRef.value?.map(({ pattern }) => pattern)?.join('\n') ?? ''
    },
    set (value: string) {
      const newPatterns = value.split('\n')
        .map(pattern => pattern.trim())
        .map(pattern => ({ pattern }))

      draftRef.value = newPatterns
      isDirty.value = true
    },
  })
}

const jobTitleRef = getTextareaRef('jobTitle')
const companyNameRef = getTextareaRef('companyName')

async function submit () {
  if (jobTitlePatternsDraft.value) {
    await savePatterns(
      'jobTitle',
      jobTitlePatternsDraft.value?.filter(({ pattern }) => Boolean(pattern))
    )
  }
  if (companyNamePatternsDraft.value) {
    await savePatterns(
      'companyName',
      companyNamePatternsDraft.value.filter(({ pattern }) => Boolean(pattern))
    )
  }
  await initializeDrafts()
  isDirty.value = false
}

const { isRegisteredBeforeUnload } = useBeforeUnload()

syncRef(isRegisteredBeforeUnload, isDirty, {})
</script>

<template>
  <div class="flex flex-col gap-4">
    <Title>職缺名稱封鎖規則</Title>
    <Textarea
      v-model="jobTitleRef"
      label="規則"
      :rows="10"
    />
    <Title>公司名稱封鎖規則</Title>
    <Textarea
      v-model="companyNameRef"
      label="規則"
      :rows="10"
    />

    <div class="flex justify-end">
      <Button color="primary" :disabled="!isDirty" @click="submit">
        儲存
      </Button>
    </div>
    <hr class="border-neutral-800">

    <InstructionArticle />
  </div>
</template>
