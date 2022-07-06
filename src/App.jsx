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

const App = () => {
  return (
    <RecoilRoot>
      <Router>
        <ScreenResizer />
        <Main />
      </Router>
    </RecoilRoot>
  );
};

export default App;
