<script setup lang="ts">
import { faCheck, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { type SubmitResult } from '../../../types/SubmitResult'
import { type Nullish } from '../../../types/Nullish'

defineProps<{
  value?: Nullish<SubmitResult>
}>()
</script>

<template>
  <Transition enterFromClass="opacity-0">
    <div v-if="value" class="text-xs duration-150">
      <FontAwesomeIcon
        v-if="value.type === 'success'"
        :icon="faCheck"
      />
      <FontAwesomeIcon
        v-if="value.type === 'error'"
        :icon="faTriangleExclamation"
      />
      {{ value.message }}
    </div>
  </Transition>
</template>
