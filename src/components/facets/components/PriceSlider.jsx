// Render the Price Slider used in the Refinement List
// Import Debounce
import { useEffect, useState } from 'react';
// https://www.npmjs.com/package/rc-slider
// rc-slider
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useRange } from 'react-instantsearch-hooks-web';
// import Currency from recoil
import { currencySymbolAtom } from '@/config/currencyConfig';
import { useRecoilValue } from 'recoil';

function PriceSlider(props) {
  // Import const from hooks
  const { range, canRefine, refine, start } = useRange(props);
  // Define the min and max values for the slider
  const { min, max } = range;
  // Rename the value for our usage
  const minValue = min;
  const maxValue = max;
  // Props
  const { title } = props;
  // Set the state of the slider
  const [minSlider, setMinSlider] = useState(min);
  const [maxSlider, setMaxSlider] = useState(max);
  const [change, setChange] = useState(false);
  // Call the currency configuration
  const currency = useRecoilValue(currencySymbolAtom);

  // If the slider is ready to work set the values
  useEffect(() => {
    if (canRefine) {
      setMinSlider(minValue);
      setMaxSlider(maxValue);
    }
  }, [minValue, maxValue, canRefine]);

  // Refinement function
  const refineFunction = (minValue, maxValue) => {
    refine([minValue, maxValue]);
  };

  // Reset function te reset the slider
  useEffect(() => {
    if (start[0] === -Infinity && start[1] === Infinity) {
      setMinSlider(minValue);
      setMaxSlider(maxValue);
    }
  }, [start]);

  return (
    <div className="filters-container">
      <div className="filters-container__title">
        <h3>{title}</h3>
      </div>
      <div className="filters-container__pricecontainer">
        <div className="filters-container__pricecontainer__prices">
          <p>
            {minSlider} {currency}
          </p>
          <p>
            {maxSlider} {currency}
          </p>
        </div>
        <Range
          min={min}
          max={max}
          value={change ? [minSlider, maxSlider] : [min, max]}
          onChange={(e) => {
            if (e[0] !== e[1]) {
              setMinSlider(e[0]);
              setMaxSlider(e[1]);
              setChange(true);
              setTimeout(refineFunction(e[0], e[1]), 100);
            }
          }}
        />
      </div>
    </div>
  );
}

export default PriceSlider;
