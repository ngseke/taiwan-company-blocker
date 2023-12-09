<script setup lang="ts">
import { computed, ref } from 'vue'
import Button from '../../components/Button.vue'
import Input from '../../components/Input.vue'
import { CLICK_ITEM_ACTION } from './modules/emitter'
import { useEmitter } from './composables/useEmitter'
import Header from './components/Header.vue'
import { OPEN_OPTIONS_PAGE_MESSAGE_NAME } from '../../modules/constants'
import Checkbox from '../../components/Checkbox.vue'
import { appendRule } from '../../modules/storage'
import { type Nullish } from '../../types/Nullish'
import SearchLink from './components/SearchLink.vue'
import Dialog from '../../components/Dialog.vue'

const isOpened = ref(false)
function open () { isOpened.value = true }
function close () { isOpened.value = false }

const isJobTitleChecked = ref(false)
const isCompanyNameChecked = ref(false)

const jobTitle = ref<Nullish<string>>(null)
const companyName = ref<Nullish<string>>(null)

const jobTitleDraft = ref('')
const companyNameDraft = ref('')

useEmitter(CLICK_ITEM_ACTION, (payload) => {
  open()
  isJobTitleChecked.value = false
  isCompanyNameChecked.value = false

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
  if (isJobTitleChecked.value) {
    await appendRule('jobTitle', jobTitleDraft.value)
  }
  if (isCompanyNameChecked.value) {
    await appendRule('companyName', companyNameDraft.value)
  }
}

const isSubmitDisabled = computed(() => !(
  (isJobTitleChecked.value && jobTitleDraft.value.trim()) ||
  (isCompanyNameChecked.value && companyNameDraft.value.trim())
))

const searchSuffixes = ['PTT', '面試', '薪水']
</script>

<template>
  <div class="text-left font-sans text-sm tracking-wide">
    <Dialog :open="isOpened" @close="close">
      <div v-if="isOpened" class="flex flex-col gap-4">
        <Header />
        <div class="flex flex-col gap-4">
          <div class="flex items-center gap-2">
            <Checkbox v-model="isJobTitleChecked" />
            <Input v-model="jobTitleDraft" label="職缺名稱" />
          </div>
          <div class="flex items-center gap-2">
            <Checkbox v-model="isCompanyNameChecked" />
            <Input v-model="companyNameDraft" label="公司名稱" />
          </div>
        </div>

        <div class="flex flex-wrap items-center justify-end gap-2 pl-2">
          <button
            class="underline"
            href="#"
            type="button"
            @click="openOptions"
          >
            管理封鎖關鍵詞
          </button>
          <div class="flex-1" />
          <Button type="button" @click="close">取消</Button>
          <Button
            color="primary"
            :disabled="isSubmitDisabled"
            type="button"
            @click="submit"
          >
            封鎖
          </Button>
        </div>

        <hr class="border-neutral-800">

        <div class="flex flex-wrap gap-3">
          <span>搜尋公司：</span>
          <SearchLink
            :disabled="!companyName"
            :href="`https://www.google.com/search?q=${companyName}`"
          >
            Google
          </SearchLink>
          <SearchLink
            v-for="suffix in searchSuffixes"
            :key="suffix"
            :disabled="!companyName"
            :href="`https://www.google.com/search?q=${companyName} ${suffix}`"
          >
            {{ suffix }}
          </SearchLink>
        </div>
      </div>
    </Dialog>
  </div>
</template>
