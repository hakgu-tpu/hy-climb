export function centerImageUrl(value) {
  return /^https?:\/\//.test(value) ? value : `/images/centers/${value}`
}
