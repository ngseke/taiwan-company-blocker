import { type PropsWithChildren } from 'react'
import { type Nullish } from '../../../types/Nullish'
import { cn } from '../../../modules/cn'

function SearchLink ({ href, disabled, children }: PropsWithChildren<{
  href?: Nullish<string>
  disabled?: boolean
}>) {
  return (
    <a
      className={cn('inline-flex items-center gap-1', {
        'cursor-default opacity-50': disabled,
        'hover:underline': !disabled,
      })}
      href={href ?? undefined}
      rel="noreferrer"
      target="_blank"
    >
      <svg className="fill-current" height={14} viewBox="0 0 512 512" width={14}>
        <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
      </svg>

      {children}
    </a>
  )
}

const searchSuffixes = ['PTT', '面試', '薪水']

export function SearchLinkSection ({ companyName }: { companyName?: Nullish<string> }) {
  if (!companyName) return null

  return (
    <div className="flex flex-wrap gap-3">
      <span>搜尋公司：</span>
      <SearchLink
        href={`https://www.google.com/search?q=${companyName}`}
      >
        Google
      </SearchLink>

      {searchSuffixes.map((suffix) => (
        <SearchLink
          key={suffix}
          href={`https://www.google.com/search?q=${companyName} ${suffix}`}
        >
          {suffix}
        </SearchLink>
      ))}
    </div>
  )
}
