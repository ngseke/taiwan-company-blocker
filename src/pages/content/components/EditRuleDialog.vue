<script setup lang="ts">
import { computed, ref } from 'vue'
import Dialog from '../../../components/Dialog.vue'
import Button from '../../../components/Button.vue'
import { type RuleType } from '../../../modules/rule'
import Editor from '../../../components/Editor.vue'

type Response = {
  type: 'remove'
} | {
  type: 'edit'
  newRule: string
}

const state = ref<{
  resolve: (response: Response) => void
  reject: () => void
} | null>(null)

const targetType = ref<RuleType>()
const ruleDraft = ref('')

const formattedTargetType = computed(() => targetType.value
  ? ({
      companyName: '公司名稱',
      jobTitle: '職缺名稱',
    })[targetType.value]
  : '')

async function request (type: RuleType, rule: string) {
  targetType.value = type
  ruleDraft.value = rule

  return await new Promise<Response>((resolve, reject) => {
    state.value = { resolve, reject }
  })
}

defineExpose({ request })

function remove () {
  state.value?.resolve({ type: 'remove' })
  state.value = null
}

function edit () {
  state.value?.resolve({
    type: 'edit',
    newRule: ruleDraft.value.replaceAll('\n', ' '),
  })
  state.value = null
}

function cancel () {
  state.value?.reject()
  state.value = null
}
</script>

<template>
  <Dialog closeOnClickOutside :open="Boolean(state)" @close="cancel">
    <div class="flex flex-col gap-4">
      <div class="text-base font-medium">編輯{{ formattedTargetType }}規則</div>
      <Editor
        v-model="ruleDraft"
        height="auto"
        lineWrapping
      />

      <div class="flex gap-2">
        <Button @click="remove">移除規則</Button>
        <div class="flex-1" />
        <Button @click="cancel">取消</Button>
        <Button color="primary" @click="edit">更新規則</Button>
      </div>
    </div>
  </Dialog>
</template>
