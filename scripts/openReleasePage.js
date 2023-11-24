import open from 'open'
import packageJson from '../package.json' assert { type: 'json' }

export async function openReleasePage () {
  const { default: urlJoin } = await import('url-join')
  const url = urlJoin(packageJson.repository.url, 'releases')
  console.log(url)
  await open(url)
}
