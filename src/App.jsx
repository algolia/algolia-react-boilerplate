import { useState, useEffect } from 'react';

// React router
import { BrowserRouter as Router } from 'react-router-dom';

// Recoil State Management
import { RecoilRoot, useRecoilValue } from 'recoil';

// SCSS import
import './scss/index.scss';

// Import Components
import Loader from '@/components/loader/Loader';
import { Main } from './Main.jsx';

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 3000);
  }, []);

  return (
    <RecoilRoot>
      <Router>
        {isLoaded === false && <Loader isLoaded={isLoaded} />}
        <Main isLoaded={isLoaded} setIsLoaded={setIsLoaded} />
      </Router>
    </RecoilRoot>
  );
};

export default App;
