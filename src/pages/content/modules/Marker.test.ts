import { Marker } from './Marker'

describe('Marker', () => {
  test('Marker', () => {
    const $item = document.createElement('div')
    document.body.append($item)

    const marker = new Marker()
    expect(marker.selectMarkedItems()).toHaveLength(0)

    const markerValue = {
      isMatched: true,
      companyName: 'companyName',
      jobTitle: 'jobTitle',
    }
    marker.mark($item, markerValue)

    expect(marker.selectMarkedItems()).toMatchObject([$item])
    expect(marker.getIsMarked($item)).toBe(true)
    expect(marker.getMarkerValue($item)).toMatchObject(markerValue)

    marker.unmark($item)

    expect(marker.selectMarkedItems()).toHaveLength(0)
    expect(marker.getIsMarked($item)).toBe(false)
    expect(marker.getMarkerValue($item)).toBeNull()
  })
})
