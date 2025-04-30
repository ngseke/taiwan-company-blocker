import { nanoid } from 'nanoid'
import { useStyleTag } from './useStyleTag'
import { useEffect } from 'react'
import { type Nullish } from '../types/Nullish'

const className = `scroll-lock-${nanoid()}`

export function useScrollLock (isLocked?: Nullish<boolean>) {
  useStyleTag(`.${className} { overflow: hidden; }`)

  useEffect(() => {
    if (isLocked) {
      document.body.classList.add(className)
    } else {
      document.body.classList.remove(className)
    }
  }, [isLocked])
}
