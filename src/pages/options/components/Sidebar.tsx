import { NavLink } from 'react-router'
import { OPTIONS_TEST_IDS } from '../../../modules/constants'
import { cn } from '../../../modules/cn'

export function Sidebar ({ list }: { list: Array<{ label: string, value: string }> }) {
  return (
    <div
      className="flex flex-col gap-y-2"
      data-testid={OPTIONS_TEST_IDS.sidebar}
    >
      {list.map((item) => (
        <NavLink
          key={item.value}
          className={({ isActive }) => cn('rounded-lg px-5 py-4 text-left font-bold hover:bg-neutral-900/30', {
            'bg-neutral-900 hover:!bg-neutral-900': isActive,
          })}
          data-testid={item.value}
          to={item.value}
        >
          {item.label}
        </NavLink>
      ))}

    </div>
  )
}
