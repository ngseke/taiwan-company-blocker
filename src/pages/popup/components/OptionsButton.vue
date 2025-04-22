<script setup lang="ts">
import { faGear } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
</script>

<template>
  <button class="group px-2" title="設定" type="button">
    <div class="duration-500 group-hover:rotate-90">
      <FontAwesomeIcon :icon="faGear" />
    </div>
  </button>
</template>
