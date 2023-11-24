import ResizeObserver from 'resize-observer-polyfill'
import { vi } from 'vitest'

window.ResizeObserver = ResizeObserver

vi.spyOn(console, 'warn')
vi.spyOn(console, 'error')
