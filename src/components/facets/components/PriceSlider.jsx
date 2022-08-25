// Render the Price Slider used in the Refinement List
// Import Debounce
import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
// https://www.npmjs.com/package/rc-slider
// rc-slider
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useRange } from 'react-instantsearch-hooks-web';
// import Currency from recoil
import { currencySymbolAtom } from '@/config/currencyConfig';
import { useRecoilValue } from 'recoil';
import { showNetworkErorrs } from '@/config/demoGuideConfig';

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

  const setNetworkErrors = useSetRecoilState(showNetworkErorrs);

  // If the slider is ready to work set the values
  // Reset function to reset the slider
  useEffect(() => {
    if (start[0] === -Infinity && start[1] === Infinity) {
      setMinSlider(minValue);
      setMaxSlider(maxValue);
    }
  }, [start]);

  useEffect(() => {
    setChange(true);
    if (maxSlider - 6 <= minSlider) {
      // console.log('if maxSlider');
      setMaxSlider(minSlider + 6);
    } else {
      // console.log('else maxSlider');
      // setNetworkErrors(false);
      handleRefinement();
      // setTimeout(() => {
      //   setNetworkErrors(true);
      // }, 1000);
    }
  }, [maxSlider]);

  useEffect(() => {
    setChange(true);
    if (minSlider + 6 >= maxSlider) {
      // console.log('debut du if minSlider', minSlider);
      let newMax = minSlider + 6;
      // console.log('newMin', newMax);
      setMaxSlider(newMax);
      // console.log('fin du if minSlider', minSlider);
    } else {
      // console.log('else minSlider', minSlider);
      setNetworkErrors(false);
      handleRefinement();
      setTimeout(() => {
        setNetworkErrors(true);
      }, 1000);
    }
  }, [minSlider]);

  useEffect(() => {
    console.log('change', change, minSlider, maxSlider, min, max);
  }, [change, start]);

  const handleRefinement = () => {
    // console.log('Handle refinement');
    let top = maxSlider;
    let bot = minSlider === 0 ? 1 : minSlider;
    // console.log('top', top);
    // console.log('bot', bot);
    // if (bot + 5 >= maxSlider) {
    //   console.log('handleRefinement if');
    //   top = bot + 6;
    // }
    if (bot < top) {
      // console.log('if handle', bot, top);
      refine([bot, top]);
    }
  };

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
          }}
        >
          <div className="filters-container__pricecontainer__inputs">
            <p>Min:</p>
            <input
              type="number"
              placeholder={0}
              value={minSlider}
              onChange={(e) => {
                setMinSlider(parseInt(e.target.value));
              }}
            />
          </div>
          <div className="filters-container__pricecontainer__inputs">
            <p>Max:</p>
            <input
              type="number"
              placeholder={100}
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
              }}
            >
              Valider
            </button>
          </div>
        </form>
        <div className="filters-container__pricecontainer__prices">
          <p>
            {!isCurrencyRight && currency}
            {minSlider || 0}
            {isCurrencyRight && currency}
          </p>
          <p>
            {!isCurrencyRight && currency}
            {maxSlider || 100}
            {isCurrencyRight && currency}
          </p>
        </div>
        <Slider
          range
          min={min}
          max={max}
          // value={change ? [minSlider, maxSlider] : [min, max]}
          onChange={(e) => {
            // console.log(change, minSlider, maxSlider, min, max);
            if (e[0] <= e[1]) {
              setMinSlider(e[0]);
              setMaxSlider(e[1]);
              setChange(true);
            }
          }}
        />
      </div>
    </div>
  );
}

export default PriceSlider;
