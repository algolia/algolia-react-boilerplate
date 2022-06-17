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
  return (
    <RecoilRoot>
      <Router>
        <Main />
      </Router>
    </RecoilRoot>
  );
};

export default App;
