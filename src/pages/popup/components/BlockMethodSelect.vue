<script setup lang="ts">
import { computed } from 'vue'
import { useChromeStorage } from '../../../composables/useChromeStorage'
import { blockMethods, formatBlockMethod } from '../../../modules/BlockMethod'
import { BLOCK_METHOD_KEY } from '../../../modules/storage'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const blockMethodOptions = computed(() => blockMethods.map((value) => ({
  label: formatBlockMethod(value),
  value,
})))

const blockMethod = useChromeStorage(BLOCK_METHOD_KEY)
</script>

<template>
  <label class="group relative select-none">
    <span class="inline-flex items-center gap-1">
      {{ formatBlockMethod(blockMethod) }}
      <FontAwesomeIcon class="text-sm" :icon="faChevronDown" />
    </span>
    <select
      v-model="blockMethod"
      class="absolute inset-0 cursor-pointer appearance-none  bg-transparent text-transparent"
    >
      <option
        v-for="{ value, label } in blockMethodOptions"
        :key="value"
        :value="value"
      >
        {{ label }}
      </option>
    </select>
  </label>
</template>
