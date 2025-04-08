<script setup lang="ts">
import { computed, ref } from 'vue'
import Dialog from '../../../components/Dialog.vue'
import Input from '../../../components/Input.vue'
import Button from '../../../components/Button.vue'
import { validateUrl } from '../../../modules/validateUrl'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

interface Response {
  name: string
  url: string
}

const state = ref<{
  resolve: (response: Response) => void
  reject: () => void
} | null>(null)

async function requestAdd (name: string = '') {
  nameDraft.value = name
  urlDraft.value = 'https://'
  return await new Promise<Response>((resolve, reject) => {
    state.value = { resolve, reject }
  })
}

defineExpose({ requestAdd })

const nameDraft = ref('')
const urlDraft = ref('')

const shouldDisableButton = computed(() => (
  !nameDraft.value || !validateUrl(urlDraft.value)
))

function submit () {
  state.value?.resolve({
    name: nameDraft.value.trim(),
    url: urlDraft.value.trim(),
  })
  state.value = null
}

function cancel () {
  state.value?.reject()
  state.value = null
}
</script>

<template>
  <Dialog :open="Boolean(state)" @close="cancel">
    <div class="flex flex-col gap-4">
      <div class="text-base font-medium">新增訂閱</div>

      <div class="flex flex-col gap-4">
        <Input v-model="nameDraft" label="名稱" :maxLength="100" />
        <Input v-model="urlDraft" label="URL" />
      </div>

      <a
        class="block rounded-lg bg-neutral-800 p-3 py-2 text-neutral-200 duration-200"
        href="https://github.com/ngseke/company-list"
        target="_blank"
      >
        <FontAwesomeIcon :icon="faStar" />
        也可以查看由此擴充功能作者維護的<span class="underline">公司訂閱列表</span>，快速過濾如博弈、外包等特定產業。
      </a>

      <div class="flex justify-end gap-2">
        <Button @click="cancel">取消</Button>
        <Button
          color="primary"
          :disabled="shouldDisableButton"
          @click="submit"
        >
          儲存
        </Button>
      </div>
    </div>
  </Dialog>
</template>
