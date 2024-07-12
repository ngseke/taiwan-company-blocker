<script setup lang="ts">
const version = `v${APP_VERSION}`

const links = [
  {
    title: '版本記錄',
    url: 'https://github.com/ngseke/taiwan-company-blocker/releases',
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
        台灣求職網封鎖神器
      </h1>

      <span class="mt-1 font-mono text-neutral-600">
        {{ version }}
      </span>
    </div>

    <hr class="border-neutral-800">

    <h2 class="text-lg font-medium">關於此擴充功能</h2>
    <p>
      這是啟發自 <i>uBlacklist</i> 的免費開源專案。若你在使用時遇到任何問題，請不吝來信至
      <a class="underline hover:text-red-500" href="mailto:ngseke@gmail.com">ngseke@gmail.com</a>
      與我聯繫，或是到
      <a class="underline hover:text-red-500" href="https://github.com/ngseke/taiwan-company-blocker/issues" target="_blank">GitHub</a>
      發送 Issue 回報，也歡迎有志之士提交
      <a class="underline hover:text-red-500" href="https://github.com/ngseke/taiwan-company-blocker/pulls" target="_blank">Pull Request</a>
      來貢獻程式碼。
    </p>

    <h2 class="mt-4 text-lg font-medium">隱私權聲明</h2>
    <p>
      《台灣求職網封鎖神器》不會收集任何你的個人資訊。
    </p>

    <h2 class="mt-4 text-lg font-medium">相關連結</h2>
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
