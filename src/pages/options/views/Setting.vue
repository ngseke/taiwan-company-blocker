<script setup lang="ts">
import Card from '../components/Card.vue'
import BlockMethodOptions from '../components/BlockMethodOptions.vue'
import EnableOptions from '../components/EnableOptions.vue'
import RulesOptions from '../components/RulesOptions.vue'
import VersionUpdatedAlert from '../components/VersionUpdatedAlert.vue'
import { OPTIONS_TEST_IDS } from '../../../modules/constants'
</script>

<template>
  <section
    class="flex w-full flex-col gap-4"
    :data-testid="OPTIONS_TEST_IDS.sectionSetting"
  >
    <VersionUpdatedAlert />

    <Card>
      <EnableOptions />
    </Card>

    <Card>
      <BlockMethodOptions />
    </Card>

    <Card>
      <RulesOptions />
    </Card>
  </section>
</template>
