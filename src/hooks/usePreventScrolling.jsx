import { useEffect } from 'react';

const usePreventScrolling = (open) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }
  }, [open]);
};

export default usePreventScrolling;
