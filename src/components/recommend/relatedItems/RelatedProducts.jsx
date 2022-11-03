// Component for rendering the Related Products through Recommend

// Import Hit configuration for use with Recoil
import { hitsConfig } from '@/config/hitsConfig'

//  Import highlight widget from InstantSearch library
import { Highlight } from 'react-instantsearch-hooks-web'

// Import heart svg
import { CartPicto, Heart } from '@/assets/svg/SvgIndex'

// import Price component
import Price from '@/components/hits/components/Price.jsx'

import { hitAtom } from '@/config/hitsConfig'
import { useRecoilValue, useSetRecoilState } from 'recoil'

// React-router import
import useStoreIdToLocalStorage from '@/hooks/useStoreObjectIdToLocalStorage'
import { useNavigate } from 'react-router-dom'

//Import scope SCSS
import { addToCartSelector, cartClick } from '@/config/cartFunctions'
import { shouldHaveCartFunctionality } from '@/config/featuresConfig'
import { useState } from 'react'
import '../SCSS/recommend.scss'

const RelatedItem = ({ item }) => {
  const navigate = useNavigate()
  const hitState = useSetRecoilState(hitAtom)
  // Get hit attribute from config file
  const { image, category, productName, objectID, brand } = hitsConfig

  // display or not the cart icons
  const shouldShowCartIcons = useRecoilValue(shouldHaveCartFunctionality)
  const [cartLogoClicked, setCartLogoClicked] = useState(false)
  const setAddToCartAtom = useSetRecoilState(addToCartSelector)

  const setCartIcon = useSetRecoilState(cartClick)

  return (
    <div className="relatedItem">
      <div
        className="relatedItem__imgWrapper"
        onClick={() => {
          hitState(item)
          navigate(`/search/product/${item[objectID]}`)
          useStoreIdToLocalStorage(item[objectID])
        }}
      >
        <img src={item[image]} loading="lazy" alt={item[category]} />
        <div className="relatedItem__imgWrapper__heart">
          <Heart />
        </div>
      </div>
      <div className="relatedItem__infos">
        <div className="relatedItem__infosUp">
          <p className="brand">{item[brand]}</p>
          <h3 className="productName">
            <Highlight hit={item} attribute={productName} />
          </h3>
        </div>
        <div className="item__infos-down">
          <p className="price">
            <Price hit={item} />
          </p>
          {shouldShowCartIcons && (
            <div
              className={cartLogoClicked ? 'cart cart-active' : 'cart'}
              ref={setCartIcon}
              onClick={(e) => {
                e.stopPropagation()
                setCartLogoClicked(false)
                setTimeout(() => setCartLogoClicked(false), 300)
                setAddToCartAtom(item)
              }}
            >
              <CartPicto />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default RelatedItem
