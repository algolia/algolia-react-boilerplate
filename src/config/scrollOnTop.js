import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop({ children }) {
  const { pathname } = useLocation()

  useEffect(() => {
    const canControlScrollRestoration = 'scrollRestoration' in window.history
    if (canControlScrollRestoration) {
      window.history.scrollRestoration = 'manual'
    }
    setTimeout(() => {
      window.scrollTo(0, 0)
    }, 300)
  }, [pathname])

  return children
}
