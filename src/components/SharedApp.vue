<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { loadPlatforms, savePlatforms } from '../modules/storage'
import { type Platform, type PlatformName, platformNames, type Platforms } from '../pages/content/modules/platform'

const platformsDraft = ref<Platforms | null>(null)

onMounted(async () => {
  const platforms = await loadPlatforms()
  platformsDraft.value = platforms
  console.log(JSON.stringify(platforms, null, 2))
})

function getTextareaValue (platform: PlatformName, key: keyof Platform) {
  return platformsDraft.value?.[platform][key].join('\n') ?? ''
}

function handleTextareaValueChange (platform: PlatformName, key: keyof Platform) {
  return function (event: Event) {
    if (!platformsDraft.value) return

    const newPatterns = (event.target as HTMLTextAreaElement)
      ?.value.split('\n')

    platformsDraft.value[platform][key] = newPatterns
  }
}

async function save () {
  if (!platformsDraft.value) return
  await savePlatforms(platformsDraft.value)
}

watch(platformsDraft, (_, oldPlatformsDraft) => {
  if (!oldPlatformsDraft) return
  save()
}, { deep: true })

</script>

<template>
  <div :style="{ display: 'flex', flexWrap: 'wrap', gap: '.25rem' }">
    <div
      v-for="platformName in platformNames"
      :key="platformName"
      :style="{ border: 'solid 1px black', padding: '.25rem' }"
    >
      <h2>{{ platformName }}</h2>
      <h3>companyNamePatterns</h3>
      <textarea
        cols="30"
        rows="5"
        :value="getTextareaValue(platformName, 'companyNamePatterns')"
        @input="handleTextareaValueChange(platformName, 'companyNamePatterns')($event)"
      />
      <hr>
      <h3>jobTitlePatterns</h3>
      <textarea
        cols="30"
        rows="5"
        :value="getTextareaValue(platformName, 'jobTitlePatterns')"
        @input="handleTextareaValueChange(platformName, 'jobTitlePatterns')($event)"
      />
    </div>
  </div>
</template>
