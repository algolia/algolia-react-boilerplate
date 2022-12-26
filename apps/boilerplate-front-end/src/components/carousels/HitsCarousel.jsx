import get from 'lodash/get'
import { useState } from 'react'

import { CartPicto } from '@/assets/svg/SvgIndex'
import { hitAtom, hitsConfig } from '@/config/hitsConfig'
import Price from '../hits/components/Price'

// Display or not cart icons
import { shouldHaveCartFunctionality } from '@/config/featuresConfig'

import { useNavigate } from 'react-router-dom'
import { useRecoilValue, useSetRecoilState } from 'recoil'

// Import cart from recoil(Cart state and the event if it's removed)
import { addToCartSelector } from '@/config/cartFunctions'

const HitsCarousel = ({ hit, sendEvent }) => {
  const { objectID, image, productName, brand } = hitsConfig
  const [hovered, setHovered] = useState(false)
  const [cartLogoClicked, setCartLogoClicked] = useState(false)
  const setAddToCartAtom = useSetRecoilState(addToCartSelector)

  // Navigate is used by React Router
  const navigate = useNavigate()

  // Hits are imported by Recoil
  const hitState = useSetRecoilState(hitAtom)

  // display or not the cart icons
  const shouldShowCartIcons = useRecoilValue(shouldHaveCartFunctionality)

  return (
    <div
      className="item"
      onMouseEnter={() => {
        setHovered(true)
      }}
      onMouseLeave={() => {
        setHovered(false)
      }}
    >
      <div
        className={`${
          hovered ? 'carousel__imageWrapper hovered' : 'carousel__imageWrapper'
        }`}
      >
        <img
          src={get(hit, image)}
          alt={get(hit, productName)}
          onError={(e) => (e.currentTarget.src = placeHolderError)}
        />
      </div>
      <div className="item__infos">
        <div
          className="item__infos-up"
          onClick={() => {
            hitState(hit)
            // navigate to the product show page
            navigate(`/search/product/${hit[objectID]}`)
            sendEvent('click', hit, 'Homepage: Product clicked')
          }}
        >
          <p className="brand">{get(hit, brand)}</p>
          <p className="name">{get(hit, productName)}</p>
        </div>
        <div className="item__infos-down">
          <p className="price">
            <Price hit={hit} />
          </p>
          {shouldShowCartIcons && (
            <div
              className={cartLogoClicked ? 'cart cart-active' : 'cart'}
              onClick={(e) => {
                e.stopPropagation()
                setCartLogoClicked(true)
                setTimeout(() => setCartLogoClicked(false), 300)
                setAddToCartAtom(hit)
                sendEvent('conversion', hit, 'Homepage: Add to cart')
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

export default HitsCarousel
