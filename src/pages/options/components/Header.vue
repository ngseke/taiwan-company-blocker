<script setup lang="ts">
import icon from '../../../assets/img/icon.png'
</script>

<template>
  <div class="flex flex-col items-center py-3">
    <div
      class="h-28 w-28 bg-contain bg-center bg-no-repeat duration-1000"
      :style="{ backgroundImage: `url(${icon})` }"
    />
    <h1 class="text-lg font-bold leading-6">
      Taiwan Company Blocker
    </h1>
  </div>
</template>
