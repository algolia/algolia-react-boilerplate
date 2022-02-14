import { useEffect, useState } from 'react';

const useOutsideClick = (ref, optionalParameter, callback) => {
  optionalParameter = optionalParameter || null;

  const handleClick = (e) => {
    if (
      ref.current &&
      !ref.current.contains(e.target) &&
      !optionalParameter.contains(e.target)
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

export default useOutsideClick;
