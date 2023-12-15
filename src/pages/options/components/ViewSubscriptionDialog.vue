<script setup lang="ts">
import Dialog from '../../../components/Dialog.vue'
import Button from '../../../components/Button.vue'
import { type SubscriptionResult, type Subscription } from '../../../modules/Subscription'
import { type Nullish } from '../../../types/Nullish'
import { computed } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import Editor from '../../../components/Editor.vue'

const props = defineProps<{
  subscription: Nullish<Subscription>
  result: Nullish<SubscriptionResult>
}>()

const emit = defineEmits<{
  close: []
  remove: []
}>()

function close () {
  emit('close')
}

function remove () {
  emit('remove')
  emit('close')
}

const url = computed(() => props.subscription?.url)

const resultRules = computed(() => {
  if (props.result?.status !== 'success') return
  return props.result.rules
})

const resultError = computed(() => {
  if (props.result?.status !== 'error') return
  return props.result.error
})

</script>

<template>
  <Dialog
    closeOnClickOutside
    :open="Boolean(subscription)"
    width="500px"
    @close="close"
  >
    <div class="flex flex-col gap-4">
      <div class="truncate text-base font-medium">{{ subscription?.name }}</div>

      <div class="flex flex-col gap-4">
        <div class="leading-none">
          <a class="break-all text-xs" :href="url" target="_blank">{{ url }}</a>
        </div>

        <Editor
          v-if="resultRules != null"
          disabled
          :height="300"
          :modelValue="resultRules"
        />

        <div v-if="resultError != null">
          <FontAwesomeIcon :icon="faTriangleExclamation" />
          載入失敗 ({{ resultError }})
        </div>
      </div>

      <div class="flex justify-between gap-2">
        <Button @click="remove">移除訂閱</Button>
        <Button color="primary" @click="close">關閉</Button>
      </div>
    </div>
  </Dialog>
</template>
