import { createRoot } from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import {Provider}  from './context/Context.jsx';
import '@fortawesome/fontawesome-free/css/all.min.css';

createRoot(document.getElementById('root')).render(
  <Provider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
)
