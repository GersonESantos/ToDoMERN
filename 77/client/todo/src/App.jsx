import Login  from "./pages/login"

import './App.css'

function App() {
  

  return (
    <>
      
      <h1>Vite + React</h1>
      <Route path='/log-in' element={<Login />} />
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
