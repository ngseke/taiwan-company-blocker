<script setup lang="ts">
import { computed } from 'vue'
import Radio from '../../../components/Radio.vue'
import { useChromeStorage } from '../../../composables/useChromeStorage'
import { blockMethods, formatBlockMethod } from '../../../modules/BlockMethod'
import { BLOCK_METHOD_KEY } from '../../../modules/storage'

import Title from './Title.vue'

const blockMethod = useChromeStorage(BLOCK_METHOD_KEY)

const options = computed(() => blockMethods.map((value) => ({
  label: formatBlockMethod(value),
  value,
})))
</script>

<template>
  <div class="flex flex-col gap-4">
    <Title>封鎖模式</Title>

    <div class="flex gap-6">
      <Radio
        v-for="{ value, label } in options"
        :key="value"
        v-model="blockMethod"
        :value="value"
      >
        {{ label }}
      </Radio>
    </div>
  </div>
</template>
