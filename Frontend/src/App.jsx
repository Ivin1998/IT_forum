import { Route, Routes, useLocation } from 'react-router-dom';
import Feedpage from './Components/Feedpage'
import Header from './Components/Header'
import Login from './Components/Login'
import Register from './Components/Register';

function App() {
  const location = useLocation();
  
  return (
    <div>
    {location.pathname !== '/home' && location.pathname !== '/register' && (
  <Header/> 
    )}
  <Routes>
    <Route path='/' element={<Feedpage />} />
    <Route path='/register' element={<Register />} />
    <Route path='/home' element={<Login />} />
    
  </Routes>
    
  </div>
   )
}

export default App;