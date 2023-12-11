export function validateUrl (url: string) {
  try {
    const instance = new URL(url)
    return Boolean(instance)
  } catch (err) {
    return false
  }
}
