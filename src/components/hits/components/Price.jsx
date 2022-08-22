// Component for building and showing prices in the correct format
// It should automatically place the currency symbol in the correct place but can be easily modified

// Recoil
import { useRecoilValue } from 'recoil';

import { hitsConfig } from '@/config/hitsConfig';

import get from 'lodash/get';

import {
  currencySymbolAtom,
  shouldDisplayCurrency,
  // TODO: Add fallback for varying types of currency number separators
  // shouldInvertPriceSeparators,
} from '@/config/currencyConfig';

// Add this function with hitPrice to convert the decimal separators ie. 1,999.99 => 1.999,99 and vice versa
// like this => {convertSeparators(hitPrice)}
const convertSeparators = (price) => {
  return price.replace(/[,.]/g, (m) => (m === ',' ? '.' : ','));
};

// TODO: Add fallback for varying types of currency number separators
// EG:
// different inputs = '10,000.56' '10.000,56' '10' '10,00'
// first detect which currency
// translated to a javascript number
// then we need to round it to 2 dp
// revert back the number to its OG currency for display

// if EUROS:
// check for , => if not add ,00
// if .** them change to ,** (ie run convertSeparators)

// if GBP or USD
// check for . => if not add .00
// if ,** them change to .** (ie run convertSeparators)

// const detectPriceFormat = (price) => {
//   const isEuropean = (price) => {
//     // check for non number at index[length-3]
//     // '10,000.56' '10.000,56' '10000' '10000000.67' '10000,67'

//     return price[price.length - 3] === ',' || price[price.length - 4] === '.';
//   };

// be in EUR => if is european
// };

const PriceBuilder = ({ hit }) => {
  const { price, onSale, onSalePrice } = hitsConfig;
  const currencySymbol = useRecoilValue(currencySymbolAtom);
  const displayCurrency = useRecoilValue(shouldDisplayCurrency);

  // TODO: Add fallback for varying types of currency number separators
  // const invertedPriceSeparators = useRecoilValue(shouldInvertPriceSeparators);

  // get the values from the data in hitsConfig
  const hitPrice = get(hit, price);
  const isOnSale = get(hit, onSale);
  const salePrice = get(hit, onSalePrice);

  // Check if the currency should be on the right, ie: if it is Euros.
  // You can add other currencies to this array if you want them on the right of your price
  const rightCurrencies = ['€', 'kr'];

  const isCurrencyRight = rightCurrencies.includes(currencySymbol);
  // Variable used to show the correct price depending on the item being 'on sale' or not
  const userPaysPrice = isOnSale ? salePrice : hitPrice;

  return (
    <>
      {!isCurrencyRight && currencySymbol && displayCurrency}
      {userPaysPrice}
      {isCurrencyRight && currencySymbol && displayCurrency}
      {isOnSale && (
        <strike>
          {' '}
          {!isCurrencyRight && currencySymbol && displayCurrency}
          {hitPrice}
          {isCurrencyRight && currencySymbol && displayCurrency}
        </strike>
      )}
    </>
  );
};

const Price = ({ hit }) => {
  return <PriceBuilder hit={hit} />;
};

export default Price;
