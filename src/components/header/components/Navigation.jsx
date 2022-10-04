// Render the navigation menu in the header

import { useState } from 'react';

// React Router
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
// Recoil Header State
import { queryAtom } from '@/config/searchboxConfig';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

// Import Config for the header
import {
  categoryPageFilterAttribute,
  linksHeader,
  navigationStateAtom,
  selectorNavigationRef,
} from '@/config/navigationConfig';

// Import Recoil config
import {
  shouldHaveCartFunctionality,
  shouldHaveLanguages,
  shouldHavePersona,
  shouldHaveSegments,
} from '@/config/featuresConfig';

import { cartOpen, cartState } from '@/config/cartFunctions';
import { Selectors } from '../../selector/Selectors';

// Import segment configuration
import { CartPicto } from '@/assets/svg/SvgIndex';
import { languagesConfig } from '@/config/languagesConfig';
import { personaConfig } from '@/config/personaConfig';
import { segmentConfig } from '@/config/segmentConfig';
import useStoreCartToLocalStorage from '@/hooks/useStoreCartToLocalStorage';
import { useEffect } from 'react';
import { useRef } from 'react';

//Import config from helped navigation
import { cartClick } from '@/config/cartFunctions';

const Navigation = ({ isMenuOpen, setIsMenuOpen, mobile, tablet }) => {
  // Recoil State
  const [cartOpenValue, setCartOpenValue] = useRecoilState(cartOpen);
  const [showCart, setShowCart] = useRecoilState(cartState);

  // navigate is used by React Router
  const navigate = useNavigate();
  const { state } = useLocation();

  const highlightingCat = () => {
    if (state?.action !== null) {
      if (state?.type === 'filter') {
        return state.action
          .split(':')[1]
          .split('>')
          .pop()
          .replace("'", '')
          .slice(0, -1)
          .toLowerCase();
      } else if (state?.type === 'context') {
        return state?.action.toLowerCase();
      } else {
        null;
      }
    } else {
    }
  };

  // Get references for dropdowns in Navigation
  const selectorsNavigation = useSetRecoilState(selectorNavigationRef);

  // Should show or not the sections
  const shouldShowPersonasAtom = useRecoilValue(shouldHavePersona);
  const shouldShowSegmentsAtom = useRecoilValue(shouldHaveSegments);
  const shouldShowLanguageSelected = useRecoilValue(shouldHaveLanguages);
  const shouldShowCartIcon = useRecoilValue(shouldHaveCartFunctionality);

  // Import the navigation links, as defined in the config
  const links = useRecoilValue(linksHeader);

  let [searchParams, setSearchParams] = useSearchParams();

  const [navigationState, setNavigationState] =
    useRecoilState(navigationStateAtom);

  const cartIcon = useSetRecoilState(cartClick);

  // UseEffect to store into the local storage our Cart
  useEffect(() => {
    if (showCart?.length > 0) {
      localStorage.removeItem('myCart');
      useStoreCartToLocalStorage(showCart);
    }
  }, [showCart]);

  // If there is already a Cart in the local storage, then store it in recoile state
  useEffect(() => {
    const getCart = localStorage.getItem('myCart');
    if (getCart) {
      const cleanCart = JSON.parse(getCart);
      const savedCart = cleanCart[cleanCart?.length - 1];
      setShowCart(savedCart);
    }
  }, []);

  const sumAllArticles = (cart) => {
    let x = 0;
    cart.map((i, index) => {
      x += i.qty;
    });
    return x;
  };

  return (
    <ul
      className={`${
        isMenuOpen
          ? 'container-mobile__navList-items'
          : 'container__header-nav__links'
      } `}
    >
      {links.map((link, i) => {
        return (
          <li
            id={link.name}
            tabIndex="0"
            key={link.name}
            onClick={() => {
              //Build action based on link type, then navigate
              let action = null;
              if (link.type === 'filter' && link.filter?.length > 0) {
                action = `${categoryPageFilterAttribute}:'${link.filter}'`;
              } else if (link.type === 'context') {
                action = link.context;
              } else if (
                link.type === 'rawFilter' &&
                link.rawFilter?.length > 0
              ) {
                action = `${link.rawFilter}`;
              }

              setNavigationState({
                type: link.type,
                name: link.name,
                action: action,
              });
              searchParams.set('category', link.name);
              navigate({
                pathname: '/search',
                search: `?${searchParams}`,
              });

              // Only used for Mobile view
              if (tablet || mobile) {
                setIsMenuOpen(false);
              }
            }}
          >
            <p
              className={
                highlightingCat() === link.name.toLowerCase() ||
                navigationState?.name === link.name
                  ? 'selected'
                  : ''
              }
            >
              {link.name}
            </p>
          </li>
        );
      })}
      <li className="container__header-nav-selectors" ref={selectorsNavigation}>
        {shouldShowPersonasAtom && (
          <div>
            <Selectors props={personaConfig} />
          </div>
        )}
        {shouldShowSegmentsAtom && (
          <div>
            <Selectors props={segmentConfig} />
          </div>
        )}
        {/* Display the language select component */}
        {shouldShowLanguageSelected && (
          <div>
            <Selectors props={languagesConfig} />
          </div>
        )}
      </li>
      {shouldShowCartIcon && (
        <li
          className={
            cartOpenValue ? 'picto-cart picto-cart__active' : 'picto-cart'
          }
          onClick={() => {
            setCartOpenValue(!cartOpenValue);
            {
              mobile && setIsMenuOpen(false);
            }
          }}
          ref={cartIcon}
        >
          {!mobile && <CartPicto />}
          {mobile && <p>Cart</p>}
          {/* Picto notification up the cart icon */}
          {showCart?.length !== 0 && (
            <div className="notification-cart">
              <span>{sumAllArticles(showCart)}</span>
            </div>
          )}
        </li>
      )}
    </ul>
  );
};

export default Navigation;
