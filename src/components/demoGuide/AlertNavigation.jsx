import { isAlertOpen, alertContent } from '@/config/demoGuideConfig';
import { useRecoilState, useRecoilValue } from 'recoil';

const AlertNavigation = () => {
  const [alertOpen, setAlertOpen] = useRecoilState(isAlertOpen);
  const alertContentToDisplay = useRecoilValue(alertContent);

  return (
    <div className="wrap">
      {alertOpen && (
        <div className="demoGuide__alert">
          <div>{alertContentToDisplay}</div>
          <div
            className="demoGuide__alert-close"
            onClick={(e) => setAlertOpen(false)}
          >
            X
          </div>
        </div>
      )}
    </div>
  );
};

export default AlertNavigation;
