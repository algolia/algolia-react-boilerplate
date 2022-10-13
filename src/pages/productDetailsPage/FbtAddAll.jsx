import get from 'lodash/get';
import { hitsConfig } from '@/config/hitsConfig';
import { currencySymbolAtom } from '@/config/currencyConfig';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { addToCartSelector } from '@/config/cartFunctions';

const priceTotal = (items) => {
  const { price } = hitsConfig;
  let sum = 0;
  items.map((item) => {
    sum += get(item, price);
    return sum;
  });
  return sum.toFixed(2);
};

const numberOfHits = (items) => {
  switch (items.length) {
    case 1:
      return 'Add this article to cart';
      break;
    case 2:
      return 'Add all two to cart';
      break;
    case 3:
      return 'Add all three to cart';
      break;
    case 4:
      return 'Add all four to cart';
      break;
    default:
      break;
  }
};

const FbtAddAll = ({ items }) => {
  const setAddToCartAtom = useSetRecoilState(addToCartSelector);
  const currencySymbol = useRecoilValue(currencySymbolAtom);
  return (
    <div className="fbt-infos">
      <div className="fbt-infos__price">
        <h1>Total price: </h1>
        <p>
          {currencySymbol}
          {priceTotal(items)}
        </p>
      </div>
      <a
        className="fbt-infos__buttons"
        onClick={() => {
          items.map((item) => {
            return setAddToCartAtom(item);
          });
        }}
      >
        <p>{numberOfHits(items)}</p>
      </a>
    </div>
  );
};

export default FbtAddAll;
