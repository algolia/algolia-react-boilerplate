const useStoreQueryToLocalStorage = (query) => {
  console.log(query);
  const oldSearchArray = localStorage.getItem('recentSearches');
  const parsedArray = oldSearchArray ? JSON.parse(oldSearchArray) : [];
  const allSearches = [...parsedArray, query];
  const cleanArray = allSearches.filter((n) => n);
  let deduplicateSearches = [...new Set(cleanArray)];
  localStorage.setItem('recentSearches', JSON.stringify(deduplicateSearches));
};

export default useStoreQueryToLocalStorage;
