// https://www.algolia.com/doc/ui-libraries/predict/api-reference/predict-react/PredictZone/
import { usePredictZone, usePredict } from '@algolia/predict-react'

function PromotionCodeBanner({ cartValue, valueToAdd }) {
    const { dismissZone } = usePredictZone();
    const { orderValue = 0 } = usePredict();

    const newTotalValueIncludingDiscount = (cartValue + (valueToAdd - (valueToAdd * .1))).toFixed(2)
  
    return (
      <div>
            <div>Buy all three and get 10% discount applied directly to your order! Your new total will be ${newTotalValueIncludingDiscount}</div>
        {/* <button
          onClick={() => {
            dismissZone();
            // Apply the promo code.
          }}
        >
        </button> */}
      </div>
    );
  }
export default PromotionCodeBanner;