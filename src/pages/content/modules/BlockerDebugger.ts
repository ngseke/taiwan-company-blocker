import { debounce } from 'lodash-es'
import { type Marker } from './Marker'
import { getIsInViewport, htmlToElement, waitForElement } from './dom'
import style from './block-debugger.module.sass'

export function renderDebugger (text: string) {
  const $debugger = htmlToElement(`
    <div class="${style.debugger}">${text}</div>
  `)

  return $debugger
}

type GetDebuggerInfo = ($item: HTMLElement) => Record<string, unknown>

export class BlockerDebugger {
  private readonly $container = document.createElement('div')

  private readonly marker: Marker
  private readonly getDebuggerText: GetDebuggerInfo = () => ({})

  constructor (options: {
    marker: Marker
    getDebuggerInfo: GetDebuggerInfo
  }) {
    this.marker = options.marker
    this.getDebuggerText = options.getDebuggerInfo

    this.insertContainer()
  }

  private async insertContainer () {
    const $body = await waitForElement('body')
    $body.append(this.$container)
  }

  private async render ($item: HTMLElement, text: string) {
    const isInViewport = getIsInViewport($item)

    if (!isInViewport) return this

    const $debugger = renderDebugger(text)
    this.$container?.append($debugger)

    const x = $item.getBoundingClientRect().left
    const y = $item.getBoundingClientRect().top

    Object.assign($debugger.style, {
      transform: `translate(${x}px, ${y}px)`,
    })

    return this
  }

  private destroyAll () {
    const $debuggers = [...this.$container.children] as HTMLElement[]

    $debuggers.forEach(($debugger) => {
      $debugger.remove()
    })
  }

  private handler: (() => void) | null = null

  start () {
    if (this.handler) return this

    const debouncedRenderAll = debounce(() => {
      const $items = this.marker.selectMarkedItems()
      $items.forEach(($item) => {
        this.render($item, JSON.stringify(this.getDebuggerText($item), null, 2))
      })
    }, 250)

    const handler = () => {
      this.destroyAll()
      debouncedRenderAll()
    }
    this.handler = handler

    window.addEventListener('scroll', handler)
    window.addEventListener('resize', handler)

    return this
  }

  stop () {
    if (!this.handler) return

    this.destroyAll()

    window.removeEventListener('scroll', this.handler)
    window.removeEventListener('resize', this.handler)

    this.handler = null

    return this
  }
}
