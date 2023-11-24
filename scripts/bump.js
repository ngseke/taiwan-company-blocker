/* eslint-disable no-console */
import { execSync } from 'child_process'
import { openReleasePage } from './openReleasePage.js'

const execWithStdio = (command) => execSync(command, { stdio: 'inherit' })

async function bump () {
  const commitMessage = 'chore: bump version v%s'
  execWithStdio(`npx bumpp --commit "${commitMessage}"`)

  await openReleasePage()

  console.log('\n✅ All Done!')
}

bump()
