// Render the navigation menu in the header

// React Router
import { useLocation, useNavigate } from 'react-router-dom';
// Recoil Header State
import { queryAtom } from '@/config/searchboxConfig';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

// Import Config for the header
import { categoryPageFilterAttribute } from '@/config/categoryConfig';
import { linksHeader, selectorNavigationRef } from '@/config/headerConfig';

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

const Navigation = ({ isMenuOpen, setIsMenuOpen, mobile, tablet }) => {
  // Recoil State
  const [queryState, setQueryState] = useRecoilState(queryAtom);

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
  const [links] = useRecoilState(linksHeader);

  return (
    <ul
      className={`${
        isMenuOpen
          ? 'container-mobile__navList-items'
          : 'container__header-nav__links'
      } `}
    >
      {links.map((link, i) => (
        <li
          id={link.name}
          tabIndex="0"
          key={link.url}
          onClick={() => {
            // Set query to nothing when clicking on a category
            setQueryState('');
            if (link.name !== 'All') {
              if (link.type === 'filter') {
                navigate(`/search`, {
                  state: {
                    type: link.type,
                    action: `${categoryPageFilterAttribute}:'${link.filter}'`,
                  },
                });
              } else if (link.type === 'context') {
                navigate(`/search`, {
                  state: { type: link.type, action: link.context },
                });
              }
            } else {
              navigate('/search', {
                state: { type: link.type, name: link.name, action: null },
              });
            }
            // Only used for Mobile view
            if (tablet || mobile) {
              setIsMenuOpen(false);
            }
          }}
        >
          <p
            className={
              highlightingCat() === link.name.toLowerCase() ||
              state?.name === link.name
                ? 'selected'
                : ''
            }
          >
            {link.name}
          </p>
        </li>
      ))}
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
    </ul>
  );
};

export default Navigation;
