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

const SearchPersona = () => {
  const setPersonaSelect = useSetRecoilState(personaSelectedAtom);

  const setAlert = useSetRecoilState(alertContent);
  const setAlertOpen = useSetRecoilState(isAlertOpen);

  const triggerAlert = (content) => {
    setAlertOpen(true);
    setAlert(content);
    setTimeout(() => setAlertOpen(false), 5000);
  };

  return (
    <div className="demoGuideHelpers">
      <h3>Search Persona</h3>
      <div className="demoGuideHelpers__infos">
        {searchPersonaInformations.map((item, i) => {
          return (
            <div key={i} className="demoGuideHelpers__infos__titles">
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
