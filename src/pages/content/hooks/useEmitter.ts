import { type EventTypes, emitter } from '../modules/emitter'
import type EventEmitter from 'eventemitter3'
import { useEffect } from 'react'

export function useEmitter <EventName extends keyof EventTypes> (
  eventName: EventName,
  handler: EventTypes[EventName]
) {
  type Handler = EventEmitter.EventListener<EventTypes, EventName>

  useEffect(() => {
    emitter.on(eventName, handler as Handler)

    return () => {
      emitter.removeListener(eventName, handler as Handler)
    }
  }, [eventName, handler])
}
