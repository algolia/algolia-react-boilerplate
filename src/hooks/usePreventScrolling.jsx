import { useEffect } from 'react';

const usePreventScrolling = (open) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [open]);
};

export default usePreventScrolling;
