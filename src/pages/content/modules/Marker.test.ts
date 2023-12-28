import { Marker } from './Marker'

describe('Marker', () => {
  test('Marker', () => {
    const $item = document.createElement('div')
    document.body.append($item)

    const marker = new Marker()
    expect(marker.selectMarkedItems()).toHaveLength(0)

    const markValue = 'matched'
    marker.mark($item, markValue)

    expect(marker.selectMarkedItems()).toMatchObject([$item])
    expect(marker.getIsMarked($item)).toBe(true)
    expect(marker.getMarkValue($item)).toBe(markValue)

    marker.unmark($item)

    expect(marker.selectMarkedItems()).toHaveLength(0)
    expect(marker.getIsMarked($item)).toBe(false)
    expect(marker.getMarkValue($item)).toBeUndefined()
  })
})
