import { TourProvider } from '@reactour/tour';
import ReactDOM from 'react-dom';
import viteSSR from 'vite-ssr';

import App from './App';

import { steps } from '@/config/demoTourConfig';

const Main = () => {
  return ReactDOM.render(
    // React Tour
    <TourProvider steps={steps} showBadge={false}>
      <App />
    </TourProvider>,
    document.querySelector('#root')
  );
};

export default viteSSR(Main, ({ url, isClient, request }) => {
  // Custom initialization hook
});
