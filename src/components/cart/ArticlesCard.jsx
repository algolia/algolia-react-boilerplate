// Recoil import
<<<<<<< Updated upstream
import { Garbage, MinusEmptyIcon, PlusEmptyIcon } from '@/assets/svg/SvgIndex';
import { hitsConfig } from '@/config/hitsConfig';
import get from 'lodash/get';
=======
import { currencySymbolAtom } from '@/config/currencyConfig'
import { Garbage, MinusEmptyIcon, PlusEmptyIcon } from '@/assets/svg/SvgIndex'
import { hitsConfig } from '@/config/hitsConfig'
import get from 'lodash/get'
>>>>>>> Stashed changes

// Import cart from recoil
import {
  addToCartSelector,
  cartState,
  removeToCartSelector,
<<<<<<< Updated upstream
} from '@/config/cartFunctions';
import { useRecoilState, useSetRecoilState } from 'recoil';
=======
} from '@/config/cartFunctions'
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil'
>>>>>>> Stashed changes

//Use Translation
import { useTranslation } from 'react-i18next'

const ArticlesCard = ({ item, sendEvent }) => {
<<<<<<< Updated upstream
  const [cart, setCart] = useRecoilState(cartState);
  const setAddToCartAtom = useSetRecoilState(addToCartSelector);
  const setRemoveToCartAtom = useSetRecoilState(removeToCartSelector);
=======
  const currencySymbol = useRecoilValue(currencySymbolAtom)
  const [cart, setCart] = useRecoilState(cartState)
  const setAddToCartAtom = useSetRecoilState(addToCartSelector)
  const setRemoveToCartAtom = useSetRecoilState(removeToCartSelector)
>>>>>>> Stashed changes

  // Import const translation
  // Use the translator
  const { t } = useTranslation('translation', {
    keyPrefix: 'cartModal',
  })

  // Get hit attribute from config file
  const {
    objectID,
    image,
    imageAlt,
    category,
    productName,
    brand,
    price: priceForTotal,
    sizeFilter,
    colour,
  } = hitsConfig

  return (
    <div>
      <div className="articles-card">
        <img src={get(item, image)} alt="" />
        <div className="articles-card__infos">
          <h3>{get(item, category)}</h3>
          <p>{get(item, productName)}</p>
          <div className="articles-card__infos__details">
            {get(item, sizeFilter) && (
              <div className="articles-card__infos__details__size">
                <p>
                  {t('sizeTitle')}{' '}
                  <span>
                    {
                      get(item, sizeFilter)[
                        Math.floor(Math.random() * get(item, sizeFilter).length)
                      ]
                    }
                  </span>
                </p>
              </div>
            )}
            {get(item, colour) && (
              <div className="articles-card__infos__details__size">
                <p>
                  {t('colorTitle')} <span>{get(item, colour)}</span>
                </p>
              </div>
            )}
          </div>
          <div className="articles-card__infos__qtyprice">
            <div className="articles-card__infos__qtyprice__plus-minus">
              <div
                className="articles-card__infos__qtyprice__plus-minus__icons"
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
                <MinusEmptyIcon />
              </div>
              <p>{item.qty}</p>
              <div
                className="articles-card__infos__qtyprice__plus-minus__icons"
                onClick={() => {
                  sendEvent('conversion', item, 'Cart: Add to cart')
                  setAddToCartAtom(item)
                }}
              >
                <PlusEmptyIcon />
              </div>
            </div>
            <div className="articles-card__infos__qtyprice__price">
              <p>${item.totalPrice.toFixed(2)}</p>
            </div>
          </div>
        </div>
        <div
          className="articles-card__remove"
          onClick={() => {
            setCart((cart) =>
              // Remove all in cart
              cart.filter((it) => it.objectID !== item.objectID)
            )
            // Remove all in local storage
            localStorage.removeItem('myCart')
          }}
        >
          <Garbage />
        </div>
      </div>
      <div className="articles-card__line"></div>
    </div>
  )
}

export default ArticlesCard
