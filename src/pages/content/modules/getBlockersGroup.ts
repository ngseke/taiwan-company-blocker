import { blockersGroup } from '../../../../blockers/blockersGroup'
import { loadDatabaseResult, loadIsDebuggerEnabled } from '../../../modules/storage'
import { type BlockersGroup } from '../../../../schemas/blockersGroup'
import { database } from '../../../../schemas/database'

export async function getBlockersGroup (): Promise<{
  type: 'core' | 'remote'
  blockersGroup: BlockersGroup
}> {
  const isDebuggerEnabled = await loadIsDebuggerEnabled()

  const databaseResult = await loadDatabaseResult()
  if (databaseResult?.status === 'success') {
    try {
      database.parse(databaseResult.database)

      const data = databaseResult.database.blocker
      if (isDebuggerEnabled) console.info('Use remote database', data)
      return { type: 'remote', blockersGroup: data }
    } catch (err) {
      console.error(err)
    }
  }

  if (isDebuggerEnabled) console.info('Use core database', blockersGroup)
  return { type: 'core', blockersGroup }
}
