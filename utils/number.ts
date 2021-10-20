export const removeZero = (e: any) => {
  if (e.target.value === '0') {
    console.log('removeZero', e.target.value)
    e.target.value = null
  }
}