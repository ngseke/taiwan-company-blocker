import { ActionActivator } from './ActionActivator'
import { Marker } from './Marker'
import { $ } from './dom'
import { emitter } from './emitter'

describe('ActionActivator', () => {
  let marker: Marker
  const activatorPositionCallback = vi.fn()
    .mockReturnValue({ x: 0, y: 0 })
  let actionActivator: ActionActivator

  const { body } = document

  beforeEach(() => {
    marker = new Marker()
    const $item = document.createElement('div')
    marker.mark($item, {
      isMatched: true,
      companyName: 'companyName',
      jobTitle: 'jobTitle',
    })
    activatorPositionCallback.mockClear()
    actionActivator = new ActionActivator({
      marker,
      activatorPositionCallback,
    })
    body.append($item)
  })

  afterEach(() => {
    body.innerHTML = ''
    actionActivator?.stop()
  })

  test('render the container', async () => {
    actionActivator.start()

    expect(
      $('[data-taiwan_company_blocker_action_activator_container]')
    ).toBeTruthy()
  })

  test('render the activator', async () => {
    vi.useFakeTimers()
    actionActivator.start()
    vi.runAllTimers()

    expect($('button svg')).toBeTruthy()
    actionActivator.stop()
    expect($('button svg')).toBeFalsy()
  })

  test('emit event on click', async () => {
    const spyEmitter = vi.spyOn(emitter, 'emit')

    vi.useFakeTimers()
    actionActivator.start()
    vi.runAllTimers()

    $('button')?.click()
    expect(spyEmitter).toBeCalled()
  })
})
