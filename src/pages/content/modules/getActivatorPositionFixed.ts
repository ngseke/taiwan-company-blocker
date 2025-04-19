import { type Position, type PositionWithOffset } from '../schemas/position'

export function getActivatorPositionFixed (
  $item: HTMLElement,
  $activator: HTMLElement,
  activatorPosition: Position | PositionWithOffset
) {
  const { left, top, width, height } = $item.getBoundingClientRect()
  const { width: activatorWidth, height: activatorHeight } = $activator.getBoundingClientRect()

  let position: Position
  let [offsetX, offsetY] = [0, 0]

  if (typeof activatorPosition === 'string') {
    position = activatorPosition
  } else {
    position = activatorPosition.position
    offsetX = activatorPosition.offset?.[0] ?? 0
    offsetY = activatorPosition.offset?.[1] ?? 0
  }

  const offsetLeft = left + offsetX
  const offsetRight = left + width - activatorWidth - offsetX
  const offsetTop = top + offsetY
  const offsetBottom = top + height - activatorHeight - offsetY

  const positionMap: Record<Position, { x: number, y: number }> = {
    'top-left': { x: offsetLeft, y: offsetTop },
    'top-right': { x: offsetRight, y: offsetTop },
    'bottom-left': { x: offsetLeft, y: offsetBottom },
    'bottom-right': { x: offsetRight, y: offsetBottom },
  }

  return positionMap[position]
}
