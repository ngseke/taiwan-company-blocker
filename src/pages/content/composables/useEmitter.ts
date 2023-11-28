import { onMounted, onUnmounted } from 'vue'
import { type EventTypes, emitter } from '../modules/emitter'

export function useEmitter <EventName extends keyof EventTypes> (
  eventName: EventName,
  handler: EventTypes[EventName]
) {
  onMounted(() => {
    emitter.on(eventName, handler)

    onUnmounted(() => {
      emitter.removeListener(eventName, handler)
    })
  })
}
