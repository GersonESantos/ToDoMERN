import Login from './pages/Login.jsx'

function App() {
  return (
    <main className="w-full min-h-screen flex items-center justify-center flex-col lg:flex-row ">
      <Routes>
        <Route  element={<Layout />} >
          <Route path="/" element={<Navigator to="/dashboard" />} />
           
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        
      </Routes>
    </main>
  )
}

export default App
