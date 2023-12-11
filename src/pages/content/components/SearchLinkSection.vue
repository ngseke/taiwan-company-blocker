<script setup lang="ts">
import { type Nullish } from '../../../types/Nullish'
import SearchLink from './SearchLink.vue'

defineProps<{
  companyName?: Nullish<string>
}>()

const searchSuffixes = ['PTT', '面試', '薪水']
</script>

<template>
  <div v-if="companyName" class="flex flex-wrap gap-3">
    <span>搜尋公司：</span>
    <SearchLink
      :disabled="!companyName"
      :href="`https://www.google.com/search?q=${companyName}`"
    >
      Google
    </SearchLink>
    <SearchLink
      v-for="suffix in searchSuffixes"
      :key="suffix"
      :disabled="!companyName"
      :href="`https://www.google.com/search?q=${companyName} ${suffix}`"
    >
      {{ suffix }}
    </SearchLink>
  </div>
</template>
