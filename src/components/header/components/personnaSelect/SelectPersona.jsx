// For displaying the select widget for choosing a persona in personalisation

// Check and try to create a popup or something else

import { memo } from 'react';

// Import the Select widget (https://react-select.com/home)
import Select from 'react-select';

// Import Recoil for state management
import { useRecoilState } from 'recoil';

// Import configuration
import {
  personaConfig,
  personaSelectedAtom,
  styles,
} from '@/config/personaConfig';

const SelectPersona = () => {
  const [personaSelected, setPersonaSelect] = useRecoilState(personaSelectedAtom);

  // When the persona is selected, set it to be the selected persona in the Recoil state
  return (
    <Select
      // defaultValue={personaSelected}
      value={personaConfig.filter(function(option) {
        return option.value === personaSelected;
      })}
      options={personaConfig}
      styles={styles}
      placeholder="No Persona"
      onChange={(e) => {
        setPersonaSelect(e.value);
      }}
    />
  );
};

export default memo(SelectPersona);
