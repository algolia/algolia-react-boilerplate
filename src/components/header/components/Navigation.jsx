// Render the navigation menu in the header

// React Router
import { useNavigate } from 'react-router-dom';
// Recoil Header State
import { useRecoilState, useRecoilValue } from 'recoil';
import { queryAtom } from '@/config/searchboxConfig';

// Import Config for the header
import { categoryPageFilterAttribute } from '@/config/categoryConfig';
import { linksHeader } from '@/config/headerConfig';
import SelectPersona from '../personnaSelect/SelectPersona';

//import language selector component
import LanguageSelect from '../languagesSelect/LanguageSelect';

// Import Recoil config
import { shouldHavePersona, shouldHaveSegments, shouldHaveLanguageSelector } from '@/config/featuresConfig';

import SelectSegment from '../segmentSelect/SelectSegment';

const Navigation = ({ isMenuOpen, setIsMenuOpen, mobile, tablet }) => {
  // Recoil State
  const [queryState, setQueryState] = useRecoilState(queryAtom);

  // navigate is used by React Router
  const navigate = useNavigate();

  // Should show or not the sections
  const shouldShowPersonasAtom = useRecoilValue(shouldHavePersona);
  const shouldShowSegmentsAtom = useRecoilValue(shouldHaveSegments);
  const shouldShowLanguageSelected = useRecoilValue(shouldHaveLanguageSelector);

  // Import the navigation links, as defined in the config
  const [links] = useRecoilState(linksHeader);
  return (
    <ul
      className={`${
        isMenuOpen
          ? 'container-mobile__navList-items'
          : 'container__header-bottom__links'
      } `}
    >
      {links.map((link) => (
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
          <p>{link.name}</p>
        </li>
      ))}
      {/* Display the persona selection component */}
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
      {/* Display the language select component NB this isn't functional on the flagship index as we only have one language */}
      {shouldShowLanguageSelected && (
        <li>
          <LanguageSelect />
        </li>
      )}
    </ul>
  );
};

export default Navigation;
