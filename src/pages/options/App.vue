<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { loadPatterns, savePatterns } from '../../modules/storage'
import { type PatternType, type Pattern } from '../../pages/content/modules/pattern'

const jobTitlePatternsDraft = ref<Pattern[] | null>(null)
const companyNamePatternsDraft = ref<Pattern[] | null>(null)

onMounted(async () => {
  jobTitlePatternsDraft.value = await loadPatterns('jobTitle')
  companyNamePatternsDraft.value = await loadPatterns('companyName')
})

function getTextareaValue (type: PatternType) {
  const draft = {
    jobTitle: jobTitlePatternsDraft.value,
    companyName: companyNamePatternsDraft.value,
  }[type]
  return draft?.map(({ pattern }) => pattern)?.join('\n') ?? ''
}

function handleTextareaValueChange (type: PatternType) {
  return function (event: Event) {
    const draftRef = ({
      jobTitle: jobTitlePatternsDraft,
      companyName: companyNamePatternsDraft,
    })[type]

    const newPatterns = (event.target as HTMLTextAreaElement)
      ?.value.split('\n')
      .map(pattern => ({ pattern }))

    draftRef.value = newPatterns
  }
}

watch(jobTitlePatternsDraft, async function save (newDraft, oldDraft) {
  if (!oldDraft || !newDraft) return
  await savePatterns('jobTitle', [...newDraft])
}, { deep: true })

watch(companyNamePatternsDraft, async function save (newDraft, oldDraft) {
  if (!oldDraft || !newDraft) return
  await savePatterns('companyName', [...newDraft])
}, { deep: true })
</script>

<template>
  <div :style="{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column', gap: '.25rem', maxWidth: '20rem' }">
    <h3>jobTitlePatterns</h3>
    <textarea
      cols="30"
      rows="5"
      :value="getTextareaValue('jobTitle')"
      @input="handleTextareaValueChange('jobTitle')($event)"
    />
    <h3>companyNamePatterns</h3>
    <textarea
      cols="30"
      rows="5"
      :value="getTextareaValue('companyName')"
      @input="handleTextareaValueChange('companyName')($event)"
    />
  </div>
</template>
