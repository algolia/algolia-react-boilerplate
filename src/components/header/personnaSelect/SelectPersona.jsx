import React, { memo } from 'react';
import Select from 'react-select';

import { useSetRecoilState, useRecoilValue, useRecoilState } from 'recoil';
import {
  personaConfig,
  personaSelectedAtom,
  styles,
} from '../../../config/header';

const SelectPersona = () => {
  const setPersonaSelect = useSetRecoilState(personaSelectedAtom);

  return (
    <Select
      defaultValue={personaConfig}
      options={personaConfig}
      styles={styles}
      placeholder="Persona"
      onChange={(e) => {
        console.log(e.value);
        setPersonaSelect(e.value);
      }}
    />
  );
};

export default memo(SelectPersona);
