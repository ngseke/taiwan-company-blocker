import { type PropsWithChildren } from 'react'
import { type Nullish } from '../../../types/Nullish'
import { faCaretRight, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function SearchLink ({ href, children }: PropsWithChildren<{
  href?: Nullish<string>
}>) {
  return (
    <a
      className="inline-flex items-center gap-1 duration-150 hover:opacity-50"
      href={href ?? undefined}
      rel="noreferrer"
      target="_blank"
    >
      <FontAwesomeIcon icon={faMagnifyingGlass} />
      {children}
    </a>
  )
}

const searchSuffixes = ['PTT', '面試', '薪水']

export function SearchLinkSection ({ companyName }: { companyName?: Nullish<string> }) {
  if (!companyName) return null

  return (
    <div className="flex flex-wrap gap-3">
      <span className="pr-1 opacity-80">搜尋公司 <FontAwesomeIcon icon={faCaretRight} /></span>

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
