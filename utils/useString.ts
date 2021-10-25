export const omitString = (string: string, maxLength: number) => {
  let modStr = ''
  if (string && string.length > maxLength) {
    modStr = string.substr(0, maxLength) + '...'
    return modStr
  }
  return string
}
