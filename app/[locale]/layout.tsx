import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/cn'
import { ngsekeLink, pageLink } from '@/lib/link'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { notFound } from 'next/navigation'
import { ReactNode } from 'react'
import { Metadata } from 'next'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

const jetBrainsMono = JetBrains_Mono({
  variable: '--font-jet-brains-mono',
  subsets: ['latin'],
})

export async function generateMetadata({
  params,
}: Readonly<{
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Metadata' })

  const title = t('title')
  const description = t('description')
  const titleWithDescription = `${title} | ${description}`

  return {
    title,
    description: titleWithDescription,
    authors: { name: 'Sean Huang', url: ngsekeLink },
    icons: {
      icon: '/icon.png',
    },
    openGraph: {
      siteName: title,
      title: title,
      description: titleWithDescription,
      images: '/icon.png',
    },
    metadataBase: new URL(pageLink),
  } satisfies Metadata
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params

  if (!routing.locales.includes(locale as 'zh-Hant')) {
    notFound()
  }

  setRequestLocale(locale)

  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body className={cn(jetBrainsMono.variable, inter.variable, 'antialiased')}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
