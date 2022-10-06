import { useEffect, useRef, useState } from 'react';

// Import Recoil functions
import { useRecoilState, useRecoilValue } from 'recoil';

// Algolia imports
import { useHits } from 'react-instantsearch-hooks-web';

//Use Translation
import { useTranslation } from 'react-i18next';

// Framer Motion
import { motion } from 'framer-motion';

//Import config
import { cartOpen, cartState } from '@/config/cartFunctions';
import { cartClick } from '@/config/cartFunctions';
import { shouldHaveRelatedProducts } from '@/config/featuresConfig';
import { framerMotionTransition } from '@/config/animationConfig';

// Import hooks
import useOutsideClickConditional from '@/hooks/useOutsideClickConditional';
import { windowSize } from '@/hooks/useScreenSize';

// Components
import ArticlesCard from './ArticlesCard';
import RelatedProductsCart from './RelatedProductsCart';
import { ChevronRight } from '@/assets/svg/SvgIndex';

// Import CSS
import './SCSS/cartModal.scss';

const CartModal = () => {
  // Import all recoil states to show modal + Cart stored and Removed articles
  const [showCart, setShowCart] = useRecoilState(cartOpen);
  const [cartValue, setCartValue] = useRecoilState(cartState);
  const [objectIds, setObjectIds] = useState([]);
  // Use ref on click modal and on cart icon + hamburger
  const cartModal = useRef();
  const cartIcon = useRecoilValue(cartClick);

  const { isDesktop } = useRecoilValue(windowSize);

  const { sendEvent } = useHits();

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
      setObjectIds(
        cartValue.reduce((accum, obj) => [...accum, obj.objectID], [])
      );
    }
  }, [cartValue]);

  return (
    <motion.div
      initial={{ opacity: 0, x: '120%' }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: '100%' }}
      transition={framerMotionTransition}
      className={`${
        !isDesktop
          ? 'modal-container-mobile modal-container'
          : 'modal-container'
      }`}
      ref={cartModal}
    >
      {!isDesktop && (
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
        {t('title')}
        {showCart?.length > 0 && (
          <span className="modal-container__title">({showCart.length})</span>
        )}
      </h3>
      <div className="modal-container__line"></div>
      {cartValue.map((item, i) => {
        if (item.qty !== 0) {
          return <ArticlesCard item={item} key={i} sendEvent={sendEvent} />;
        }
      })}
      {cartValue.length === 0 && <p>{t('yourCartIsEmpty')}</p>}
      {cartValue.length !== 0 && (
        <div className="modal-container__buttons">
          <a
            className="modal-container__emptyCart"
            onClick={() => {
              setCartValue([]);
              localStorage.removeItem('myCart');
            }}
          >
            <p>{t('emptyCart')}</p>
          </a>
          <a
            className="modal-container__checkout"
            onClick={() => sendEvent('conversion', cartValue, 'Cart: Checkout')}
          >
            <p>{t('checkout')}</p>
            <ChevronRight />
          </a>
        </div>
      )}
      {shouldHaveRelatedProductsValue &&
        objectIds &&
        cartValue.length !== 0 && <RelatedProductsCart objectIds={objectIds} />}
    </motion.div>
  );
};

export default CartModal;
