import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import Context from './Components/Context.jsx';



createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Context>
    <App />
  </Context>
  </BrowserRouter>
)
