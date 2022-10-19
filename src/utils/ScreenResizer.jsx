import { useSetRecoilState } from 'recoil'

import { useEffect } from 'react'
import { windowSize } from '@/hooks/useScreenSize'

const ScreenResizer = () => {
  const setWindowSize = useSetRecoilState(windowSize)

  const handleResize = () => {
    // Set screen size and return true or false
    const view = Math.min(screen.width, window.innerWidth)

    setWindowSize({
      laptop: view >= 1440,
      laptopXS: view > 820 && view < 1440,
      tablet: view >= 480 && view <= 820,
      mobile: view < 480,
      isDesktop: view >= 1440 || (view > 820 && view < 1440),
    })
  }

  useEffect(() => {
    // Add event listener
    window.addEventListener('resize', handleResize)

    // Call handler right away so state gets updated with initial window size
    handleResize()

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, []) // Empty array ensures that effect is only run on mount

  return <></>
}

export default ScreenResizer
