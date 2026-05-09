const decoder = new TextDecoder("utf-8", { fatal: false })

export function repairText(value) {
  if (typeof value !== "string") return value
  if (!/[ÃÂð]/.test(value)) return value

  const bytes = Array.from(value, (char) => char.charCodeAt(0)).filter((code) => code <= 255)
  if (bytes.length !== value.length) return value

  return decoder.decode(Uint8Array.from(bytes))
}
