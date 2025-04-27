import { faGear } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { type ComponentProps } from 'react'

export function OptionsButton (props: ComponentProps<'button'>) {
  return (
    <button className="group px-2" title="設定" type="button" {...props}>
      <div className="duration-500 group-hover:rotate-90">
        <FontAwesomeIcon icon={faGear} />
      </div>
    </button>
  )
}
