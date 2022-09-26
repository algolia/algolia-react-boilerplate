import ArticlesCard from './ArticlesCard';

import { cartOpen, cartState } from '@/config/cartFunctions';
import { useRecoilState, useRecoilValue } from 'recoil';

//Import scope SCSS
import { useRef } from 'react';
import './SCSS/cartModal.scss';

//Import config from helped navigation
import { cartClick, clickHamburger } from '@/config/cartFunctions';
import useOutsideClickTwoConditionals from '@/hooks/useOutsideClickTwoConditions';

const Modal = ({ mobile, isDesktop }) => {
  const [showCart, setShowCart] = useRecoilState(cartOpen);
  const [cartValue, setCartValue] = useRecoilState(cartState);
  const cartModal = useRef();
  const cartIcon = useRecoilValue(cartClick);
  const hamburgerIcon = useRecoilValue(clickHamburger);
  //Listen for click outside the Demo Guide panel
  useOutsideClickTwoConditionals(cartModal, cartIcon, hamburgerIcon, () =>
    setShowCart(!showCart)
  );
  return (
    <div
      className={`${mobile ? 'modal-container-mobile' : 'modal-container'}`}
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
