import React from 'react';
import ReactDOM from 'react-dom';
// React Tour

// Recoil State Management
import { RecoilRoot } from 'recoil';

// React router
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';

ReactDOM.render(
  <RecoilRoot>
    <Router>
      <App />
    </Router>
  </RecoilRoot>,
  document.querySelector('#root')
);
