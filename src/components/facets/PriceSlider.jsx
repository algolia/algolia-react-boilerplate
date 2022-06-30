// Render the Price Slider used in the Refinement List
// Import Debounce
import debounce from 'lodash.debounce';
import { useState, useCallback, useEffect } from 'react';
// https://www.npmjs.com/package/rc-slider
// rc-slider
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useRange } from 'react-instantsearch-hooks-web';
// import Currency from recoil
import { useRecoilValue } from 'recoil';
import { currencySymbolAtom } from '@/config/currencyConfig';

function PriceSlider(props) {
  const { range, canRefine, refine, start } = useRange(props);
  const { min, max } = range;
  const minValue = min;
  const maxValue = max;
  const { title } = props;
  const [minSlider, setMinSlider] = useState(min);
  const [maxSlider, setMaxSlider] = useState(max);
  const [change, setChange] = useState(false);
  const currency = useRecoilValue(currencySymbolAtom);

  useEffect(() => {
    if (canRefine) {
      setMinSlider(minValue);
      setMaxSlider(maxValue);
    }
  }, [minValue, maxValue, canRefine]);

  const refineFunction = (minValue, maxValue) => {
    refine([minValue, maxValue]);
  };

  useEffect(() => {
    if (start[0] === -Infinity && start[1] === Infinity) {
      setMinSlider(minValue);
      setMaxSlider(maxValue);
    }
  }, [start]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedRefine = useCallback(debounce(refineFunction, 100), []);

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
              debouncedRefine(e[0], e[1]);
            }
          }}
        />
      </div>
    </div>
  );
}

export default PriceSlider;
