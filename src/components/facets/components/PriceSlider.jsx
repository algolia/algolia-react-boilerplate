// Render the Price Slider used in the Refinement List
// Import Debounce
import { useEffect, useState } from 'react';
// https://www.npmjs.com/package/rc-slider
// rc-slider
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useRange } from 'react-instantsearch-hooks-web';
// import Currency from recoil
import { currencySymbolAtom } from '@/config/currencyConfig';
import { useRecoilValue } from 'recoil';

function PriceSlider(props) {
  // Import const from hooks
  const { range: rangeHook, canRefine, refine, start } = useRange(props);
  // Define the min and max values for the slider
  const { min, max } = rangeHook;
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
  const isCurrencyRight = '€' === currency;

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

  // Reset function to reset the slider
  useEffect(() => {
    if (start[0] === -Infinity && start[1] === Infinity) {
      setMinSlider(minValue);
      setMaxSlider(maxValue);
    }
  }, [start]);

  useEffect(() => {
    if (minSlider > maxSlider) {
      console.log('if');
      setMaxSlider('');
      setChange(true);
      console.log(minSlider, maxSlider);
    } else if (isNaN(maxSlider)) {
      console.log('else if');
      setMaxSlider(0);
    }
  }, [minSlider, maxSlider]);

  return (
    <div className="filters-container">
      <div className="filters-container__title">
        <h3>{title}</h3>
      </div>
      <div className="filters-container__pricecontainer">
        <form
          action=""
          onSubmit={(e) => {
            e.preventDefault();
            setChange(true);
            refineFunction(minSlider, maxSlider);
          }}
        >
          <div className="filters-container__pricecontainer__inputs">
            <p>Min:</p>
            <input
              type="number"
              value={minSlider || ''}
              placeholder="Price"
              onChange={(e) => {
                setMinSlider(parseInt(e.target.value) || 0);
              }}
            />
          </div>
          <div className="filters-container__pricecontainer__inputs">
            <p>Max:</p>
            <input
              type="number"
              placeholder="Price"
              value={maxSlider}
              onChange={(e) => {
                setMaxSlider(parseInt(e.target.value));
              }}
            />
          </div>
          <div className="filters-container__pricecontainer__button-container">
            <button
              className="filters-container__pricecontainer__button-container__button"
              onClick={() => {
                setChange(true);
                refineFunction(minSlider, maxSlider);
              }}
            >
              Valider
            </button>
          </div>
        </form>
        <div className="filters-container__pricecontainer__prices">
          <p>
            {!isCurrencyRight && currency}
            {minSlider}
            {isCurrencyRight && currency}
          </p>
          <p>
            {!isCurrencyRight && currency}
            {maxSlider}
            {isCurrencyRight && currency}
          </p>
        </div>
        <Slider
          range
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
