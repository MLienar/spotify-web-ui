export default function filterItems(items: any[]) {
  const filteredArray: any[] = []

  for (const item of items) {
    if (
      filteredArray.filter(
        (e) => e.name.toLowerCase() == item.name.toLowerCase()
      ).length === 0
    ) {
      filteredArray.push(item)
    }
    if (filteredArray.length === 4) {
      return filteredArray
    }
  }
  return filteredArray
}
