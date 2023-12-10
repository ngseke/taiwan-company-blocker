export function extractErrorMessage (error: any) {
  try {
    return String(
      error?.response?.data?.message ??
      error?.message ??
      error
    )
  } catch (err) {
    return String(error)
  }
}
