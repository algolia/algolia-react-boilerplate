// Custom hook to store recent searches into local storage

const useStoreCartToLocalStorage = (cart) => {
  const oldCart = localStorage.getItem('myCart')
  const parsedArray = oldCart ? JSON.parse(oldCart) : []
  const allCart = [...parsedArray, cart]
  const cleanArray = allCart.filter((n) => n)
  let deduplicateCarts = [...new Set(cleanArray)]
  localStorage.setItem('myCart', JSON.stringify(deduplicateCarts))
}

export default useStoreCartToLocalStorage
