import { DownloadLink } from '@/components/DownloadLink'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Section } from '@/components/Section'
import { routing } from '@/i18n/routing'
import { cn } from '@/lib/cn'
import { changelogLink, chromeWebStoreLink, latestReleaseLink } from '@/lib/link'
import { IconDownload } from '@tabler/icons-react'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import Image from 'next/image'
import { SubTitle } from '../../components/SubTitle'
import { Paragraph } from '@/components/Paragraph'

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }))
}

export default async function Home({
  params,
}: Readonly<{
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations('Index')

  return (
    <main className="flex flex-col gap-8 text-sm">
      <Header />
      <div className="mx-auto flex w-full max-w-[50rem] flex-col items-start gap-10 px-4">

        <Section title={t('download.title')}>
          <div className="mb-4 flex flex-wrap gap-2">
            <DownloadLink href={chromeWebStoreLink}>
              <Image src="/chrome.svg" width={32} height={32} alt="Chrome" />
              {t('download.chromeWebStore')}
            </DownloadLink>
            <DownloadLink href={latestReleaseLink}>
              <IconDownload size={32} stroke={2.5} />
              {t('download.manualDownload')}
            </DownloadLink>
          </div>

          <div className="flex gap-2">
            <a href={chromeWebStoreLink}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://img.shields.io/chrome-web-store/v/hmkkfmjfinbllbbkgabkeponkhckmijk?label=Version"
                alt="Version"
              />
            </a>
            <a href={chromeWebStoreLink}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://img.shields.io/chrome-web-store/users/hmkkfmjfinbllbbkgabkeponkhckmijk?label=Users" alt="Users" />
            </a>
          </div>

          {
            locale !== 'zh-Hant' && (
              <div className="mt-4 opacity-50">
                * Only Traditional Chinese is currently supported
              </div>
            )
          }
        </Section>

        <Section title={t('introduction.title')}>
          <div className="mb-4 flex flex-col gap-4">
            <Paragraph>
              {
                t.rich('introduction.content1', { b: chunks => <b>{chunks}</b> })
              }
            </Paragraph>
            <Paragraph>
              {
                t.rich('introduction.content2', { b: chunks => <b>{chunks}</b> })
              }
            </Paragraph>
          </div>
        </Section>

        <Section title={t('platform.title')}>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
            {[
              {
                name: t('platform.cake'),
                url: 'https://www.cake.me/',
                image: '/logo/cake.svg',
              },
              {
                name: t('platform.yourator'),
                url: 'https://www.yourator.co/',
                image: '/logo/yourator.png',
              },
              {
                name: t('platform.104'),
                url: 'https://www.104.com.tw/',
                image: '/logo/104.png',
                className: 'h-5',
              },
              {
                name: t('platform.518'),
                url: 'https://www.518.com.tw/',
                image: '/logo/518.svg',
              },
              {
                name: t('platform.1111'),
                url: 'https://www.1111.com.tw/',
                image: '/logo/1111.svg',
                className: 'drop-shadow-[0_0_2px_rgba(255,255,255,1)]',
              },
              {
                name: t('platform.chickpt'),
                url: 'https://www.chickpt.com.tw/',
                image: '/logo/chickpt.svg',
                className: 'h-8 drop-shadow-[0_0_2px_rgba(255,255,255,1)]',
              },
              {
                name: t('platform.meetJobs'),
                url: 'https://meet.jobs/',
                image: '/logo/meetJobs.svg',
              },
              {
                name: t('platform.taiwanJobs'),
                url: 'https://job.taiwanjobs.gov.tw/',
              },
            ].map((platform, index) => (
              <li key={index} className="size-full min-h-16">
                <a
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex size-full flex-wrap items-center justify-center rounded-xl bg-zinc-900 px-4 py-2 text-center text-base font-medium hover:bg-zinc-800"
                >
                  {
                    platform.image
                      ? (
                          <>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={platform.image}
                              alt={platform.name}
                              className={cn('h-7 w-auto', platform.className)}
                            />
                          </>
                        )
                      : platform.name
                  }
                </a>
              </li>
            ))}
          </ul>
        </Section>

        <Section title={t('features.title')}>
          <div className="flex flex-col gap-4">

            <SubTitle>
              {t('features.block.title')}
            </SubTitle>

            <div className="mb-6 flex flex-col items-start gap-4">
              <Paragraph>
                {t('features.block.content1')}
              </Paragraph>
              <div className="relative w-auto">
                <Image
                  src="/screenshot/block.png"
                  width={1020}
                  height={1280}
                  alt="Block"
                  className="h-auto w-[600px] rounded-lg"
                />

                <div
                  className="absolute bottom-4 right-4 rounded-xl bg-white p-4 shadow-xl"
                >
                  <Image
                    src="/logo/104.png"
                    width={960}
                    height={139}
                    alt="104"
                    className="h-auto w-[150px] sm:w-[200px]"
                  />
                </div>
              </div>
              <Image
                src="/screenshot/dialog.png"
                width={1020}
                height={1280}
                alt="Dialog"
                className="h-auto w-[450px] rounded-lg"
              />
            </div>

            <SubTitle>
              {t('features.rules.title')}
            </SubTitle>

            <div className="mb-6 flex flex-col gap-4">
              <Paragraph>
                {t('features.rules.content1')}
              </Paragraph>
              <Paragraph>
                {t('features.rules.content2')}
              </Paragraph>
              <Image
                src="/screenshot/rules.png"
                width={1020}
                height={1280}
                alt="Rules"
                className="h-auto w-[500px] rounded-lg"
              />
            </div>

            <SubTitle>
              {t('features.methods.title')}
            </SubTitle>

            <div className="mb-6 flex flex-col gap-4">
              <Image
                src="/screenshot/methods.png"
                width={282}
                height={928}
                alt="Methods"
                className="h-auto w-[400px] rounded-lg"
              />
              <Image
                src="/screenshot/opacity.png"
                width={370}
                height={1446}
                alt="Opacity"
                className="h-auto w-[500px] rounded-lg"
              />
              <Image
                src="/screenshot/blur.png"
                width={370}
                height={1446}
                alt="Blur"
                className="h-auto w-[500px] rounded-lg"
              />
            </div>

            <SubTitle>
              {t('features.subscription.title')}
            </SubTitle>

            <div className="mb-6 flex flex-col gap-4">
              <Paragraph>
                {t('features.subscription.content1')}
              </Paragraph>
              <Paragraph>
                {t.rich('features.subscription.content2', {
                  a: children => (
                    <a className="underline hover:text-brand" href="https://github.com/ngseke/company-list" target="_blank">
                      {children}
                    </a>
                  ),
                })}
              </Paragraph>
              <Image
                src="/screenshot/subscription.png"
                width={1020}
                height={1280}
                alt="Subscription"
                className="h-auto w-[450px] rounded-lg"
              />
            </div>

            <SubTitle>
              {t('features.shortcut.title')}
            </SubTitle>

            <div className="mb-6 flex flex-col gap-2">
              <Paragraph>
                {t('features.shortcut.content1')}
              </Paragraph>

              <Image
                src="/screenshot/shortcut.png"
                width={630}
                height={860}
                alt="Shortcut"
                className="h-auto w-96 rounded-lg"
              />
            </div>
          </div>
        </Section>

        <Section title={t('changelog.title')}>
          <a
            href={changelogLink}
            className="underline hover:text-brand"
          >
            https://github.com/ngseke/taiwan-company-blocker/releases
          </a>
        </Section>
      </div>
      <Footer />
    </main>
  )
}
