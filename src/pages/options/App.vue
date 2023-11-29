<script setup lang="ts">
import { ENABLED_STORAGE_KEY } from '../../modules/storage'
import Card from './components/Card.vue'
import icon from '../../assets/img/icon.png'
import Switch from '../../components/Switch.vue'
import Footer from './components/Footer.vue'
import SupportPlatformArticle from './components/SupportPlatformArticle.vue'
import { useChromeStorage } from '../../composables/useChromeStorage'
import BlockMethodOptions from './components/BlockMethodOptions.vue'
import PatternsOptions from './components/PatternsOptions.vue'

const isEnabled = useChromeStorage(ENABLED_STORAGE_KEY)
</script>

<template>
  <div class="container max-w-2xl p-4">
    <div class="flex flex-col gap-4">
      <div class="flex flex-col items-center py-3">
        <div
          class="h-28 w-28 bg-contain bg-center bg-no-repeat duration-1000"
          :style="{ backgroundImage: `url(${icon})` }"
        />
        <h1 class="text-lg font-bold leading-6">
          Taiwan Company Blocker
        </h1>
      </div>

      <Card>
        <div class="flex flex-col gap-4">
          <div>
            <Switch v-if="isEnabled != null" v-model="isEnabled">
              啟用
            </Switch>
          </div>
          <SupportPlatformArticle />
        </div>
      </Card>

      <Card>
        <BlockMethodOptions />
      </Card>

      <Card>
        <PatternsOptions />
      </Card>

      <Card>
        <Footer />
      </Card>
    </div>
  </div>
</template>
