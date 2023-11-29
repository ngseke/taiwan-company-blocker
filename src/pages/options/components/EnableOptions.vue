<script setup lang="ts">
import Switch from '../../../components/Switch.vue'
import { useChromeStorage } from '../../../composables/useChromeStorage'
import { ENABLED_STORAGE_KEY } from '../../../modules/storage'
import SupportPlatformArticle from './SupportPlatformArticle.vue'

const isEnabled = useChromeStorage(ENABLED_STORAGE_KEY)
</script>

<template>
  <div class="flex flex-col gap-4">
    <div>
      <Switch v-if="isEnabled != null" v-model="isEnabled">
        啟用
      </Switch>
    </div>
    <SupportPlatformArticle />
  </div>
</template>
