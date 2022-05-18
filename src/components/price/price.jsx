// Recoil
import { useRecoilValue } from 'recoil';

import { hitsConfig } from '@/config/hitsConfig';

const { price } = hitsConfig;

import get from 'lodash/get';

import {
  currencySymbolAtom,
  shouldDisplayCurrency,
} from '@/config/currencyConfig';

const Price = ({ hit }) => {
  const currencySymbol = useRecoilValue(currencySymbolAtom);
  const displayCurrency = useRecoilValue(shouldDisplayCurrency);

  return (
    <p className="price">
      {displayCurrency && currencySymbol}
      {get(hit, price)}
    </p>
  );
};

export default Price;
