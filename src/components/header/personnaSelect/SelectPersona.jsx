import React, { useEffect } from 'react';
import Select from 'react-select';

import { useSetRecoilState, useRecoilValue } from 'recoil';
import { personaConfig, personaSelected } from '../../../config/header';

const colorStyles = {
  placeholder: (defaultStyles) => {
    return {
      ...defaultStyles,
      fontFamily: "'Raleway', sans-serif",
    };
  },
  option: (provided) => ({
    ...provided,
    fontFamily: "'Raleway', sans-serif",
  }),
};

const SelectPersona = () => {
  const persona = useRecoilValue(personaConfig);
  const personaSelect = useRecoilValue(personaSelected);
  const setPersonaSelect = useSetRecoilState(personaSelected);
  return (
    <div className="select-component">
      <Select
        defaultValue={personaSelect}
        options={persona}
        styles={colorStyles}
        placeholder="Persona"
        onChange={setPersonaSelect}
      />
    </div>
  );
};

export default SelectPersona;
