export const categoryColor = (id: number) => {
  switch (id) {
    case 1:
      return 'bg-yellow-200 text-yellow-800'
    case 2:
      return 'bg-blue-200 text-blue-800'
    default:
      return 'bg-red-200 text-red-800'
  }
}
