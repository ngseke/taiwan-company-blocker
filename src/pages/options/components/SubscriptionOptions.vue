<script setup lang="ts">
import { computed, ref } from 'vue'
import AddSubscriptionDialog from './AddSubscriptionDialog.vue'
import Title from './Title.vue'
import Button from '../../../components/Button.vue'
import { useChromeStorage } from '../../../composables/useChromeStorage'
import { SUBSCRIPTIONS_KEY, SUBSCRIPTION_RESULTS_KEY } from '../../../modules/storage'
import SubscriptionList from './SubscriptionList.vue'
import { updateSubscriptionResult, type Subscription } from '../../../modules/Subscription'
import { useChromeStorageListener } from '../../../composables/useChromeStorageListener'
import ViewSubscriptionDialog from './ViewSubscriptionDialog.vue'

const addSubscriptionDialog = ref<InstanceType<typeof AddSubscriptionDialog> | null>(null)

const subscriptions = useChromeStorage(SUBSCRIPTIONS_KEY)

async function create () {
  try {
    if (!addSubscriptionDialog.value || !subscriptions.value) return

    const newSubscription: Subscription = {
      ...(await addSubscriptionDialog.value?.requestAdd()),
      isEnabled: true,
    }

    subscriptions.value = [...subscriptions.value, newSubscription]
  } catch (err) {}
}

const subscriptionResults = useChromeStorage(SUBSCRIPTION_RESULTS_KEY)

const isUpdating = ref(false)

async function update () {
  isUpdating.value = true
  await updateSubscriptionResult()
  isUpdating.value = false
}

useChromeStorageListener(update, SUBSCRIPTIONS_KEY)

const activeSubscription = ref<Subscription | null>(null)

const activeSubscriptionResult = computed(() => (
  subscriptionResults.value?.[activeSubscription.value?.url ?? '']
))

function handleClickDetail (targetIndex: number) {
  activeSubscription.value = subscriptions.value
    ?.find((_, index) => index === targetIndex) ?? null
}

function removeActiveSubscription () {
  if (!subscriptions.value) return
  subscriptions.value = subscriptions.value?.filter(
    (subscription) => subscription !== activeSubscription.value
  )
}
</script>

<template>
  <AddSubscriptionDialog ref="addSubscriptionDialog" />
  <ViewSubscriptionDialog
    :result="activeSubscriptionResult"
    :subscription="activeSubscription"
    @close="activeSubscription = null"
    @remove="removeActiveSubscription"
  />

  <div class="flex flex-col gap-4">
    <Title>訂閱公司名稱規則</Title>
    <p>訂閱他人提供的規則列表，每天會自動從該 URL 抓取。</p>

    <SubscriptionList
      v-model="subscriptions"
      :subscriptionResults="subscriptionResults"
      @clickDetail="handleClickDetail"
    />

    <div class="flex gap-2">
      <Button color="primary" @click="create">
        新增訂閱
      </Button>
      <Button :disabled="isUpdating || !subscriptions?.length" @click="update">
        更新
      </Button>
    </div>
  </div>
</template>
