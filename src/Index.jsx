import { TourProvider } from '@reactour/tour';
import ReactDOM from 'react-dom/client';
import App from './App';
import { steps } from '@/config/demoTourConfig';

// Translations for the app and links,....
import '@/config/translation';

ReactDOM.createRoot(document.getElementById('root')).render(
  <TourProvider steps={steps} showBadge={false}>
    <App />
  </TourProvider>
);
