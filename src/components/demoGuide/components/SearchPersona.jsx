import { memo } from 'react';

// Import the Select widget (https://react-select.com/home)
import Select from 'react-select';

// Import Recoil for state management
import { useSetRecoilState } from 'recoil';
import { alertContent, isAlertOpen } from '@/config/helpedNavigation';

// Router import
import { useNavigate } from 'react-router-dom';

// Import configuration
import {
  searchPersonaConfig,
  styles,
  searchPersonaInformations,
} from '@/config/demoGuideConfig';

import { personaSelectedAtom } from '@/config/personaConfig';

const SearchPersona = () => {
  // Recoil State - update query in searchBar
  const setPersonaSelect = useSetRecoilState(personaSelectedAtom);
  const setAlert = useSetRecoilState(alertContent);
  const setAlertOpen = useSetRecoilState(isAlertOpen);
  // router hook to navigate using a function
  const navigate = useNavigate();
  return (
    <div className="search-terms">
      <h3>Search Persona</h3>
      <div className="search-terms__infos">
        {searchPersonaInformations.map((item) => {
          return (
            <div className="search-terms__infos__titles" key={item.span}>
              <span>{item.span}:</span>
              <p>{item.details}</p>
            </div>
          );
        })}
      </div>
      <Select
        defaultValue={searchPersonaConfig}
        options={searchPersonaConfig}
        styles={styles}
        placeholder="Persona"
        onChange={(e) => {
          if (e.value !== 'anon') {
            setPersonaSelect(e.value);
            setAlertOpen(true);
            setAlert(e.alertContent);
          }
        }}
      />
    </div>
  );
};

export default SearchPersona;
