import ArticlesCard from './ArticlesCard';

import { cartOpen, cartState } from '@/config/cartFunctions';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

//Import scope SCSS
import { useRef } from 'react';
import './SCSS/cartModal.scss';

//Import config from helped navigation
import { cartClick } from '@/config/cartFunctions';
import useOutsideClickConditional from '@/hooks/useOutsideClickConditional';

//Use Translation
import { useTranslation } from 'react-i18next';

const CartModal = ({ mobile }) => {
  // Import all recoil states to show modal + Cart stored and Removed articles
  const [showCart, setShowCart] = useRecoilState(cartOpen);
  const [cartValue, setCartValue] = useRecoilState(cartState);
  // Use ref on click modal and on cart icon + hamburger
  const cartModal = useRef();
  const cartIcon = useRecoilValue(cartClick);

  //Listen for click outside the Demo Guide panel
  useOutsideClickConditional(cartModal, cartIcon, () => setShowCart(false));

  // Import const translation
  // Use the translator
  const { t } = useTranslation('translation', {
    keyPrefix: 'cartModal',
  });

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
        {t('title')}{' '}
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
      {cartValue.length === 0 && <p>{t('emptyCart')}</p>}
      {cartValue.length !== 0 && (
        <a
          className="modal-container__button"
          onClick={() => {
            setCartValue([]);
            localStorage.removeItem('myCart');
          }}
        >
          {t('emptyCart')}
        </a>
      )}
    </div>
  );
};

export default CartModal;
