<script setup lang="ts">
import { formatPlatformName, platformHosts, platformNames } from '../../content/modules/platform'
</script>

<template>
  <article class="space-y-2">
    <p>
      目前支援平台：
      <template v-for="(name, index) in platformNames" :key="name">
        <a
          class="underline"
          :href="`https://${platformHosts[name]}`"
          target="_blank"
        >
          {{ formatPlatformName(name) }}
        </a>
        <span v-if="index !== platformNames.length - 1">、</span>
      </template>
    </p>
  </article>
</template>
