<script setup lang="ts">
import Card from './components/Card.vue'
import BlockMethodOptions from './components/BlockMethodOptions.vue'
import Header from './components/Header.vue'
import EnableOptions from './components/EnableOptions.vue'
import RulesOptions from './components/RulesOptions.vue'
import SubscriptionOptions from './components/SubscriptionOptions.vue'
import VersionUpdatedAlert from './components/VersionUpdatedAlert.vue'
import Sidebar from './components/Sidebar.vue'
import { ref } from 'vue'
import About from './components/About.vue'

const list = [
  { label: '設定', value: 'setting' },
  { label: '關於', value: 'about' },
]
const current = ref(list[0].value)
</script>

<template>
  <div class="container flex max-w-5xl flex-wrap gap-x-8 gap-y-4 px-4">
    <div class="top-0 flex h-full flex-1 flex-col gap-4 pt-2 lg:sticky lg:py-8">
      <Header />
      <Sidebar v-model="current" :list="list" />
    </div>

    <div class="w-full pb-8 lg:w-9/12 lg:py-12">
      <div v-show="current === 'setting'" class="flex w-full flex-col gap-4">
        <VersionUpdatedAlert />

        <Card>
          <EnableOptions />
        </Card>

        <Card>
          <RulesOptions />
        </Card>

        <Card>
          <SubscriptionOptions />
        </Card>

        <Card>
          <BlockMethodOptions />
        </Card>
      </div>

      <div v-show="current === 'about'" class="flex w-full flex-col gap-4">
        <Card>
          <About />
        </Card>
      </div>
    </div>
  </div>
</template>
