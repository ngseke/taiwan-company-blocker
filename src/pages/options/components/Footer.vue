<script setup lang="ts">
const links = [
  {
    title: '問題回報',
    url: 'https://github.com/ngseke/taiwan-company-blocker/issues',
  },
  {
    title: 'GitHub',
    url: 'https://github.com/ngseke/taiwan-company-blocker',
  },
  {
    title: 'Chrome Web Store',
    url: 'https://chromewebstore.google.com/detail/hmkkfmjfinbllbbkgabkeponkhckmijk',
  },
]
</script>

<template>
  <footer>
    <ul class="-mx-2 flex divide-x divide-neutral-700">
      <li
        v-for="{ title, url } in links"
        :key="title"
        class="px-2"
      >
        <a class="hover:underline" :href="url" target="_blank">{{ title }}</a>
      </li>
    </ul>
  </footer>
</template>
