import ResizeObserver from 'resize-observer-polyfill'
import { vi } from 'vitest'

window.ResizeObserver = ResizeObserver

vi.spyOn(console, 'warn')
vi.spyOn(console, 'error')

beforeEach(() => {
  HTMLDialogElement.prototype.showModal = vi.fn()
  HTMLDialogElement.prototype.close = vi.fn()
})
