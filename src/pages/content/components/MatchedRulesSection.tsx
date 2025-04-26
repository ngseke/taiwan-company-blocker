import { type PropsWithChildren } from 'react'
import { cn } from '../../../modules/cn'
import { type RuleType } from '../../../modules/rule'
import { type Nullish } from '../../../types/Nullish'
import { type MatchedRulesWithMeta } from '../hooks/useMatchedRules'

function Badge ({ color = 'default', children }: PropsWithChildren<{
  color?: 'default' | 'primary'
}>) {
  return (
    <span
      className={cn('inline-flex min-h-[1rem] min-w-[1rem] items-center justify-center whitespace-nowrap rounded-full px-1.5 py-0.5 text-xs font-bold leading-none', {
        'bg-neutral-700': color === 'default',
        'bg-red-700': color === 'primary',
      })}
    >
      {children}
    </span>
  )
}

export function MatchedRulesSection ({ matchedRules, onEdit }: {
  matchedRules?: Nullish<MatchedRulesWithMeta>
  onEdit: (type: RuleType, rule: string) => void
}) {
  function handleClick (item: MatchedRulesWithMeta[number]) {
    if (item.ruleSource !== 'custom') return
    onEdit(item.ruleType, item.raw)
  }

  if (!matchedRules?.length) return null

  return (

    <div className="rounded-lg bg-red-500/5 px-3 py-2">
      <h2 className="mb-2 font-bold">已匹配以下規則</h2>
      <ol className="space-y-1 pb-1 text-xs marker:text-neutral-500">
        {matchedRules.map((item, index) => (
          <li key={index} className="group flex">
            <span className="inline-flex flex-1 space-x-2 overflow-hidden">
              <span className="flex-none">
                <Badge color="primary">{item.groupName}</Badge>
              </span>
              <button
                className="group relative inline-flex overflow-hidden text-start enabled:hover:underline"
                disabled={item.ruleSource !== 'custom'}
                title={item.raw}
                type="button"
                onClick={() => { handleClick(item) }}
              >
                <span className="overflow-auto break-words font-mono text-red-500">
                  {item.raw}
                </span>

                {item.ruleSource === 'custom' && (
                  <span
                    className="absolute right-0 top-0 flex-none overflow-hidden opacity-0 focus-within:w-auto group-hover:opacity-100"
                  >
                    <svg
                      className="h-[1em] fill-current"
                      viewBox="0 0 512 512"
                    >
                      <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
                    </svg>
                  </span>
                )}
              </button>
            </span>
          </li>
        ))}
      </ol>
    </div>

  )
}
