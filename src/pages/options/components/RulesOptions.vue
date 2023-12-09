<script setup lang="ts">
import { ref, watch } from 'vue'
import Textarea from '../../../components/Textarea.vue'
import { loadRules, saveRules } from '../../../modules/storage'
import InstructionArticle from './InstructionArticle.vue'
import Title from './Title.vue'
import Button from '../../../components/Button.vue'
import { useBeforeUnload } from '../../popup/composables/useBeforeUnload'
import { syncRef } from '@vueuse/core'

const jobTitleRulesDraft = ref<string | null>(null)
const companyNameRulesDraft = ref<string | null>(null)

async function initializeDrafts () {
  jobTitleRulesDraft.value = await loadRules('jobTitle')
  companyNameRulesDraft.value = await loadRules('companyName')

  watch([jobTitleRulesDraft, companyNameRulesDraft], () => {
    isDirty.value = true
  })
}

initializeDrafts()

const isDirty = ref(false)

async function submit () {
  if (jobTitleRulesDraft.value != null) {
    await saveRules('jobTitle', jobTitleRulesDraft.value)
  }
  if (companyNameRulesDraft.value != null) {
    await saveRules('companyName', companyNameRulesDraft.value)
  }
  await initializeDrafts()
  isDirty.value = false
}

const { isRegisteredBeforeUnload } = useBeforeUnload()

syncRef(isRegisteredBeforeUnload, isDirty, {})
</script>

<template>
  <div class="flex flex-col gap-4">
    <Title>職缺名稱</Title>
    <Textarea
      v-if="jobTitleRulesDraft != null"
      v-model="jobTitleRulesDraft"
      label="規則"
      :rows="10"
    />
    <Title>公司名稱</Title>
    <Textarea
      v-if="companyNameRulesDraft != null"
      v-model="companyNameRulesDraft"
      label="規則"
      :rows="10"
    />

    <div
      class="
      sticky bottom-0 -my-4 flex justify-end bg-neutral-900 py-4 before:absolute
      before:-top-2 before:left-0 before:h-2 before:w-full before:bg-gradient-to-t before:from-neutral-900 before:to-transparent before:content-['']"
    >
      <Button color="primary" :disabled="!isDirty" @click="submit">
        儲存
      </Button>
    </div>

    <hr class="border-neutral-800">

    <InstructionArticle />
  </div>
</template>
