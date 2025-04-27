import { type PropsWithChildren } from 'react'
import { cn } from '../../../modules/cn'
import { type RuleType } from '../../../modules/rule'
import { type Nullish } from '../../../types/Nullish'
import { type MatchedRulesWithMeta } from '../hooks/useMatchedRules'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'

function Badge ({ children }: PropsWithChildren) {
  return (
    <span
      className={cn('inline-block min-h-[1rem] min-w-[1rem] items-center justify-center rounded-full px-1.5 py-0.5 text-xs font-bold leading-none max-w-[150px] truncate bg-red-700')}
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
    if (item.ruleSource === 'custom') {
      onEdit(item.ruleType, item.raw)
    }
  }

  if (!matchedRules?.length) return null

  return (

    <div className="rounded-lg bg-red-500/5 px-3 py-2">
      <h2 className="mb-2 font-bold">已匹配以下規則</h2>
      <ol className="space-y-1 text-xs marker:text-neutral-500">
        {matchedRules.map((item, index) => (
          <li key={index} className="flex space-x-2 overflow-hidden">
            <span className="flex-none">
              <Badge>{item.groupName}</Badge>
            </span>
            <button
              className="group relative inline-flex overflow-hidden text-start duration-150 enabled:hover:opacity-50"
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
                  className="absolute right-0 top-0 flex-none overflow-hidden opacity-0 duration-150 focus-within:w-auto group-hover:opacity-100"
                >
                  <FontAwesomeIcon icon={faPenToSquare} />
                </span>
              )}
            </button>
          </li>
        ))}
      </ol>
    </div>

  )
}
