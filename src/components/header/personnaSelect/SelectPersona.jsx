import React, { useEffect, useRef } from 'react';
import Select from 'react-select';

import { useSetRecoilState, useRecoilValue } from 'recoil';
import { personaConfig, personaSelected } from '../../../config/header';
import { selectButtonAtom } from '../../../config/config';

// hook import
import useOutsideClick from '../../../hooks/useOutsideClick';

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
  singleValue: (provided) => ({
    ...provided,
    fontFamily: "'Raleway', sans-serif",
  }),
};

const SelectPersona = () => {
  const select = useRef('');
  const setSelectRef = useSetRecoilState(selectButtonAtom);
  const selectRef = useRecoilValue(selectButtonAtom);
  const persona = useRecoilValue(personaConfig);
  const personaSelect = useRecoilValue(personaSelected);
  const setPersonaSelect = useSetRecoilState(personaSelected);
  useEffect(() => {
    setSelectRef(select);
  }, [selectRef, setSelectRef]);

  return (
    <div className="select-component" ref={select}>
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
