import ReactDOM from 'react-dom/client'
import App from './App'
// React router
import { BrowserRouter as Router } from 'react-router-dom'

// Recoil State Management
import { RecoilRoot } from 'recoil'

// Resize component listens for screen size change to display UI accordingly
import ScreenResizer from './utils/ScreenResizer'

// Add function from config file to scroll on top every change of page
import ScrollToTop from './config/scrollOnTop'

// Translations for the app and links,....
import '@/config/translation'

// SCSS import
import './scss/index.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
  <RecoilRoot>
    <Router>
      <ScrollToTop />
      <ScreenResizer />
      <App />
    </Router>
  </RecoilRoot>
)
