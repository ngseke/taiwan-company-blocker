import { type PropsWithChildren } from 'react'
import { cn } from '../../../modules/cn'
import { type RuleType } from '../../../modules/rule'
import { type Nullish } from '../../../types/Nullish'
import { type MatchedRulesWithMeta } from '../hooks/useMatchedRules'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'

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
                className="group relative inline-flex overflow-hidden text-start"
                disabled={item.ruleSource !== 'custom'}
                title={item.raw}
                type="button"
                onClick={() => { handleClick(item) }}
              >
                <span className="overflow-auto break-words font-mono text-red-500 duration-150 group-hover:opacity-50">
                  {item.raw}
                </span>

                {item.ruleSource === 'custom' && (
                  <span
                    className="absolute right-0 top-0 flex-none overflow-hidden opacity-0 duration-150 focus-within:w-auto group-hover:opacity-100"
                  >
                    <FontAwesomeIcon icon={faPenToSquare} />
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
