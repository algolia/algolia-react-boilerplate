import ArticlesCard from './ArticlesCard';

import { cartState } from '@/config/cartFunctions';
import { useRecoilValue } from 'recoil';
import { useEffect } from 'react';

//Import scope SCSS
import './SCSS/cartModal.scss';

const Modal = () => {
  const cartValue = useRecoilValue(cartState);
  useEffect(() => {
    console.log(cartValue);
  }, [cartValue]);

  return (
    <div className="modal-container">
      <h3 className="modal-container__title">My Cart(3)</h3>
      <div className="modal-container__line"></div>
      {cartValue.map((item) => {
        return <ArticlesCard item={item} />;
      })}
    </div>
  );
};

export default Modal;
