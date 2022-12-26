// Recoil import
import { Garbage, MinusPicto, PlusPicto } from '@/assets/svg/SvgIndex'
import { hitsConfig } from '@/config/hitsConfig'
import get from 'lodash/get'
import Price from '../hits/components/Price'

// Import cart from recoil
import {
  addToCartSelector,
  cartOpen,
  cartState,
  removeToCartSelector,
} from '@/config/cartFunctions'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

//Use Translation
import { windowSize } from '@/hooks/useScreenSize'
import { useTranslation } from 'react-i18next'

const ArticlesCard = ({ item, sendEvent }) => {
  const [cart, setCart] = useRecoilState(cartState)
  const setCartOpen = useSetRecoilState(cartOpen)
  const setAddToCartAtom = useSetRecoilState(addToCartSelector)
  const setRemoveToCartAtom = useSetRecoilState(removeToCartSelector)
  const { mobile } = useRecoilValue(windowSize)

  // Import const translation
  // Use the translator
  const { t } = useTranslation('translation', {
    keyPrefix: 'cartModal',
  })

  // Get hit attribute from config file
  const { image, productName, brand, sizeFilter, colour, colourHexa } =
    hitsConfig

  return (
    <>
      <div
        className={
          mobile ? 'articles__item articles__item-mobile' : 'articles__item'
        }
      >
        <div className="image-wrapper">
          <img
            src={get(item, image)}
            loading="lazy"
            alt={get(item, productName)}
          />
        </div>

        <div className="infos">
          <p className="brand">{get(item, brand)}</p>
          <p className="productName">{get(item, productName)}</p>
          {get(item, sizeFilter) && (
            <p className="size">
              {t('sizeTitle')}:
              <span>
                {
                  get(item, sizeFilter)[
                    Math.floor(Math.random() * get(item, sizeFilter).length)
                  ]
                }
              </span>
            </p>
          )}

          {get(item, colour) && (
            <div className="colors">
              <p>{t('colorTitle')}:</p> <span>{get(item, colour)}</span>{' '}
              {get(item, colourHexa) && (
                <span
                  className="colors__badge"
                  style={{ background: get(item, colourHexa).split(';')[1] }}
                ></span>
              )}
            </div>
          )}
          <p className="price">
            <Price hit={item.totalPrice.toFixed(2)} />
          </p>
        </div>

        <div className="articles__IconWrapper">
          <div className="icons">
            <div
              className="minusIcon"
              onClick={() => {
                if (item.qty === 1) {
                  if (cart.length === 1) {
                    // Remove all in local storage
                    localStorage.removeItem('myCart')
                  }
                  setCart((cart) =>
                    // Remove article in cart
                    cart.filter((it) => it.objectID !== item.objectID)
                  )
                }
                setRemoveToCartAtom(item)
              }}
            >
              <MinusPicto />
            </div>
            <p>{item.qty}</p>
            <div
              className="plusIcon"
              onClick={() => {
                sendEvent('conversion', item, 'Cart: Add to cart')
                setAddToCartAtom(item)
              }}
            >
              <PlusPicto />
            </div>
          </div>
        </div>
        <div
          className="articles__removeProduct"
          onClick={() => {
            setCartOpen(true)
            setCart((cart) =>
              // Remove one product in cart
              cart.filter((it) => it.objectID !== item.objectID)
            )
            // Remove all in local storage
            localStorage.removeItem('myCart')
          }}
        >
          <Garbage />
        </div>
      </div>
    </>
  )
}

export default ArticlesCard
