import get from 'lodash/get'
import { hitsConfig } from '@/config/hitsConfig'
import { currencySymbolAtom } from '@/config/currencyConfig'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { addToCartSelector } from '@/config/cartFunctions'
import { useTranslation } from 'react-i18next'

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

const FbtAddAll = ({ items }) => {
  const setAddToCartAtom = useSetRecoilState(addToCartSelector);
  const currencySymbol = useRecoilValue(currencySymbolAtom);

  // Import const translation
  // Use the translator
  const { t } = useTranslation('translation', {
    keyPrefix: 'pdp',
  });
  return (
    <div className="fbt-infos">
      <div className="fbt-infos__price">
        <h1>{t('addFbtTotal')}: </h1>
        <p>
          {currencySymbol}
          {priceTotal(items)}
        </p>
      </div>
      <a
        className="fbt-infos__buttons"
        onClick={() => {
          items.map((item) => {
            return setAddToCartAtom(item);
          });
        }}
      >
        <p>{numberOfHits(items)}</p>
      </a>
    </div>
  )
}

export default FbtAddAll;
