// https://www.algolia.com/doc/ui-libraries/predict/api-reference/predict-react/PredictZone/
import { usePredictZone, usePredict } from '@algolia/predict-react'

import './SCSS/promotionCodeBanner.scss'

function PromotionCodeBanner({ cartValue, valueToAdd }) {
  return (
    <div className="promotionCodeBanner">
      <p>🎉 10% Discount applied!</p>
    </div>
  )
}

export default PromotionCodeBanner
