import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/login'
import Signup from './Pages/signup'
import RefrshHandler from '../RefreshHandler'
import './App.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRouter = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  return (
    <div className="App">
      <RefrshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<PrivateRouter element={<Home />} />} />
      </Routes>
    </div>
  );
}

export default App;
