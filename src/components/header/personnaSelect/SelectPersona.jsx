// For displaying the select widget for choosing a persona in personalisation

// Check and try to create a popup or something else

import { memo } from 'react';

// Import the Select widget (https://react-select.com/home)
import Select from 'react-select';

// Import Recoil for state management
import { useSetRecoilState } from 'recoil';

// Import configuration
import {
  personaConfig,
  personaSelectedAtom,
  styles,
} from '../../../config/personaConfig';

const SelectPersona = () => {
  const setPersonaSelect = useSetRecoilState(personaSelectedAtom);

  // When the persona is selected, set it to be the selected persona in the Recoil state
  return (
    <Select
      defaultValue={personaConfig}
      options={personaConfig}
      styles={styles}
      placeholder="Persona"
      onChange={(e) => {
        setPersonaSelect(e.value);
      }}
    />
  );
};

export default memo(SelectPersona);
