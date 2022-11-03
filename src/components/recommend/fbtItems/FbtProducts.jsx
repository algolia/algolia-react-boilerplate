// Component for rendering the Related Products through Recommend

// Import Hit configuration for use with Recoil
import { hitsConfig } from '@/config/hitsConfig'

//  Import highlight widget from InstantSearch library
import { Highlight } from 'react-instantsearch-hooks-web'

// Import heart svg
import { CartPicto, Heart, PlusPicto } from '@/assets/svg/SvgIndex'

// import Price component
import Price from '@/components/hits/components/Price.jsx'

import { hitAtom } from '@/config/hitsConfig'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

// React-router import
import useStoreIdToLocalStorage from '@/hooks/useStoreObjectIdToLocalStorage'
import { useNavigate } from 'react-router-dom'

//Import scope SCSS
import { addToCartSelector, cartOpen } from '@/config/cartFunctions'
import { shouldHaveCartFunctionality } from '@/config/featuresConfig'
import { useState } from 'react'
import '../SCSS/recommend.scss'

const FbtItems = ({ item, index }) => {
  // const { sendEvent } = useHits()
  const navigate = useNavigate()
  const hitState = useSetRecoilState(hitAtom)
  // Get hit attribute from config file
  const { image, category, productName, objectID, brand } = hitsConfig

  // display or not the cart icons
  const shouldShowCartIcons = useRecoilValue(shouldHaveCartFunctionality)
  const [cartLogoClicked, setCartLogoClicked] = useState(false)
  const [cartOpenValue, setCartOpenValue] = useRecoilState(cartOpen)
  const setAddToCartAtom = useSetRecoilState(addToCartSelector)

  return (
    <div className="fbt-component">
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
                onClick={(e) => {
                  e.stopPropagation()
                  setCartLogoClicked(true)
                  setAddToCartAtom(item)
                  setCartOpenValue(!cartOpenValue)
                  setTimeout(() => setCartLogoClicked(false), 300)
                  // sendEvent('conversion', item, 'FbtRelated: Add to cart')
                }}
              >
                <CartPicto />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="fbt-component__plus-icon">
        <PlusPicto />
      </div>
    </div>
  )
}

export default FbtItems
