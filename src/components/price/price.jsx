// Component for building and showing prices in the correct format

// REGEX that I might use
// (USD|EUR|€|\$|£)\s?(\d{1,}(?:[.,]*\d{3})*(?:[.,]*\d*))|(\d{1,3}(?:[.,]*\d*)*(?:[.,]*\d*)?)\s?(USD|EUR)

// Recoil
import { useRecoilValue } from 'recoil';

import { hitsConfig } from '@/config/hitsConfig';

const { price } = hitsConfig;

import get from 'lodash/get';

const PriceBuilder = ({ hit }) => {
  const currencySymbol = useRecoilValue(currencySymbolAtom);
  const displayCurrency = useRecoilValue(shouldDisplayCurrency);

  switch (currencySymbol) {
    case '£':
      return (
        <p className="price">
          {displayCurrency && currencySymbol}
          {get(hit, price)}
        </p>
      );
    case '€':
      return (
        <p className="price">
          {get(hit, price).replace(/[,.]/g, (m) => (m === ',' ? '.' : ','))}
          {displayCurrency && currencySymbol}
        </p>
      );
    default:
      return (
        <p className="price">
          {displayCurrency && currencySymbol}
          {get(hit, price)}
        </p>
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
