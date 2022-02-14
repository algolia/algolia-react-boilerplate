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

  const refineFunction = () => {
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
            setMinSlider(e[0]);
            setMaxSlider(e[1]);
            if (
              currentRefinement.min !== minSlider ||
              currentRefinement.max !== maxSlider
            ) {
              console.log('IF');
              debouncedRefine();
            }
          }}
        />
      </div>
    </div>
  );
};

const PriceSlider = connectRange(RangeSlider);

export default PriceSlider;
