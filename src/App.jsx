// React router
import { BrowserRouter as Router } from 'react-router-dom';
// Recoil State Management
import { RecoilRoot } from 'recoil';

// SCSS import
import './scss/index.scss';

// Import Components
import { Main } from './Main';

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
