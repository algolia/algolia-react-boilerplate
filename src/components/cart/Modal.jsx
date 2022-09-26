import ArticlesCard from './ArticlesCard';

import { cartState } from '@/config/cartFunctions';
import { useRecoilState, useRecoilValue } from 'recoil';

//Import scope SCSS
import './SCSS/cartModal.scss';

const Modal = () => {
  const [cartValue, setCartValue] = useRecoilState(cartState);
  const showCart = useRecoilValue(cartState);
  return (
    <div className="modal-container">
      <h3 className="modal-container__title">
        My Cart{' '}
        {showCart?.length > 0 && (
          <span className="modal-container__title">({showCart.length})</span>
        )}
      </h3>
      <div className="modal-container__line"></div>
      {cartValue.map((item, i) => {
        return <ArticlesCard item={item} key={i} />;
      })}
      {cartValue.length === 0 && <p>Your cart is empty</p>}
      {cartValue.length !== 0 && (
        <a
          className="modal-container__button"
          onClick={() => {
            setCartValue([]);
            localStorage.removeItem('myCart');
          }}
        >
          Empty my cart
        </a>
      )}
    </div>
  );
};

export default Modal;
