<script setup lang="ts">
import Radio from '../../../components/Radio.vue'
import { useChromeStorage } from '../../../composables/useChromeStorage'
import { BLOCK_METHOD_KEY } from '../../../modules/storage'
import { type BlockMethod } from '../../content/modules/Blocker'
import Title from './Title.vue'

const blockMethod = useChromeStorage(BLOCK_METHOD_KEY)

const options: Array<{ label: string, value: BlockMethod }> = [
  { label: '淡化', value: 'opacity' },
  { label: '隱藏', value: 'hide' },
]
</script>

<template>
  <div class="flex flex-col gap-4">
    <Title>封鎖方式</Title>

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
