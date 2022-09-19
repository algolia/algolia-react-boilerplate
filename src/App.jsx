// React router
import { BrowserRouter as Router } from 'react-router-dom';

// Recoil State Management
import { RecoilRoot } from 'recoil';

// Resize component listens for screen size change to display UI accordingly
import ScreenResizer from './utils/ScreenResizer';

// SCSS import
import './scss/index.scss';

// Import Components
import { Main } from './Main';

// Add function from config file to scroll on top every change of page
import ScrollToTop from './config/scrollOnTop';

const App = () => {
  return (
    <RecoilRoot>
      <Router>
        <ScrollToTop />
        <ScreenResizer />
        <Main />
      </Router>
    </RecoilRoot>
  );
};

export default App;
