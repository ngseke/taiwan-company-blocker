import { loadIsDebuggerEnabled } from './storage'

class Logger {
  private readonly prefixes = [
    '%c👹TCB',
    'color: white; background: #ef4444; font-weight: bold; border-radius:6px; padding: 2px 4px',
  ]

  private isDebuggerEnabled = false

  constructor () {
    this.init()
  }

  private async init () {
    this.isDebuggerEnabled = await loadIsDebuggerEnabled()
  }

  error (...args: unknown[]) {
    // eslint-disable-next-line no-console
    console.error(...this.prefixes, ...args)
  }

  info (...args: unknown[]) {
    if (!this.isDebuggerEnabled) return

    // eslint-disable-next-line no-console
    console.info(...this.prefixes, ...args)
  }
}

export const logger = new Logger()
