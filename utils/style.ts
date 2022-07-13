// 20, '20' → '20px' – add px
// '20px'   → '20px' – don't touch
// 20      →  '20px'
// '20'    →  '20px'
// '20px'  →  '20px'
// '20%'   →  '20%'
export function toNumerableValue(value: string | number) {
  if (typeof value === 'number' || !isNaN(+value)) {
    return `${value}px`
  }

  return value
}
