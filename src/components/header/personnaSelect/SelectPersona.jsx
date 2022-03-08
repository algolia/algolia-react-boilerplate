import React, { useEffect, useRef, memo } from 'react';
import Select from 'react-select';

import { useSetRecoilState, useRecoilValue, useRecoilState } from 'recoil';
import { personaConfig, personaSelectedAtom } from '../../../config/header';
import { selectButtonAtom } from '../../../config/config';
import { isPersonaMenuOpen } from '../../../config/header';
import { isFederatedAtom } from '../../../config/config';

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
  // const select = useRef('');
  // const setSelectRef = useSetRecoilState(selectButtonAtom);
  // const selectRef = useRecoilValue(selectButtonAtom);
  // const persona = useRecoilValue(personaConfig);
  // const personaSelect = useRecoilValue(personaSelected);
  const setPersonaSelect = useSetRecoilState(personaSelectedAtom);
  // const [isMenuOpen, setIsMenuOpen] = useRecoilState(isPersonaMenuOpen);
  // useOutsideClick(select, () => {
  //   setIsMenuOpen(false);
  // });
  // useEffect(() => {
  //   setSelectRef(select);
  // }, [selectRef, setSelectRef]);

  return (
    <div
      className="select-component"
      // ref={select}
      // onClick={(e) => {
      //   setIsMenuOpen(true);
      // }}
    >
      <Select
        defaultValue={personaConfig}
        options={personaConfig}
        styles={colorStyles}
        // menuIsOpen={isMenuOpen}
        placeholder="Persona"
        onChange={(e) => {
          console.log(e.value);
          setPersonaSelect(e.value);
        }}
      />
    </div>
  );
};

export default memo(SelectPersona);
