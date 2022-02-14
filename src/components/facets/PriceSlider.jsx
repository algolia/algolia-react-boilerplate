// Import Debounce
import debounce from 'lodash.debounce';
import React, { useState, useCallback, useEffect } from 'react';
// https://www.npmjs.com/package/rc-slider
// rc-slider
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import { connectRange } from 'react-instantsearch-dom';

const RangeSlider = ({ min, max, currentRefinement, refine, title }) => {
  const [minSlider, setMinSlider] = useState(min);
  const [maxSlider, setMaxSlider] = useState(max);
  useEffect(() => {
    setMaxSlider(max);
    setMinSlider(min);
    return () => '';
  }, [min, max]);

  const refineFunction = (minValue, maxValue) => {
    console.log('refineFunction', minValue, maxValue);
    setMinSlider(minValue);
    setMaxSlider(maxValue);
    refine({ minSlider, maxSlider });
  };

  const debouncedRefine = useCallback(debounce(refineFunction, 100), []);

  return (
    <div className="filters-container">
      <div className="filters-container__title">
        <h3>{title}</h3>
      </div>
      <div className="filters-container__pricecontainer">
        <div className="filters-container__pricecontainer__prices">
          <p>{minSlider}</p>
          <p>{maxSlider}</p>
        </div>
        <Range
          min={min}
          max={max}
          onChange={(e) => {
            console.log('Onchange', e[0], e[1]);
            if (e[0] !== e[1]) {
              console.log(minSlider, maxSlider);
              debouncedRefine(e[0], e[1]);
            }
          }}
        />
      </div>
    </div>
  );
};

const PriceSlider = connectRange(RangeSlider);

export default PriceSlider;
