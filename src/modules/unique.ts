export function unique<T> (list: T[]) {
  return [...new Set(list)]
}
