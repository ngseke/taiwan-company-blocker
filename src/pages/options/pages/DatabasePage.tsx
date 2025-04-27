import { faCheck, faCloudArrowDown, faDatabase, faRotate, faTriangleExclamation, faXmark } from '@fortawesome/free-solid-svg-icons'
import { Card } from '../../../components/Card'
import { Title } from '../../../components/Title'
import { IconButton } from '../../../components/IconButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { OPTIONS_TEST_IDS } from '../../../modules/constants'
import { DatabaseItem } from '../components/DatabaseItem'
import { useChromeStorage } from '../../../hooks/useChromeStorage'
import { DATABASE_RESULT_KEY, DEBUGGER_ENABLED_STORAGE_KEY, saveDatabaseResult } from '../../../modules/storage'
import { updateDatabaseResult } from '../../../modules/database'
import { useState } from 'react'
import dayjs from 'dayjs'

export function DatabasePage () {
  const [result] = useChromeStorage(DATABASE_RESULT_KEY)

  const [isUpdating, setIsUpdating] = useState(false)

  async function update () {
    try {
      setIsUpdating(true)
      await updateDatabaseResult()
    } finally {
      setIsUpdating(false)
    }
  }

  async function remove () {
    await saveDatabaseResult(null)
  }

  const [isDebuggerEnabled] = useChromeStorage(DEBUGGER_ENABLED_STORAGE_KEY)

  return (
    <section
      className="flex w-full flex-col gap-4"
      data-testid={OPTIONS_TEST_IDS.sectionDatabase}
    >
      <Card>
        <div className="flex flex-col gap-4">
          <Title>資料庫</Title>

          <div className="flex min-w-[240px] flex-col gap-1 font-normal">
            <DatabaseItem
              active={result?.status !== 'success'}
              content="Built-in"
              icon={faDatabase}
              title="Core"
            />

            <DatabaseItem
              action={
                <div className="flex gap-2">
                  {isDebuggerEnabled && (
                    <IconButton icon={faXmark} onClick={remove} />
                  )}
                  <IconButton
                    disabled={isUpdating}
                    icon={faRotate}
                    loading={isUpdating}
                    onClick={update}
                  />
                </div>
              }
              active={result?.status === 'success'}
              content={(() => {
                if (!result) return <span>-</span>
                if (result?.status === 'success') {
                  return (
                    <span>
                      {/* @ts-expect-error -- Remove Vue */}
                      <FontAwesomeIcon icon={faCheck} />{' '}
                      SHA: {result?.commit?.sha.slice(0, 7)},
                      Published: {dayjs(result?.commit?.commit.author.date).format('YYYY/MM/DD HH:mm')}
                    </span>
                  )
                }

                return (
                  <span>
                    {/* @ts-expect-error -- Remove Vue */}
                    <FontAwesomeIcon icon={faTriangleExclamation} />
                    載入失敗 ({result.error})
                  </span>
                )
              })()}
              icon={faCloudArrowDown}
              title="Remote"
            />
          </div>
        </div>
      </Card>
    </section>
  )
}
