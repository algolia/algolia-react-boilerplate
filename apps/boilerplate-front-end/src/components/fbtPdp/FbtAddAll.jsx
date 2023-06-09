import { addToCartSelector, cartOpen } from '@/config/cartFunctions'
import { currencySymbolAtom } from '@/config/currencyConfig'
import { hitsConfig } from '@/config/hitsConfig'
import get from 'lodash/get'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import { CartPicto } from '@/assets/svg/SvgIndex'

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

const FbtAddAll = ({ items }) => {
  const setAddToCartAtom = useSetRecoilState(addToCartSelector)
  const currencySymbol = useRecoilValue(currencySymbolAtom)
  const [priceTotal, setPriceTotal] = useState(0)
  const [addToCartIsClicked, setAddToCartIsClicked] = useState(false)
  const [cartOpenValue, setCartOpenValue] = useRecoilState(cartOpen)

  useEffect(() => setPriceTotal(computePriceTotal(items)), [items])

  const { t } = useTranslation('translation', {
    keyPrefix: 'pdp',
  })

  return (
    <div className="fbt-infos">
      <div className="fbt-infos__price">
        <p>{t('addFbtTotal')}: </p>
        <p>
          {currencySymbol}
          {priceTotal}
        </p>
      </div>

      <button
        type="button"
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
      </button>
    </div>
  )
}

export default FbtAddAll
