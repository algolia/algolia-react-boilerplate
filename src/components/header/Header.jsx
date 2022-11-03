// This component decides which type of Header to render
import { memo } from 'react'

// Import Hook for a Sticky Header
import { windowSize } from '@/hooks/useScreenSize'
import { useRecoilValue } from 'recoil'

// Import 2 kind of Headers
import HeaderLaptop from '@/components/header/components/HeaderLaptop'
import HeaderMobile from '@/components/header/components/HeaderMobile'

//Import scope SCSS
import { shouldHaveOpenFederatedSearch } from '@/config/federatedConfig'
import usePreventScrolling from '@/hooks/usePreventScrolling'
import './SCSS/header.scss'

const Header = () => {
  // Handle screen sizing & responsiveness with this hook
  const { isDesktop, tablet, mobile } = useRecoilValue(windowSize)
  const isFederatedOpen = useRecoilValue(shouldHaveOpenFederatedSearch)

  usePreventScrolling(isFederatedOpen)

  // Render the Header for Laptop or Mobile, depending on the size of the screen
  return (
    <header className="header">
      {isDesktop ? (
        <HeaderLaptop />
      ) : (
        <HeaderMobile tablet={tablet} mobile={mobile} />
      )}
    </header>
  )
}

export default memo(Header)
