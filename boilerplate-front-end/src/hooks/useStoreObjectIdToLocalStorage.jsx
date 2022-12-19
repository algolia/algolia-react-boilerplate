// Custom hook to store recent searches into local storage

const useStoreIdToLocalStorage = (id) => {
  const oldSearchArray = localStorage.getItem('objectId')
  const parsedArray = oldSearchArray ? JSON.parse(oldSearchArray) : []
  const allSearches = [...parsedArray, id]
  const cleanArray = allSearches.filter((n) => n)
  let deduplicateSearches = [...new Set(cleanArray)]
  localStorage.setItem('objectId', JSON.stringify(deduplicateSearches))
}

export default useStoreIdToLocalStorage
