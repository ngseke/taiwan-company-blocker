import { emptyDirSync, ensureFileSync, writeJsonSync } from 'fs-extra/esm'

import { blockersGroup } from '../blockers/blockersGroup'
import { type Database, database as databaseSchema } from '../schemas/database'

;(function () {
  // Clear output folder
  emptyDirSync('./database')

  const database: Database = {
    blocker: blockersGroup,
  }

  // Validate
  databaseSchema.parse(database)

  // Output to JSON file
  const path = './database/database.json'

  ensureFileSync(path)
  writeJsonSync(path, database, { spaces: 2 })
})()
