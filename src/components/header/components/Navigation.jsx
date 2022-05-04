// Render the navigation menu in the header

import { useState } from 'react';

// React Router
import { useNavigate } from 'react-router-dom';
// Recoil Header State
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { queryAtom } from '@/config/searchboxConfig';

// Import Config for the header
import { categoryPageFilterAttribute } from '@/config/categoryConfig';
import { linksHeader, selectorNavigationRef } from '@/config/headerConfig';
import SelectPersona from '../personnaSelect/SelectPersona';

//import language selector component
import LanguageSelect from '../languagesSelect/LanguageSelect';

// import segment selector component
import SelectSegment from '../segmentSelect/selectSegment';

// Import Recoil config
import {
  shouldHavePersona,
  shouldHaveSegments,
  shouldHaveLanguages,
} from '@/config/featuresConfig';

const Navigation = ({ isMenuOpen, setIsMenuOpen, mobile, tablet }) => {
  const [isActive, setIsActive] = useState(null);

  // Recoil State
  const [queryState, setQueryState] = useRecoilState(queryAtom);

  // navigate is used by React Router
  const navigate = useNavigate();

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
                state: { type: link.type, action: null },
              });
            }
            // Only used for Mobile view
            if (tablet || mobile) {
              setIsMenuOpen(false);
            }
          }}
        >
          <p
            className={isActive === i ? 'selected' : ''}
            onClick={() => {
              setIsActive(i);
            }}
          >
            {link.name}
          </p>
        </li>
      ))}
      <div
        className="container__header-nav-selectors"
        ref={selectorsNavigation}
      >
        {shouldShowPersonasAtom && (
          <li>
            <SelectPersona />
          </li>
        )}
        {shouldShowSegmentsAtom && (
          <li>
            <SelectSegment />
          </li>
        )}
        {/* Display the language select component */}
        {shouldShowLanguageSelected && (
          <li>
            <LanguageSelect />
          </li>
        )}
      </div>
    </ul>
  );
};

export default Navigation;
