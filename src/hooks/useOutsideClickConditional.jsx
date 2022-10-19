// This is for closing federated search window when clicking outside of the modal

import { useEffect } from 'react'

const useOutsideClickConditional = (ref, optionalParameter1, callback) => {
  optionalParameter1 ||= null

  const handleClick = (e) => {
    if (
      ref.current &&
      !ref.current.contains(e.target) &&
      !optionalParameter1?.contains(e.target)
    ) {
      callback()
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  })
}

export default useOutsideClickConditional
