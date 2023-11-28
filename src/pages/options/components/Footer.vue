<script setup lang="ts">
const links = [
  {
    title: 'GitHub',
    url: 'https://github.com/ngseke/taiwan-company-blocker',
  },
  {
    title: 'Issues',
    url: 'https://github.com/ngseke/taiwan-company-blocker/issues',
  },
]
</script>

<template>
  <footer>
    <ul class="flex divide-x divide-neutral-700">
      <li
        v-for="{ title, url } in links"
        :key="title"
        class="px-2"
      >
        <a :href="url" target="_blank">{{ title }}</a>
      </li>
    </ul>
  </footer>
</template>
