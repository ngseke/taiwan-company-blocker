import { type Position, type PositionWithOffset } from '../schemas/position'

export function getActivatorPositionAbsoluteStyle (
  activatorPosition: Position | PositionWithOffset
) {
  let position: Position
  let [offsetX, offsetY] = [0, 0]

  if (typeof activatorPosition === 'string') {
    position = activatorPosition
  } else {
    position = activatorPosition.position
    offsetX = activatorPosition.offset?.[0] ?? 0
    offsetY = activatorPosition.offset?.[1] ?? 0
  }

  const positionMap: Record<Position, Partial<CSSStyleDeclaration>> = {
    'top-left': { top: `${offsetY}px`, left: `${offsetX}px` },
    'top-right': { top: `${offsetY}px`, right: `${offsetX}px` },
    'bottom-left': { bottom: `${offsetY}px`, left: `${offsetX}px` },
    'bottom-right': { bottom: `${offsetY}px`, right: `${offsetX}px` },
  }

  return positionMap[position]
}
