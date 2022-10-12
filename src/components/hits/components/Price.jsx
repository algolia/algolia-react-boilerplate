// Component for building and showing prices in the correct format
// It should automatically place the currency symbol in the correct place but can be easily modified

// Recoil
import { useRecoilValue } from 'recoil';

import { hitsConfig } from '@/config/hitsConfig';

import get from 'lodash/get';

import {
  currencySymbolAtom,
  shouldDisplayCurrency,
} from '@/config/currencyConfig';

const PriceBuilder = ({ hit }) => {
  const { price, onSale, onSalePrice } = hitsConfig;
  const currencySymbol = useRecoilValue(currencySymbolAtom);
  const displayCurrency = useRecoilValue(shouldDisplayCurrency);

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
      {!isCurrencyRight && displayCurrency && currencySymbol}
      {userPaysPrice}
      {isCurrencyRight && displayCurrency && currencySymbol}
      {isOnSale && (
        <s>
          {!isCurrencyRight && currencySymbol && displayCurrency}
          {hitPrice}
          {isCurrencyRight && currencySymbol && displayCurrency}
        </s>
      )}
    </>
  );
};

const Price = ({ hit }) => {
  return <PriceBuilder hit={hit} />;
};

export default Price;
