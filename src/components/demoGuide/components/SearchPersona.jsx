import { memo } from 'react';

// Import the Select widget (https://react-select.com/home)
import Select from 'react-select';

// Import Recoil for state management
import { useSetRecoilState } from 'recoil';
import { alertContent, isAlertOpen } from '@/config/demoGuideConfig';

// Router import
import { useNavigate } from 'react-router-dom';

// Import configuration
import { styles, searchPersonaInformations } from '@/config/demoGuideConfig';

import { personaSelectedAtom, personaConfig } from '@/config/personaConfig';

import { categorySelectionAtom } from '@/config/headerConfig';

const SearchPersona = () => {
  // Recoil State - update query in searchBar
  const setPersonaSelect = useSetRecoilState(personaSelectedAtom);
  // Recoil State - set the category to 'All'
  // LEFT IN FOR REFACTO PURPOSES
  // const setUnderlineCategory = useSetRecoilState(categorySelectionAtom);
  const setAlert = useSetRecoilState(alertContent);
  const setAlertOpen = useSetRecoilState(isAlertOpen);
  // router hook to navigate using a function
  const navigate = useNavigate();

  const triggerAlert = (content) => {
    setAlertOpen(true);
    setAlert(content);
    setTimeout(() => setAlertOpen(false), 5000);
  };

  return (
    <div className="search-terms">
      <h3>Search Persona</h3>
      <div className="search-terms__infos">
        {searchPersonaInformations.map((item, i) => {
          return (
            <div key={i} className="search-terms__infos__titles">
              <span>{item.span}:</span>
              <p>{item.details}</p>
            </div>
          );
        })}
      </div>
      <Select
        defaultValue={personaConfig}
        options={personaConfig}
        styles={styles}
        placeholder="Persona"
        onChange={(e) => {
          if (e.value !== 'anon') {
            setPersonaSelect(e.value);
            triggerAlert(e.description);
            // set the Navigation category to 'All', which is at index 0
            // setUnderlineCategory(0);
          }
        }}
      />
    </div>
  );
};

export default SearchPersona;
