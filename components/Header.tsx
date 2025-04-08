import { locales } from '@/i18n/locales'
import { Link } from '@/i18n/routing'
import { cn } from '@/lib/cn'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'

export function Header() {
  const t = useTranslations('Header')
  const locale = useLocale()

  return (
    <header className="flex min-h-[25rem] flex-col items-center justify-center gap-8 px-4 pt-16">
      <div className="flex flex-col items-center gap-2">
        <div className="relative after:absolute after:inset-x-0 after:bottom-0 after:top-1/2 after:z-10 after:bg-gradient-to-t after:from-[var(--background)] after:to-transparent">
          <Image
            src="/icon.png"
            width={284}
            height={284}
            alt=""
            className="relative h-auto w-48 select-none"
          />
        </div>
        <h1 className="text-center">
          <Image
            src="/text.svg"
            width={633}
            height={192}
            alt={t('title')}
            className="relative z-10 -mt-6 h-auto w-80"
          />

          {!locale.includes('zh') && (
            <span className="font-bold before:opacity-50 before:content-['—_'] after:opacity-50 after:content-['_—']">Taiwan Company Blocker</span>
          )}
        </h1>
      </div>

      <p className="text-center font-medium opacity-70">
        {t.rich('description')}
      </p>

      {locales.length > 1 && (
        <ul className="flex flex-wrap gap-2">
          {
            locales.map(({ code, name }) => (
              <li key={code}>
                <Link
                  href="/"
                  locale={code}
                  className={cn(
                    'inline-block rounded-md border border-zinc-900 px-1.5',
                    {
                      'border-zinc-500': locale === code,
                      'hover:border-zinc-800': locale !== code,
                    },
                  )}
                >
                  {name}
                </Link>
              </li>
            ))
          }
        </ul>
      ) }

    </header>
  )
}
