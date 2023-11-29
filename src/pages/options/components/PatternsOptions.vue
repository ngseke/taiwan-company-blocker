<script setup lang="ts">
import { computed, ref } from 'vue'
import Textarea from '../../../components/Textarea.vue'
import { useChromeStorage } from '../../../composables/useChromeStorage'
import { COMPANY_NAME_PATTERNS_STORAGE_KEY, JOB_TITLE_PATTERNS_STORAGE_KEY, loadPatterns } from '../../../modules/storage'
import { type Pattern, type PatternType } from '../../content/modules/pattern'
import InstructionArticle from './InstructionArticle.vue'
import Title from './Title.vue'
import Button from '../../../components/Button.vue'

const jobTitlePatternsDraft = ref<Pattern[] | null>(null)
const companyNamePatternsDraft = ref<Pattern[] | null>(null)
const jobTitlePatterns = useChromeStorage(JOB_TITLE_PATTERNS_STORAGE_KEY)
const companyNamePatterns = useChromeStorage(COMPANY_NAME_PATTERNS_STORAGE_KEY)

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

function submit () {
  if (jobTitlePatternsDraft.value) {
    jobTitlePatterns.value =
      jobTitlePatternsDraft.value?.filter(({ pattern }) => Boolean(pattern))
  }
  if (companyNamePatternsDraft.value) {
    companyNamePatterns.value =
      companyNamePatternsDraft.value.filter(({ pattern }) => Boolean(pattern))
  }
  isDirty.value = false
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <InstructionArticle />

    <hr class="border-neutral-800">

    <Title>職缺名稱</Title>
    <Textarea
      v-model="jobTitleRef"
      label="關鍵詞列表"
      :rows="10"
    />
    <Title>公司名稱</Title>
    <Textarea
      v-model="companyNameRef"
      label="關鍵詞列表"
      :rows="10"
    />

    <div class="flex justify-end">
      <Button color="primary" :disabled="!isDirty" @click="submit">
        儲存
      </Button>
    </div>
  </div>
</template>
