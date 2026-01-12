import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menu from './pages/Menu.jsx';
import Login from './pages/Login.jsx';
import Switch from './pages/Switch.jsx';

function App() {
  return (
    <Router>
      <div className="flex justify-between items-start p-4">
        <Switch />
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
