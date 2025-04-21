<script setup lang="ts">
import { ref } from 'vue'
import OverlayDialog from '../../../components/OverlayDialog.vue'
import { useEmitter } from '../composables/useEmitter'
import { OPEN_SETTING } from '../modules/emitter'
import BlockMethodOptions from '../../options/components/BlockMethodOptions.vue'
import RulesOptions from '../../options/components/RulesOptions.vue'
import Card from '../../options/components/Card.vue'
import { faGear, faXmark } from '@fortawesome/free-solid-svg-icons'
import IconButton from '../../../components/IconButton.vue'
import EnableOptions from '../../options/components/EnableOptions.vue'
import { OPEN_OPTIONS_PAGE_MESSAGE_NAME } from '../../../modules/constants'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const isOpened = ref(false)
function open () { isOpened.value = true }
function close () { isOpened.value = false }

useEmitter(OPEN_SETTING, open)

function openOptions () {
  close()
  chrome.runtime.sendMessage(OPEN_OPTIONS_PAGE_MESSAGE_NAME)
}
</script>

<template>
  <OverlayDialog closeOnClickOutside :open="isOpened" @close="close">
    <Transition enterActiveClass="duration-150">
      <div v-if="isOpened" class="flex h-full gap-4">
        <div class="sticky top-0 flex flex-col gap-2 pl-4 pt-8">
          <IconButton
            class="h-12 w-12 text-2xl"
            :icon="faXmark"
            title="關閉"
            @click="close"
          />
        </div>
        <section
          class="flex w-full flex-col gap-4 overflow-auto pb-0 pl-0 pr-8 pt-8 text-neutral-300"
        >
          <Card>
            <EnableOptions isInContent />
          </Card>

          <Card>
            <BlockMethodOptions />
          </Card>

          <Card>
            <RulesOptions isInContent />
          </Card>

          <button class="flex w-full items-center gap-3 rounded-lg bg-neutral-900 p-6 font-medium shadow-2xl hover:brightness-125" type="button" @click="openOptions">
            <FontAwesomeIcon class="text-lg" :icon="faGear" />
            進階設定
          </button>

          <div class="mb-16" />
        </section>
      </div>
    </Transition>
  </OverlayDialog>
</template>
