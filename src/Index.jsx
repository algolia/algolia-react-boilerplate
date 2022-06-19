import React from 'react';
import { createRoot } from 'react-dom/client';
// React Tour
import { TourProvider } from '@reactour/tour';

import App from './App';

import { steps } from '@/config/demoTourConfig'


const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  // React Tour
  <TourProvider steps={steps} showBadge={false}>
    <App />
  </TourProvider>
);
