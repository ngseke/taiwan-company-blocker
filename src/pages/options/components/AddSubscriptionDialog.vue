<script setup lang="ts">
import { computed, ref } from 'vue'
import Dialog from '../../../components/Dialog.vue'
import Input from '../../../components/Input.vue'
import Button from '../../../components/Button.vue'
import { validateUrl } from '../../../modules/validateUrl'

interface Response {
  name: string
  url: string
}

const state = ref<{
  resolve: (response: Response) => void
  reject: () => void
} | null>(null)

async function requestAdd () {
  nameDraft.value = ''
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
