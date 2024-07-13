export function exportData (data: string, fileName: string) {
  const a = document.createElement('a')
  const blob = new Blob([data], { type: 'octet/stream' })
  const url = URL.createObjectURL(blob)
  a.href = url
  a.download = fileName
  a.click()
  URL.revokeObjectURL(url)
}
