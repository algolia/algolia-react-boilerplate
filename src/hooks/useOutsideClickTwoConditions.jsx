// This is for closing federated search window when clicking outside of the modal

import { useEffect } from 'react'

const useOutsideClickTwoConditionals = (
  ref,
  optionalParameter1,
  optionalParameter2,
  callback
) => {
  optionalParameter1 ||= null
  const handleClick = (e) => {
    if (
      ref &&
      !ref.contains(e.target) &&
      !optionalParameter1.contains(e.target) &&
      !optionalParameter2.contains(e.target) &&
      !e.target.classList.contains('react-select__option')
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

export default useOutsideClickTwoConditionals
