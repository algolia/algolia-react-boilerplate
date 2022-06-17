import { TourProvider } from '@reactour/tour';
import ReactDOM from 'react-dom';

import App from './App';

// React Tour
import { steps } from '@/config/demoTourConfig';

ReactDOM.render(
  // React Tour
  <TourProvider steps={steps} showBadge={false}>
    <App />
  </TourProvider>,
  document.querySelector('#root')
);
