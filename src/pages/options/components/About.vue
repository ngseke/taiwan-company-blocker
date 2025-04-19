<script setup lang="ts">
import Title from './Title.vue'

const version = `v${APP_VERSION}`

const homepage = 'https://taiwan-company-blocker.ngseke.me/'
const releases = 'https://github.com/ngseke/taiwan-company-blocker/releases'

const links = [
  {
    title: '官方網站',
    url: homepage,
  },
  {
    title: '版本記錄',
    url: releases,
  },
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
  <section class="flex flex-col gap-4">
    <div class="flex flex-col gap-0.5">
      <h1 class="text-2xl font-bold">
        <a class="hover:underline" :href="homepage" target="_blank">
          台灣求職網封鎖神器
        </a>
      </h1>

      <a
        class="mt-1 font-mono text-neutral-600 hover:underline"
        :href="releases"
        target="_blank"
      >
        {{ version }}
      </a>
    </div>

    <hr class="border-neutral-800">

    <Title>關於此擴充功能</Title>
    <p>
      這是啟發自 <i>uBlacklist</i> 的免費開源專案。若你在使用時遇到任何問題，請不吝來信至
      <a class="underline hover:text-red-500" href="mailto:ngseke@gmail.com">ngseke@gmail.com</a>
      與我聯繫，或是到
      <a class="underline hover:text-red-500" href="https://github.com/ngseke/taiwan-company-blocker/issues" target="_blank">GitHub</a>
      發送 Issue 回報，也歡迎有志之士提交
      <a class="underline hover:text-red-500" href="https://github.com/ngseke/taiwan-company-blocker/pulls" target="_blank">Pull Request</a>
      來貢獻程式碼。
    </p>

    <Title>隱私權聲明</Title>
    <p>
      《台灣求職網封鎖神器》不會收集任何你的個人資訊。
    </p>

    <Title>相關連結</Title>
    <ul class="-mx-2 flex divide-x divide-neutral-700">
      <li
        v-for="{ title, url } in links"
        :key="title"
        class="px-2"
      >
        <a class="hover:underline" :href="url" target="_blank">{{ title }}</a>
      </li>
    </ul>

    <p class="mt-4 text-xs">
      Made with 🍺 by
      <a
        class="font-mono underline hover:text-red-500"
        href="https://ngseke.me"
        target="_blank"
      >
        @ngseke
      </a>
    </p>
  </section>
</template>
