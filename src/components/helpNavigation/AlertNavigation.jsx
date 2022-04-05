import { useState } from 'react';
import { isAlertOpen, alertContent } from '@/config/helpedNavigation';
import { useRecoilState, useRecoilValue } from 'recoil';

const AlertNavigation = () => {
  const [alertOpen, setAlertOpen] = useRecoilState(isAlertOpen);
  const alertContentToDisplay = useRecoilValue(alertContent);
  return (
    <div className="wrap">
      {alertOpen && (
        <div className="alert alert-info radius">
          <div>{alertContentToDisplay}</div>
          <div className="cross" onClick={(e) => setAlertOpen(false)}>
            X
          </div>
        </div>
      )}
    </div>
  );
};

export default AlertNavigation;
