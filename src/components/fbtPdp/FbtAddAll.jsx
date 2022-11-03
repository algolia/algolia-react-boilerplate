import { addToCartSelector, cartOpen } from '@/config/cartFunctions'
import { currencySymbolAtom } from '@/config/currencyConfig'
import { hitsConfig } from '@/config/hitsConfig'
import get from 'lodash/get'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import { CartPicto } from '@/assets/svg/SvgIndex'
import { PredictZone, usePredict } from '@algolia/predict-react'
import PromotionCodeBanner from '../predict/PromotionCodeBanner'

const computePriceTotal = (items) => {
  const { price } = hitsConfig
  let sum = 0
  items.map((item) => {
    sum += get(item, price)
    return sum
  })
  return sum.toFixed(2)
}

const numberOfHits = (items) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'pdp',
  })

  return t('fbtButtonAdd')[items.length - 1]
}

const FbtAddAll = ({ items, currentCartTotal, totalFbtProductsAmount }) => {
  const setAddToCartAtom = useSetRecoilState(addToCartSelector)
  const currencySymbol = useRecoilValue(currencySymbolAtom)
  const [priceTotal, setPriceTotal] = useState(0)
  const [isUserEligible, setIsUserEligible] = useState(false)
  const [addToCartIsClicked, setAddToCartIsClicked] = useState(false)
  const [cartOpenValue, setCartOpenValue] = useRecoilState(cartOpen)

  useEffect(() => setPriceTotal(computePriceTotal(items)), [items])

  const { t } = useTranslation('translation', {
    keyPrefix: 'pdp',
  })

  const { orderValue } = usePredict()

  useEffect(() => {
    if (checkIfUserEligible() && !isUserEligible) {
      setIsUserEligible(true)
    } else {
      if (isUserEligible) {
        setIsUserEligible(false)
      }
    }
  }, [currentCartTotal])

  const checkIfUserEligible = () => {
    // Check if the total in the cart is more than the predicted order value
    const isOverOrderValue = currentCartTotal > orderValue

    // Logging for explainations
    // Here on purpose
    console.log(
      'current cart value',
      currentCartTotal.toFixed(2),
      '\ntotal if all recommendations purchased',
      (currentCartTotal + totalFbtProductsAmount).toFixed(2),
      '\npredicted order value',
      orderValue
    )
    if (currentCartTotal > orderValue) {
      console.log(
        'The current cart total, plus the FBT recommendation would be within 5% of less of the predicted order value.\nIn this case, the user might need an incentive, so we give 10% off if they add all the FBT items to cart'
      )
    } else if (
      currentCartTotal + totalFbtProductsAmount >
      orderValue - orderValue * 0.05
    ) {
      console.log(
        'The current cart total is already over the predicted order value, this user definately needs an incentive, we offer the 10% off the combination of the FBT recommendations'
      )
    }

    // If the cart is over the order value or if the cart plus the recommendations are over the order value
    // We take 5% off the order total because it's ok to get the user close to it, no need for exactly
    return (
      isOverOrderValue ||
      currentCartTotal + totalFbtProductsAmount > orderValue - orderValue * 0.05
    )
  }

  return (
    <div className="fbt-infos">
      <PredictZone name="Free shipping banner" when={checkIfUserEligible}>
        <PromotionCodeBanner
          cartValue={currentCartTotal}
          valueToAdd={totalFbtProductsAmount}
        />
      </PredictZone>
      <div className="fbt-infos__price">
        <p>{t('addFbtTotal')}: </p>
        <p>
          {currencySymbol}
          {!isUserEligible
            ? priceTotal
            : (priceTotal - priceTotal * 0.1).toFixed(2)}
        </p>
      </div>

      <a
        className={
          addToCartIsClicked
            ? 'fbt-infos__btn fbt-infos__btn-active'
            : 'fbt-infos__btn'
        }
        // className="fbt-infos__btn"
        onClick={(e) => {
          e.stopPropagation()
          items.map((item) => {
            return setAddToCartAtom(item)
          })
          setAddToCartIsClicked(true)
          setCartOpenValue(!cartOpenValue)
          setTimeout(() => setAddToCartIsClicked(false), 300)
        }}
      >
        <CartPicto />
        <p>{numberOfHits(items)}</p>
      </a>
    </div>
  )
}

export default FbtAddAll
