// Import Debounce
import debounce from 'lodash.debounce';
import React, { useState, useCallback, useEffect } from 'react';
// https://www.npmjs.com/package/rc-slider
// rc-slider
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import { connectRange } from 'react-instantsearch-dom';

const RangeSlider = ({
  min,
  max,
  canRefine,
  currentRefinement,
  refine,
  title,
}) => {
  const [minSlider, setMinSlider] = useState(min);
  const [maxSlider, setMaxSlider] = useState(max);
  const [change, setChange] = useState(false);
  useEffect(() => {
    if (canRefine) {
      setMinSlider(currentRefinement.min);
      setMaxSlider(currentRefinement.max);
    }
  }, [currentRefinement.min, currentRefinement.max, canRefine]);

  const refineFunction = (minValue, maxValue) => {
    refine({ min: minValue, max: maxValue });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
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
};

const PriceSlider = connectRange(RangeSlider);

export default PriceSlider;
