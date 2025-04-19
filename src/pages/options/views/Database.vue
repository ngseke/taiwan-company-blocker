<script setup lang="ts">
import Card from '../components/Card.vue'
import { OPTIONS_TEST_IDS } from '../../../modules/constants'
import Title from '../components/Title.vue'
import { faCheck, faCloudArrowDown, faDatabase, faRotate, faTriangleExclamation, faXmark } from '@fortawesome/free-solid-svg-icons'
import { useChromeStorage } from '../../../composables/useChromeStorage'
import { DATABASE_RESULT_KEY, DEBUGGER_ENABLED_STORAGE_KEY, saveDatabaseResult } from '../../../modules/storage'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { ref } from 'vue'
import { updateDatabaseResult } from '../../../modules/database'
import dayjs from 'dayjs'
import IconButton from '../../../components/IconButton.vue'
import DatabaseItem from '../components/DatabaseItem.vue'

const result = useChromeStorage(DATABASE_RESULT_KEY)

const isUpdating = ref(false)
const updateError = ref<string | null>(null)
async function update () {
  try {
    isUpdating.value = true
    updateError.value = null
    await updateDatabaseResult()
  } catch (err) {
    updateError.value = '發生錯誤，請稍候再試一次'
    throw err
  } finally {
    isUpdating.value = false
  }
}

async function remove () {
  await saveDatabaseResult(null)
}

const isDebuggerEnabled = useChromeStorage(DEBUGGER_ENABLED_STORAGE_KEY)
</script>

<template>
  <section
    class="flex w-full flex-col gap-4"
    :data-testid="OPTIONS_TEST_IDS.sectionDatabase"
  >
    <Card>
      <div class="flex flex-col gap-4">
        <Title>資料庫</Title>

        <div class="flex min-w-[240px] flex-col gap-1 font-normal">
          <DatabaseItem
            :active="result?.status !== 'success'"
            :icon="faDatabase"
          >
            <template #title>Core</template>
            <template #content>Built-in</template>
          </DatabaseItem>

          <DatabaseItem
            :active="result?.status === 'success'"
            :icon="faCloudArrowDown"
          >
            <template #title>Remote</template>
            <template #content>
              <span v-if="!result">
                -
              </span>
              <span v-else-if="result?.status === 'success'">
                <FontAwesomeIcon :icon="faCheck" />
                SHA: {{ result?.commit?.sha.slice(0, 7) }},
                Published: {{ dayjs(result?.commit?.commit.author.date,).format('YYYY/MM/DD HH:mm') }}
              </span>
              <span v-else>
                <FontAwesomeIcon :icon="faTriangleExclamation" />
                載入失敗 ({{ result.error }})
              </span>
            </template>
            <template #action>
              <div class="flex gap-2">
                <IconButton
                  v-if="isDebuggerEnabled"
                  :icon="faXmark"
                  @click="remove"
                />
                <IconButton
                  :disabled="isUpdating"
                  :icon="faRotate"
                  :loading="isUpdating"
                  @click="update"
                />
              </div>
            </template>
          </DatabaseItem>
        </div>
      </div>
    </Card>
  </section>
</template>
