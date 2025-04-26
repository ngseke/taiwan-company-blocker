import { useChromeStorage } from '../../hooks/useChromeStorage'
import { blockMethods, formatBlockMethod } from '../../modules/BlockMethod'
import { BLOCK_METHOD_KEY } from '../../modules/storage'
import { Radio } from '../Radio'
import { Title } from '../Title'

export function BlockMethodOptions () {
  const [blockMethod, setBlockMethod] = useChromeStorage(BLOCK_METHOD_KEY)

  const options = blockMethods.map((value) => ({
    label: formatBlockMethod(value),
    value,
  }))

  return (
    <div className="flex flex-col gap-4">
      <Title>封鎖模式</Title>

      <div className="flex gap-6">
        {options.map(({ value, label }) => (
          <Radio
            key={value}
            checked={blockMethod === value}
            onChange={(checked) => {
              if (checked) {
                setBlockMethod(value)
              }
            }}
          >
            {label}
          </Radio>
        ))}
      </div>
    </div>
  )
}
