<script setup lang="ts">
import Code from './Code.vue'
</script>

<template>
  <article class="space-y-2">
    <p>
      可以使用萬用字元 <Code>*</Code> 來匹配零個或 N 個字元，例如：
    </p>
    <ol class="list-inside list-decimal">
      <li><Code>*海外實習*</Code> 會匹配到包含「<i>海外實習</i>」的項目</li>
      <li><Code>產品行銷專員</Code> 只會匹配到和「<i>產品行銷專員</i>」<strong>一字不差</strong>的項目</li>
    </ol>
    <p>
      使用正規表示式（regex）來建立更複雜的規則，例如：
    </p>
    <ol class="list-inside list-decimal">
      <li><Code>/(內|外)場/</Code> 會匹配到包含「<i>內場</i>」或「<i>外場</i>」的項目</li>
      <li><Code>/BACK(-?)END/i</Code> 會匹配到包含無論大小寫的「<i>Backend</i>」或「<i>Back-end</i>」的項目</li>
    </ol>
    <p>
      使用 <Code>#</Code> 在規則尾端加入註解，例如：<Code>某某有限公司 # 我沒興趣</Code>
    </p>
  </article>
</template>
