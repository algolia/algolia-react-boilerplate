import React, { useEffect } from 'react';
import Select from 'react-select';

import { useRecoilState, useRecoilValue } from 'recoil';
import { personaConfig, personaSelected } from '../../../config/header';

const SelectPersona = () => {
  const persona = useRecoilValue(personaConfig);
  const [personaSelect, setPersonaSelect] = useRecoilState(personaSelected);
  useEffect(() => {
    console.log(personaSelect);
  }, [personaSelect]);

  return (
    <div className="select-component">
      <Select
        defaultValue={setPersonaSelect}
        options={persona}
        placeholder="Persona"
        onChange={setPersonaSelect}
      />
    </div>
  );
};

export default SelectPersona;
