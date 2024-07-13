<script setup lang="ts">
import { faFileExport } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Button from '../../../components/Button.vue'

</script>

<template>
  <Button type="button">
    <div class="flex items-center gap-1.5">
      <FontAwesomeIcon :icon="faFileExport" />
      匯出
    </div>
  </Button>
</template>
