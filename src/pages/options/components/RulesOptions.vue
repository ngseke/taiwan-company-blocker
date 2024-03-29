<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { loadRules, saveRules } from '../../../modules/storage'
import InstructionArticle from './InstructionArticle.vue'
import Title from './Title.vue'
import Button from '../../../components/Button.vue'
import { useBeforeUnload } from '../../popup/composables/useBeforeUnload'
import { syncRef } from '@vueuse/core'
import IllogicalRulesAlert from './IllogicalRulesAlert.vue'
import { checkHasIllogicalRule } from '../../../modules/rule'
import Editor from '../../../components/Editor.vue'

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

const hasIllogicalRules = computed(() => (
  jobTitleRulesDraft.value != null &&
  companyNameRulesDraft.value != null &&
  (
    checkHasIllogicalRule(jobTitleRulesDraft.value) ||
    checkHasIllogicalRule(companyNameRulesDraft.value)
  )
))
</script>

<template>
  <div class="flex flex-col gap-4">
    <Title>公司名稱</Title>
    <Editor v-model="companyNameRulesDraft" />
    <Title>職缺名稱</Title>
    <Editor v-model="jobTitleRulesDraft" />

    <div
      class="sticky bottom-0 -mx-6 -my-2 flex flex-col gap-4 bg-neutral-900 px-6 py-4 before:absolute
      before:-top-2 before:left-0 before:h-2 before:w-full before:bg-gradient-to-t before:from-neutral-900 before:to-transparent before:content-['']"
    >
      <IllogicalRulesAlert :show="hasIllogicalRules" />
      <div class="flex justify-end">
        <Button color="primary" :disabled="!isDirty" @click="submit">
          儲存
        </Button>
      </div>
    </div>

    <hr class="border-neutral-800">

    <InstructionArticle />
  </div>
</template>
