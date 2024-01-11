import { Marker } from './Marker'

describe('Marker', () => {
  test('create and remove marker', () => {
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

  test('two distinct markers should not interfere with each other', () => {
    const $item1 = document.createElement('div')
    const $item2 = document.createElement('div')
    document.body.append($item1, $item2)

    const marker1 = new Marker()
    const marker2 = new Marker()

    const markerValue1 = {
      isMatched: true,
      companyName: 'companyName 1',
      jobTitle: 'jobTitle1',
    }
    const markerValue2 = {
      isMatched: true,
      companyName: 'companyName 2',
      jobTitle: 'jobTitle 2',
    }
    marker1.mark($item1, structuredClone(markerValue1))
    marker2.mark($item2, structuredClone(markerValue2))

    expect(marker1.selectMarkedItems()).toMatchObject([$item1])
    expect(marker1.getIsMarked($item1)).toBe(true)
    expect(marker1.getMarkerValue($item1)).toMatchObject(markerValue1)

    expect(marker2.selectMarkedItems()).toMatchObject([$item2])
    expect(marker2.getIsMarked($item2)).toBe(true)
    expect(marker2.getMarkerValue($item2)).toMatchObject(markerValue2)
  })
})
