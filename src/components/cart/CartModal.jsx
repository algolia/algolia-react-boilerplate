import { useState } from 'react';

import ArticlesCard from './ArticlesCard';

import { cartOpen, cartState } from '@/config/cartFunctions';
import { useRecoilState, useRecoilValue } from 'recoil';

import { useEffect, useRef } from 'react';
import './SCSS/cartModal.scss';

//Import config from helped navigation
import { cartClick } from '@/config/cartFunctions';
import useOutsideClickConditional from '@/hooks/useOutsideClickConditional';


//Use Translation
import { useTranslation } from 'react-i18next';

// components
import RelatedProductsCart from './RelatedProductsCart';

import { shouldHaveRelatedProducts } from '@/config/featuresConfig';

//Import scope SCSS
import './SCSS/cartModal.scss';


const CartModal = ({ mobile }) => {
  // Import all recoil states to show modal + Cart stored and Removed articles
  const [showCart, setShowCart] = useRecoilState(cartOpen);
  const [cartValue, setCartValue] = useRecoilState(cartState);
  const [objectIds, setObjectIds] = useState([]);
  // Use ref on click modal and on cart icon + hamburger
  const cartModal = useRef();
  const cartIcon = useRecoilValue(cartClick);

  const shouldHaveRelatedProductsValue = useRecoilValue(
    shouldHaveRelatedProducts
  );

  //Listen for click outside the Demo Guide panel
  useOutsideClickConditional(cartModal, cartIcon, () => setShowCart(false));


  // Import const translation
  // Use the translator
  const { t } = useTranslation('translation', {
    keyPrefix: 'cartModal',
  });

  // Store the last object id added in the cart to use for recommend
  useEffect(() => {
    if (cartValue.length) {
      setObjectIds(cartValue.reduce((accum, obj) => [...accum, obj.objectID], []));
    }
  }, [cartValue]);


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
      {cartValue.length === 0 && <p>{t('yourCartIsEmpty')}</p>}
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
      {shouldHaveRelatedProductsValue && objectIds && cartValue.length !== 0 && (
        <RelatedProductsCart objectIds={objectIds} />
      )}
    </div>
  );
};

export default CartModal;
