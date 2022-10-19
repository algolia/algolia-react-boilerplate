// This is for closing federated search window when clicking outside of the modal

import { useEffect } from 'react'

const useOutsideClick = (ref, callback) => {
  useEffect(() => {
    const handleClick = (e) => {
      if (!ref || ref.contains(e.target)) {
        return
      }
      callback()
    }
    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [ref, callback])
}

export default useOutsideClick
