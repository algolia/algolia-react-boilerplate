// Render the navigation menu in the header

// React Router
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
// Recoil Header State
import { queryAtom } from '@/config/searchboxConfig';
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';

// Import Config for the header
import {
  categoryPageFilterAttribute,
  linksHeader,
  selectorNavigationRef,
  navigationStateAtom,
} from '@/config/navigationConfig';

// Import Recoil config
import {
  shouldHaveLanguages,
  shouldHavePersona,
  shouldHaveSegments,
} from '@/config/featuresConfig';
import { Selectors } from '../../selector/Selectors';

// Import segment configuration
import { segmentConfig } from '@/config/segmentConfig';
import { personaConfig } from '@/config/personaConfig';
import { languagesConfig } from '@/config/languagesConfig';
import { CartPicto } from '@/assets/svg/SvgIndex';

const Navigation = ({ isMenuOpen, setIsMenuOpen, mobile, tablet }) => {
  // Recoil State
  const setQueryState = useSetRecoilState(queryAtom);

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

  // Import the navigation links, as defined in the config
  const links = useRecoilValue(linksHeader);

  let [searchParams, setSearchParams] = useSearchParams();

  const [navigationState, setNavigationState] =
    useRecoilState(navigationStateAtom);

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
              // Set query to nothing when clicking on a category
              // setQueryState('');

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
      <li className="picto-cart">
        <CartPicto />
        <div className="notification-cart">
          <p>1</p>
        </div>
      </li>
    </ul>
  );
};

export default Navigation;
