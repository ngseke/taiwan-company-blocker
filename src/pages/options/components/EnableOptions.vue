<script setup lang="ts">
import Switch from '../../../components/Switch.vue'
import { useChromeStorage } from '../../../composables/useChromeStorage'
import { OPTIONS_TEST_IDS } from '../../../modules/constants'
import { ENABLED_STORAGE_KEY } from '../../../modules/storage'
import SupportPlatformArticle from './SupportPlatformArticle.vue'

defineProps<{
  isInContent?: boolean
}>()

const isEnabled = useChromeStorage(ENABLED_STORAGE_KEY)
</script>

<template>
  <div class="flex flex-col gap-4">
    <div>
      <Switch
        v-model="isEnabled"
        :data-testid="OPTIONS_TEST_IDS.enableSwitch"
      >
        啟用
      </Switch>
    </div>

    <SupportPlatformArticle v-if="!isInContent" />
  </div>
</template>
