import ReactDOM from 'react-dom/client'
import App from './App'

// Translations for the app and links,....
import '@/config/translation'

// SCSS import
import './scss/index.scss'

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
