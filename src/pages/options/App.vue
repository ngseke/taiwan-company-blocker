<script setup lang="ts">
import Card from './components/Card.vue'
import Footer from './components/Footer.vue'
import BlockMethodOptions from './components/BlockMethodOptions.vue'
import PatternsOptions from './components/PatternsOptions.vue'
import Header from './components/Header.vue'
import EnableOptions from './components/EnableOptions.vue'
</script>

<template>
  <div class="container max-w-2xl p-4">
    <div class="flex flex-col gap-4">
      <Header />

      <Card>
        <EnableOptions />
      </Card>

      <Card>
        <BlockMethodOptions />
      </Card>

      <Card>
        <PatternsOptions />
      </Card>

      <Card>
        <Footer />
      </Card>
    </div>
  </div>
</template>
