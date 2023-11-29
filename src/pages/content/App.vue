<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useScrollLock } from '@vueuse/core'
import Button from '../../components/Button.vue'
import Input from '../../components/Input.vue'
import { CLICK_ITEM_ACTION } from './modules/emitter'
import { useEmitter } from './composables/useEmitter'
import Header from './components/Header.vue'
import { OPEN_OPTIONS_PAGE_MESSAGE_NAME } from '../../modules/constants'
import Checkbox from '../../components/Checkbox.vue'
import { appendPattern } from '../../modules/storage'

const dialogRef = ref<HTMLDialogElement | null>(null)
const isOpened = ref(false)

function open () {
  dialogRef.value?.showModal()
  isOpened.value = true
}

function close () {
  dialogRef.value?.close()
}

const isLocked = useScrollLock(document.body)
watch(isOpened, (isOpened) => { isLocked.value = isOpened })

const isJobTitleChecked = ref(false)
const isCompanyNameChecked = ref(false)
const jobTitleDraft = ref('')
const companyNameDraft = ref('')

useEmitter(CLICK_ITEM_ACTION, ({ jobTitle, companyName }) => {
  open()
  isJobTitleChecked.value = false
  isCompanyNameChecked.value = false
  jobTitleDraft.value = jobTitle ?? ''
  companyNameDraft.value = companyName ?? ''
})

function openOptions () {
  chrome.runtime.sendMessage(OPEN_OPTIONS_PAGE_MESSAGE_NAME)
}

async function submit () {
  close()
  if (isJobTitleChecked.value) {
    await appendPattern('jobTitle', { pattern: jobTitleDraft.value })
  }
  if (isCompanyNameChecked.value) {
    await appendPattern('companyName', { pattern: companyNameDraft.value })
  }
}

const isSubmitDisabled = computed(() => !(
  (isJobTitleChecked.value && jobTitleDraft.value.trim()) ||
  (isCompanyNameChecked.value && companyNameDraft.value.trim())
))
</script>

<template>
  <div class="text-left font-sans text-sm tracking-wide">
    <dialog
      ref="dialogRef"
      class="overflow-visible bg-transparent p-0 backdrop:bg-neutral-900/70 backdrop:backdrop-blur-[1px]"
      @close="isOpened = false"
    >
      <div v-if="isOpened" class="flex w-[420px] max-w-full flex-col gap-4 rounded-lg bg-neutral-900 p-4 text-neutral-300 shadow-2xl">
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
      </div>
    </dialog>
  </div>
</template>
