import { useState, useEffect } from 'react';

// SCSS import
import './scss/index.scss';

// Import Components
import { TourProvider } from '@reactour/tour';
import Loader from '@/components/loader/Loader';
import { Main } from './Main.jsx';
import { useRecoilState } from 'recoil';
import { tourStepAtom, useSteps } from './config/demoTourConfig';

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Get the steps
  const steps = useSteps();

  // Get the tour controller
  const [tourStep, setTourStep] = useRecoilState(tourStepAtom);

  // For the developer's sake, we'll keep this instantaneous until it's sent to prod
  useEffect(() => {
    setIsLoaded(true);
    // setTimeout(() => {
    //   setIsLoaded(true);
    // }, 3000);
  }, []);

  return (
    <TourProvider
      steps={steps}
      showBadge={false}
      currentStep={tourStep}
      setCurrentStep={setTourStep}
    >
      {isLoaded === false && <Loader isLoaded={isLoaded} />}
      <Main isLoaded={isLoaded} setIsLoaded={setIsLoaded} />
    </TourProvider>
  );
};

export default App;
