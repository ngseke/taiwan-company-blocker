import { onMounted, onUnmounted } from 'vue'
import { type EventTypes, emitter } from '../modules/emitter'
import type EventEmitter from 'eventemitter3'

export function useEmitter <EventName extends keyof EventTypes> (
  eventName: EventName,
  handler: EventTypes[EventName]
) {
  type Handler = EventEmitter.EventListener<EventTypes, EventName>

  onMounted(() => {
    emitter.on(eventName, handler as Handler)

    onUnmounted(() => {
      emitter.removeListener(eventName, handler as Handler)
    })
  })
}
