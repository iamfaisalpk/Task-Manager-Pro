export const usePagination = (currentPage, totalPages) => {
  const getPaginationRange = () => {
    const range = []
    const delta = 2

    for (let i = Math.max(1, currentPage - delta); i <= Math.min(totalPages, currentPage + delta); i++) {
      range.push(i)
    }

    if (range[0] > 1) {
      if (range[0] > 2) range.unshift('...')
      range.unshift(1)
    }

    if (range[range.length - 1] < totalPages) {
      if (range[range.length - 1] < totalPages - 1) range.push('...')
      range.push(totalPages)
    }

    return range
  }

  return { getPaginationRange }
}
