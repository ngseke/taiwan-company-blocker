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
import { OPTIONS_TEST_IDS } from '../../modules/constants'

const list = [
  { label: '設定', value: 'setting' },
  { label: '訂閱規則', value: 'subscription' },
  { label: '關於', value: 'about' },
]

const current = ref(list[0].value)
</script>

<template>
  <div class="container flex max-w-5xl flex-wrap gap-x-8 gap-y-4 px-4">
    <div class="top-0 flex h-full flex-1 flex-col gap-4 pt-2 lg:sticky lg:w-64 lg:flex-none lg:py-8">
      <Header />
      <Sidebar v-model="current" :list="list" />
    </div>

    <div class="w-full min-w-0 pb-8 lg:flex-1 lg:py-12">
      <section
        v-show="current === 'setting'"
        class="flex w-full flex-col gap-4"
        :data-testid="OPTIONS_TEST_IDS.sectionSetting"
      >
        <VersionUpdatedAlert />

        <Card>
          <EnableOptions />
        </Card>

        <Card>
          <BlockMethodOptions />
        </Card>

        <Card>
          <RulesOptions />
        </Card>
      </section>

      <section
        v-show="current === 'subscription'"
        class="flex w-full flex-col gap-4"
        :data-testid="OPTIONS_TEST_IDS.sectionSubscription"
      >
        <Card>
          <SubscriptionOptions />
        </Card>
      </section>

      <section
        v-show="current === 'about'"
        class="flex w-full flex-col gap-4"
        :data-testid="OPTIONS_TEST_IDS.sectionAbout"
      >
        <Card>
          <About />
        </Card>
      </section>
    </div>
  </div>
</template>
