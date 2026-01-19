import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login.jsx'

function App() {
  return (
    <main className="w-full min-h-screen flex items-center justify-center flex-col lg:flex-row ">
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </main>
  )
}

export default App
