// Render the Price Slider used in the Refinement List
// Import Debounce
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
// https://www.npmjs.com/package/rc-slider
// rc-slider
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
// Import the range function from IS hook
import { useRange } from 'react-instantsearch-hooks-web'
// import Currency from recoil
import { currencySymbolAtom } from '@/config/currencyConfig'
import { showNetworkErorrs } from '@/config/demoGuideConfig'
import { useRecoilValue } from 'recoil'

//Use Translation
import { useTranslation } from 'react-i18next'

function PriceSlider(props) {
  // Import const from hooks
  const { range: rangeHook, refine, start } = useRange(props)
  // Define the min and max values for the slider
  const { min, max } = rangeHook
  // Rename the value for our usage
  const minValue = min
  const maxValue = max

  // Set the state of the slider
  const [minSlider, setMinSlider] = useState(min)
  const [maxSlider, setMaxSlider] = useState(max)

  // Call the currency configuration
  const currency = useRecoilValue(currencySymbolAtom)
  const isCurrencyRight = '€' === currency

  // Import const translation
  // Use the translator
  const { t } = useTranslation('translation', {
    keyPrefix: 'priceFacet',
  })

  const [networkErrors, setNetworkErrors] = useRecoilState(showNetworkErorrs)

  // If the slider is ready to work set the values
  useEffect(() => {
    if (start[0] === -Infinity && start[1] === Infinity) {
      setMinSlider(minValue)
      setMaxSlider(maxValue)
    }
  }, [start])

  // Reset function of refinement with condition and refine
  useEffect(() => {
    if (maxSlider - 2 <= minSlider) {
    } else {
      // When you remove the value in the slider input, it prevents the fact if it's not a number it forces to be at 0
      isNaN(maxSlider) && setMaxSlider(minSlider)
      const isErrorsOn = networkErrors
      isErrorsOn && setNetworkErrors(false)

      handleRefinement()

      isErrorsOn &&
        setTimeout(() => {
          setNetworkErrors(true)
        }, 1000)
    }
  }, [maxSlider])

  // Reset function of refinement with condition and refine
  useEffect(() => {
    if (minSlider + 2 >= maxSlider) {
    } else {
      const isErrorsOn = networkErrors
      isErrorsOn && setNetworkErrors(false)

      handleRefinement()

      isErrorsOn &&
        setTimeout(() => {
          setNetworkErrors(true)
        }, 1000)
    }
  }, [minSlider])

  // Refinement function
  const handleRefinement = () => {
    let top = maxSlider
    let bot = minSlider === 0 ? 1 : minSlider
    if (bot + 1 >= maxSlider) top = bot + 2
    if (bot < top) refine([bot, top])
  }

  return (
    <div className="filters-container">
      <div className="filters-container__title">
        <h3>{t('title')}</h3>
      </div>
      <div className="filters-container__pricecontainer">
        <form className="filters-container__pricecontainer__form">
          <div className="filters-container__pricecontainer__inputs">
            {!isCurrencyRight && <span>{currency}</span>}
            <input
              type="text"
              // When you remove the value in the slider input, it prevents the fact if it's not a number it forces to be at 0
              value={isNaN(minSlider) ? 0 : minSlider}
              onChange={(e) => {
                setMinSlider(parseInt(e.target.value))
              }}
            />
            {isCurrencyRight && <span>{currency}</span>}
          </div>
          <div className="filters-container__pricecontainer__inputs">
            {!isCurrencyRight && <span>{currency}</span>}
            <input
              type="text"
              value={maxSlider}
              onChange={(e) => {
                setMaxSlider(parseInt(e.target.value))
              }}
            />
            {isCurrencyRight && <span>{currency}</span>}
          </div>
        </form>
        <Slider
          range
          min={min}
          max={max}
          value={[minSlider, maxSlider]}
          onChange={(e) => {
            if (e[0] <= e[1]) {
              setMinSlider(e[0])
              setMaxSlider(e[1])
            }
          }}
        />
      </div>
    </div>
  )
}

export default PriceSlider
