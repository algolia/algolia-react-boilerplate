import React, { useEffect } from 'react';
import Select from 'react-select';

import { useSetRecoilState, useRecoilValue } from 'recoil';

import { personaConfig, personaSelected } from '../../../config/header';

const SelectPersona = () => {
  const persona = useRecoilValue(personaConfig);
  const personaSelect = useRecoilValue(personaSelected);
  const setPersonaSelect = useSetRecoilState(personaSelected);
  return (
    <div className="select-component">
      <Select
        defaultValue={personaSelect}
        options={persona}
        placeholder="Persona"
        onChange={setPersonaSelect}
      />
    </div>
  );
};

export default SelectPersona;
