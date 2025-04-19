<script setup lang="ts">
import Card from '../components/Card.vue'
import About from '../components/About.vue'
import { OPTIONS_TEST_IDS } from '../../../modules/constants'
</script>

<template>
  <section
    class="flex w-full flex-col gap-4"
    :data-testid="OPTIONS_TEST_IDS.sectionAbout"
  >
    <Card>
      <About />
    </Card>
  </section>
</template>
