<script setup lang="ts">
import Card from './components/Card.vue'
import Footer from './components/Footer.vue'
import BlockMethodOptions from './components/BlockMethodOptions.vue'
import Header from './components/Header.vue'
import EnableOptions from './components/EnableOptions.vue'
import RulesOptions from './components/RulesOptions.vue'
import SubscriptionOptions from './components/SubscriptionOptions.vue'
import VersionUpdatedAlert from './components/VersionUpdatedAlert.vue'
</script>

<template>
  <div class="container flex max-w-5xl flex-wrap gap-x-8 gap-y-4 px-4">
    <div class="sticky top-0 h-full flex-1 py-8">
      <Header />
    </div>

    <div class="grid w-full gap-4 lg:w-9/12 lg:py-8">
      <VersionUpdatedAlert />

      <Card>
        <EnableOptions />
      </Card>

      <Card>
        <RulesOptions />
      </Card>

      <Card>
        <SubscriptionOptions />
      </Card>

      <Card>
        <BlockMethodOptions />
      </Card>

      <Card>
        <Footer />
      </Card>
    </div>
  </div>
</template>
