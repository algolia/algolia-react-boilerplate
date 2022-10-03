import ArticlesCard from './ArticlesCard';

import { cartOpen, cartState, removedItem } from '@/config/cartFunctions';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

//Import scope SCSS
import { useRef } from 'react';
import './SCSS/cartModal.scss';

//Import config from helped navigation
import { cartClick } from '@/config/cartFunctions';
import useOutsideClickConditional from '@/hooks/useOutsideClickConditional';

const Modal = ({ mobile }) => {
  // Import all recoil states to show modal + Cart stored and Removed articles
  const [showCart, setShowCart] = useRecoilState(cartOpen);
  const [cartValue, setCartValue] = useRecoilState(cartState);
  const setRemoveItems = useSetRecoilState(removedItem);
  // Use ref on click modal and on cart icon + hamburger
  const cartModal = useRef();
  const cartIcon = useRecoilValue(cartClick);

  //Listen for click outside the Demo Guide panel
  useOutsideClickConditional(cartModal, cartIcon, () => setShowCart(false));

  return (
    <div
      className={`${
        mobile ? 'modal-container-mobile modal-container' : 'modal-container'
      } ${showCart ? 'modal-container-active' : ''}`}
      ref={cartModal}
    >
      {mobile && (
        <a
          className="modal-container-mobile__close"
          onClick={() => {
            setShowCart(!showCart);
          }}
        >
          x
        </a>
      )}
      <h3 className="modal-container__title">
        My Cart{' '}
        {showCart?.length > 0 && (
          <span className="modal-container__title">({showCart.length})</span>
        )}
      </h3>
      <div className="modal-container__line"></div>
      {cartValue.map((item, i) => {
        if (item.qty !== 0) {
          return <ArticlesCard item={item} key={i} />;
        }
      })}
      {cartValue.length === 0 && <p>Your cart is empty</p>}
      {cartValue.length !== 0 && (
        <a
          className="modal-container__button"
          onClick={() => {
            setCartValue([]);
            localStorage.removeItem('myCart');
            setRemoveItems([]);
          }}
        >
          Empty my cart
        </a>
      )}
    </div>
  );
};

export default Modal;
