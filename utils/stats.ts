export function distinctArray<T>(arr: T[], key: keyof T): T[] {
  for (let i = 0; i < arr.length; i++) {
    const el = arr[i]
    const foundIndex = arr.findIndex((item, index) => item[key] === el[key] && index !== i)
    if (foundIndex >= 0) {
      arr.splice(foundIndex, 1)
      return distinctArray(arr, key)
    }
  }
  return arr
}
