import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useChromeStorage } from '../../../hooks/useChromeStorage'
import { BLOCK_METHOD_KEY } from '../../../modules/storage'
import { type BlockMethod, blockMethods, formatBlockMethod } from '../../../modules/BlockMethod'

export function BlockMethodSelect () {
  const blockMethodOptions = blockMethods.map((value) => ({
    label: formatBlockMethod(value),
    value,
  }))

  const [blockMethod, setBlockMethod] = useChromeStorage(BLOCK_METHOD_KEY)

  return (
    <label className="group relative select-none">
      <span className="inline-flex items-center gap-1">
        {formatBlockMethod(blockMethod)}
        <FontAwesomeIcon className="text-sm" icon={faChevronDown} />
      </span>
      <select
        value={blockMethod ?? ''}
        onChange={async (event) => {
          await setBlockMethod(event.target.value as BlockMethod)
        }}
        className="absolute inset-0 cursor-pointer appearance-none  bg-transparent text-transparent"
      >
        {
          blockMethodOptions.map(({ value, label }) => (
            <option key={value} value={value}>{label}</option>
          ))
        }
      </select>
    </label>
  )
}
