import React from 'react';
import ReactDOM from 'react-dom';
// React Tour
import { TourProvider } from '@reactour/tour';

import App from './App';

import { steps } from '@/config/demoTourConfig'

ReactDOM.render(
  // React Tour
  <TourProvider steps={steps} showBadge={false}>
    <App />
  </TourProvider>,
  document.querySelector('#root')
);
