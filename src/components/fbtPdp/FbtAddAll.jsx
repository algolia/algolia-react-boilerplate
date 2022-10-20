import { useEffect, useState } from 'react'
import get from 'lodash/get'
import { hitsConfig } from '@/config/hitsConfig'
import { currencySymbolAtom } from '@/config/currencyConfig'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { addToCartSelector } from '@/config/cartFunctions'
import { useTranslation } from 'react-i18next'

import { PredictZone, usePredict } from '@algolia/predict-react'
import PromotionCodeBanner from '../predict/PromotionCodeBanner'

const priceTotal = (items) => {
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
  const [isUserEligible, setIsUserEligible] = useState(false)


  const { t } = useTranslation('translation', {
    keyPrefix: 'pdp',
  })

  const { orderValue, userProfile } = usePredict()

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
    // IMPORTANT - HAD TO FAKE THE ORDER VALUE UNTIL THE PREDICT TEAM CAN CREATE A USER WITH HIGH ORDER VALUE
    let fakeOrderValue = 400

    // Check if the total in the cart is more than the predicted order value
    const isOverOrderValue = currentCartTotal > fakeOrderValue

    // Logging for explainations
    console.log(
      'current cart value',
      currentCartTotal.toFixed(2),
      '\ntotal if all recommendations purchased',
      (currentCartTotal + totalFbtProductsAmount).toFixed(2),
      '\npredicted order value',
      fakeOrderValue
    )
    if (currentCartTotal > fakeOrderValue) {
      console.log(
        'The current cart total, plus the FBT recommendation would be within 5% of less of the predicted order value.\nIn this case, the user might need an incentive, so we give 10% off if they add all the FBT items to cart'
      )
    } else if (
      currentCartTotal + totalFbtProductsAmount >
      fakeOrderValue - fakeOrderValue * 0.05
    ) {
      console.log(
        'The current cart total is already over the predicted order value, this user definately needs an incentive, we offer the 10% off the combination of the FBT recommendations'
      )
    }

    // If the cart is over the order value or if the cart plus the recommendations are over the order value
    // We take 5% off the order total because it's ok to get the user close to it, no need for exactly
    return (
      isOverOrderValue ||
      currentCartTotal + totalFbtProductsAmount >
        fakeOrderValue - fakeOrderValue * 0.05
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
        <h1>{t('addFbtTotal')}: </h1>
        <p>
          {currencySymbol}
          {!isUserEligible
            ? priceTotal(items)
            : (priceTotal(items) - priceTotal(items) * 0.1).toFixed(2)}
        </p>
      </div>

      <a
        className="fbt-infos__buttons"
        onClick={() => {
          items.map((item) => {
            return setAddToCartAtom(item)
          })
        }}
      >
        <p>{numberOfHits(items)}</p>
      </a>
    </div>
  )
}

export default FbtAddAll
