import { memo } from 'react';

// Import the Select widget (https://react-select.com/home)
import Select from 'react-select';

// Import Recoil for state management
import { useSetRecoilState } from 'recoil';
import { queryAtom } from '@/config/searchboxConfig';

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
  // router hook to navigate using a function
  const navigate = useNavigate();
  return (
    <div className="search-terms">
      <h3>Search Persona</h3>
      <div className="search-terms__infos">
        {searchPersonaInformations.map((item) => {
          return (
            <div className="search-terms__infos__titles">
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
          setPersonaSelect(e.value);
        }}
      />
    </div>
  );
};

export default SearchPersona;
