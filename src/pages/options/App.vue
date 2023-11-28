<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { ENABLED_STORAGE_KEY, loadPatterns, savePatterns } from '../../modules/storage'
import { type PatternType, type Pattern } from '../../pages/content/modules/pattern'
import Card from './components/Card.vue'
import icon from '../../assets/img/icon.png'
import Textarea from '../../components/Textarea.vue'
import Switch from '../../components/Switch.vue'
import Footer from './components/Footer.vue'
import { useChromeStorageListener } from '../../composables/useChromeStorageListener'
import { useWindowFocus } from '@vueuse/core'
import InstructionArticle from './components/InstructionArticle.vue'
import SupportPlatformArticle from './components/SupportPlatformArticle.vue'
import { useChromeStorage } from '../../composables/useChromeStorage'

const jobTitlePatternsDraft = ref<Pattern[] | null>(null)
const companyNamePatternsDraft = ref<Pattern[] | null>(null)

const isEnabled = useChromeStorage(ENABLED_STORAGE_KEY)
const isWindowFocused = useWindowFocus()
async function initializeDrafts () {
  jobTitlePatternsDraft.value = await loadPatterns('jobTitle')
  companyNamePatternsDraft.value = await loadPatterns('companyName')
}

useChromeStorageListener(() => {
  if (isWindowFocused.value) return
  initializeDrafts()
})
initializeDrafts()

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
    },
  })
}

const jobTitleRef = getTextareaRef('jobTitle')
const companyNameRef = getTextareaRef('companyName')

watch(jobTitlePatternsDraft, async function save (newDraft, oldDraft) {
  if (!oldDraft || !newDraft) return
  await savePatterns(
    'jobTitle',
    newDraft.filter(({ pattern }) => Boolean(pattern))
  )
}, { deep: true })

watch(companyNamePatternsDraft, async function save (newDraft, oldDraft) {
  if (!oldDraft || !newDraft) return
  await savePatterns(
    'companyName',
    newDraft.filter(({ pattern }) => Boolean(pattern))
  )
}, { deep: true })
</script>

<template>
  <div class="container max-w-2xl p-4">
    <div class="flex flex-col gap-4">
      <div class="flex flex-col items-center py-3">
        <div
          class="h-28 w-28 bg-contain bg-center bg-no-repeat duration-1000"
          :style="{ backgroundImage: `url(${icon})` }"
        />
        <h1 class="text-lg font-bold leading-6">
          Taiwan Company Blocker
        </h1>
      </div>

      <Card>
        <div class="flex flex-col gap-4">
          <div>
            <Switch v-if="isEnabled != null" v-model="isEnabled">
              啟用
            </Switch>
          </div>
          <SupportPlatformArticle />
        </div>
      </Card>

      <Card>
        <div class="flex flex-col gap-4">
          <InstructionArticle />

          <hr class="border-neutral-800">

          <h2 class="text-base font-medium">職缺名稱</h2>
          <Textarea
            v-model="jobTitleRef"
            label="關鍵詞列表"
            :rows="10"
          />
          <h2 class="text-base font-medium">公司名稱</h2>
          <Textarea
            v-model="companyNameRef"
            label="關鍵詞列表"
            :rows="10"
          />
        </div>
      </Card>

      <Card>
        <Footer />
      </Card>
    </div>
  </div>
</template>
