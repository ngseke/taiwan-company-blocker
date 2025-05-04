import { Card } from '../../../components/Card'
import { Title } from '../../../components/Title'
import { OPTIONS_TEST_IDS } from '../../../modules/constants'
import { Link } from '../../../components/Link'
import { type PropsWithChildren, type ReactNode } from 'react'
import { Divider } from '../../../components/Divider'

const version = `v${APP_VERSION}`

const homepage = 'https://taiwan-company-blocker.ngseke.me/'
const releases = 'https://github.com/ngseke/taiwan-company-blocker/releases'

const links = [
  {
    title: '官方網站',
    url: homepage,
  },
  {
    title: '版本記錄',
    url: releases,
  },
  {
    title: '問題回報',
    url: 'https://github.com/ngseke/taiwan-company-blocker/issues',
  },
  {
    title: 'GitHub',
    url: 'https://github.com/ngseke/taiwan-company-blocker',
  },
  {
    title: 'Chrome Web Store',
    url: 'https://chromewebstore.google.com/detail/hmkkfmjfinbllbbkgabkeponkhckmijk',
  },
]

function Block ({ title, children }: PropsWithChildren<{ title: ReactNode }>) {
  return (
    <div className="mb-3">
      <Title className="mb-3">{title}</Title>
      {children}
    </div>
  )
}

export function AboutPage () {
  const content = (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">
          <Link href={homepage}>
            台灣求職網封鎖神器
          </Link>
        </h1>

        <Link
          className="font-mono text-neutral-600 hover:text-neutral-500"
          href={releases}
        >
          {version}
        </Link>
      </div>

      <Divider />

      <Block title="關於此擴充功能">
        <p>
          這是啟發自 <i>uBlacklist</i> 的免費開源專案。若你在使用時遇到任何問題，請不吝來信至{' '}
          <Link className="underline" href="mailto:ngseke@gmail.com">ngseke@gmail.com</Link>{' '}
          與我聯繫，或是到{' '}
          <Link className="underline" href="https://github.com/ngseke/taiwan-company-blocker/issues">GitHub</Link>{' '}
          發送 Issue 回報，也歡迎有志之士提交{' '}
          <Link className="underline" href="https://github.com/ngseke/taiwan-company-blocker/pulls">Pull Request</Link>{' '}
          來貢獻程式碼。
        </p>
      </Block>

      <Block title="隱私權聲明">
        <p>
          《台灣求職網封鎖神器》不會收集任何你的個人資訊。
        </p>
      </Block>

      <Block title="相關連結">
        <ul className="-mx-2 flex divide-x divide-neutral-700">
          {links.map(({ title, url }) => (
            <li key={title} className="px-2">
              <Link href={url}>{title}</Link>
            </li>
          ))}
        </ul>
      </Block>

      <p className="text-xs">
        Made with 🍺 by{' '}
        <Link className="font-mono underline" href="https://ngseke.me">
          @ngseke
        </Link>
      </p>
    </section>
  )

  return (
    <section
      className="flex w-full flex-col gap-4"
      data-testid={OPTIONS_TEST_IDS.sectionAbout}
    >
      <Card>
        {content}
      </Card>
    </section>
  )
}
