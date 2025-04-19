<script setup lang="ts">
import Header from './components/Header.vue'
import Sidebar from './components/Sidebar.vue'
import { RouterView } from 'vue-router'

const list = [
  { label: '設定', value: '/setting' },
  { label: '訂閱規則', value: '/subscription' },
  { label: '資料庫', value: '/database' },
  { label: '關於', value: '/about' },
]
</script>

<template>
  <div class="container flex max-w-5xl flex-wrap gap-x-8 gap-y-4 px-4">
    <div class="top-0 flex h-full flex-1 flex-col gap-4 pt-2 lg:sticky lg:w-64 lg:flex-none lg:py-8">
      <Header />
      <Sidebar :list="list" />
    </div>

    <div class="w-full min-w-0 pb-8 lg:flex-1 lg:py-12">
      <RouterView />
    </div>
  </div>
</template>
