import { blockersGroup } from '../../../../blockers/blockersGroup'
import { loadDatabaseResult } from '../../../modules/storage'
import { type BlockersGroup } from '../../../../schemas/blockersGroup'
import { database } from '../../../../schemas/database'
import { logger } from '../../../modules/logger-1'

export async function getBlockersGroup (): Promise<{
  type: 'core' | 'remote'
  blockersGroup: BlockersGroup
}> {
  const databaseResult = await loadDatabaseResult()
  if (databaseResult?.status === 'success') {
    try {
      database.parse(databaseResult.database)

      const data = databaseResult.database.blocker
      logger.info('Use remote database', data)
      return { type: 'remote', blockersGroup: data }
    } catch (err) {
      logger.error(err)
    }
  }

  logger.info('Use core database', blockersGroup)
  return { type: 'core', blockersGroup }
}
