import { saveDatabaseResult } from './storage'
import { extractErrorMessage } from './extractErrorMessage'
import { database, type Database } from '../../schemas/database'
import { ZodError } from 'zod'

interface GithubCommit {
  sha: string
  node_id: string
  commit: {
    author: {
      name: string
      email: string
      date: string
    }
    committer: {
      name: string
      email: string
      date: string
    }
    message: string
    tree: {
      sha: string
      url: string
    }
    url: string
  }
  url: string
  html_url: string
  comments_url: string
}

export interface DatabaseResultSuccess {
  commit: GithubCommit | null
  timestamp: number
  status: 'success'
  database: Database
}

export interface DatabaseResultError {
  commit: GithubCommit | null
  timestamp: number
  status: 'error'
  error: string
}

export type DatabaseResult =
  | DatabaseResultSuccess
  | DatabaseResultError

async function fetchCommit () {
  const url = 'https://api.github.com/repos/ngseke/taiwan-company-blocker/commits?path=database.json&sha=database&per_page=1'

  const response = await fetch(url, { cache: 'no-store' })

  if (!response.ok) throw Error(String(response.status))

  const [data] = (await response.json()) as GithubCommit[]

  return data
}

export async function fetchDatabaseResult (): Promise<DatabaseResult> {
  const baseResult = { timestamp: +new Date(), commit: null as GithubCommit | null }

  try {
    const commit = await fetchCommit()
    baseResult.commit = commit

    const url = `https://raw.githubusercontent.com/ngseke/taiwan-company-blocker/${commit.sha}/database.json`
    const response = await fetch(url, { cache: 'no-store' })

    if (!response.ok) throw new Error(String(response.status))
    const data = (await response.json()) as Database
    database.parse(data)

    return {
      ...baseResult,
      status: 'success',
      database: data,
    }
  } catch (err) {
    console.error(err)
    return {
      ...baseResult,
      status: 'error',
      error: err instanceof ZodError ? 'ZodError: parse error' : extractErrorMessage(err),
    }
  }
}

export async function updateDatabaseResult () {
  await saveDatabaseResult(null)

  const result = await fetchDatabaseResult()
  await saveDatabaseResult(result)
}
