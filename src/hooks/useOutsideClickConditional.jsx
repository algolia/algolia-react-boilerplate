import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { isPersonaMenuOpen } from '../config/header';

const useOutsideClickConditional = (
  ref,
  optionalParameter1,
  optionalParameter2,
  callback
) => {
  optionalParameter1 = optionalParameter1 || null;
  optionalParameter2 = optionalParameter2.current || null;
  const isPersonaOpen = useRecoilValue(isPersonaMenuOpen);

  const handleClick = (e) => {
    if (
      ref.current &&
      !ref.current.contains(e.target) &&
      !optionalParameter1.contains(e.target) &&
      !optionalParameter2.contains(e.target) &&
      isPersonaOpen === false
    ) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  });
};

export default useOutsideClickConditional;
