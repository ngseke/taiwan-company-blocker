<script setup lang="ts">
import { computed, ref } from 'vue'
import Button from '../../components/Button.vue'
import Input from '../../components/Input.vue'
import { CLICK_ITEM_ACTION } from './modules/emitter'
import { useEmitter } from './composables/useEmitter'
import Header from './components/Header.vue'
import { OPEN_OPTIONS_PAGE_MESSAGE_NAME } from '../../modules/constants'
import Radio from '../../components/Radio.vue'
import { type Nullish } from '../../types/Nullish'
import Dialog from '../../components/Dialog.vue'
import SearchLinkSection from './components/SearchLinkSection.vue'
import { useMatchedRules } from './composables/useMatchedRules'
import MatchedRulesSection from './components/MatchedRulesSection.vue'
import { appendRule, removeRule, replaceRule } from '../../modules/ruleStorageAction'
import EditRuleDialog from './components/EditRuleDialog.vue'
import { type RuleType } from '../../modules/rule'

const isOpened = ref(false)
function open () { isOpened.value = true }
function close () { isOpened.value = false }

const type = ref<'job' | 'company' | null>(null)

const jobTitle = ref<Nullish<string>>(null)
const companyName = ref<Nullish<string>>(null)

const jobTitleDraft = ref('')
const companyNameDraft = ref('')

useEmitter(CLICK_ITEM_ACTION, (payload) => {
  open()
  type.value = null

  jobTitle.value = payload.jobTitle
  companyName.value = payload.companyName

  jobTitleDraft.value = payload.jobTitle ?? ''
  companyNameDraft.value = payload.companyName ?? ''
})

function openOptions () {
  chrome.runtime.sendMessage(OPEN_OPTIONS_PAGE_MESSAGE_NAME)
}

async function submit () {
  close()
  if (type.value === 'job') {
    await appendRule('jobTitle', jobTitleDraft.value)
  }
  if (type.value === 'company') {
    await appendRule('companyName', companyNameDraft.value)
  }
}

const isSubmitDisabled = computed(() => !(
  (type.value === 'job' && jobTitleDraft.value.trim()) ||
  (type.value === 'company' && companyNameDraft.value.trim())
))

const { matchedRules } = useMatchedRules({ companyName, jobTitle })

const editRuleDialogRef = ref<InstanceType<typeof EditRuleDialog> | null>(null)

async function handleEditRule (type: RuleType, rule: string) {
  try {
    const response = await editRuleDialogRef.value?.request(type, rule)
    if (!response) return

    if (response?.type === 'remove') {
      await removeRule(type, rule)
    } else if (response?.type === 'edit') {
      await replaceRule(type, rule, response.newRule)
    }
  } catch (err) {}
}
</script>

<template>
  <div class="text-left font-sans text-sm tracking-wide">
    <Dialog :open="isOpened" @close="close">
      <div v-if="isOpened" class="flex flex-col gap-4">
        <Header />
        <div class="flex flex-col gap-4">
          <div class="flex items-center gap-2">
            <Radio v-model="type" value="company" />
            <Input
              v-model="companyNameDraft"
              label="公司名稱"
              @focus="type = type || 'company'"
            />
          </div>
          <div class="flex items-center gap-2">
            <Radio v-model="type" value="job" />
            <Input
              v-model="jobTitleDraft"
              label="職缺名稱"
              @focus="type = type || 'job'"
            />
          </div>
        </div>

        <MatchedRulesSection
          :matchedRules="matchedRules"
          @edit="handleEditRule"
        />

        <div class="flex flex-wrap items-center justify-end gap-2">
          <button
            class="underline"
            href="#"
            type="button"
            @click="openOptions"
          >
            管理封鎖關鍵詞
          </button>

          <div class="flex-1" />

          <Button type="button" @click="close">關閉</Button>
          <Button
            color="primary"
            :disabled="isSubmitDisabled"
            type="button"
            @click="submit"
          >
            封鎖
          </Button>
        </div>

        <template v-if="companyName">
          <hr class="border-neutral-800">
          <SearchLinkSection :companyName="companyName" />
        </template>
      </div>
    </Dialog>
    <EditRuleDialog ref="editRuleDialogRef" />
  </div>
</template>
