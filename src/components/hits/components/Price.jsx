// Component for building and showing prices in the correct format
// It currently has functionality for £ $ € and defaults to putting the currency symbol first

// Recoil
import { useRecoilValue } from 'recoil';

import { hitsConfig } from '@/config/hitsConfig';

import get from 'lodash/get';

// Add this function with hitPrice to convert the decimal separators ie. 1,999.99 => 1.999,99 and vice versa
// like this => {convertSeparators(hitPrice)}
const convertSeparators = (price) => {
  return price.replace(/[,.]/g, (m) => (m === ',' ? '.' : ','));
};

const PriceBuilder = ({ hit }) => {
  const { price } = hitsConfig;
  const currencySymbol = useRecoilValue(currencySymbolAtom);
  const displayCurrency = useRecoilValue(shouldDisplayCurrency);

  const hitPrice = get(hit, price);

  switch (currencySymbol) {
    case '£' || '$':
      return (
        <>
          {displayCurrency && currencySymbol}
          {hitPrice}
        </>
      );
    case '€':
      return (
        <>
          {hitPrice}
          {displayCurrency && currencySymbol}
        </>
      );
    default:
      return (
        <>
          {displayCurrency && currencySymbol}
          {hitPrice}
        </>
      );
  }
};

import {
  currencySymbolAtom,
  shouldDisplayCurrency,
} from '@/config/currencyConfig';

const Price = ({ hit }) => {
  return <PriceBuilder hit={hit} />;
};

export default Price;
