// import './App.css'
import Login from './pages/Login.jsx'
import { Routes, Route, Navigate } from 'react-router-dom'
import Dashbord from './pages/Dashboard.jsx'
import Tasks from './pages/Tasks.jsx'
import Users from './pages/Users.jsx'
import Trash from './pages/Trash.jsx'
import TaskDetails from './pages/TaskDetails.jsx'





function App() {
  return (
   <main className='w-full min-h-screen  bg-[#f3f4f6]'>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Navigate to="/dashboard" />} />
                    <Route path='/dashboard >'  element={/Dashbord /} />
                    <Route path='/task >'  element={/Task /} />
                    <Route path='/completed/:status >'  element={/Task /} />
                    <Route path='/in-progress/:status >'  element={/Task /} />
                    <Route path='/todo/:status >'  element={/Task /} />
                    <Route path='/team >'  element={/Users /} />
                    <Route path='/trash >'  element={/Trash /} />
                    <Route path='/task/:id >'  element={/TaskDetails /} />                    
                </Route>

                <Route path='/log-in' element={<Login />} />
            </Routes>

            <Toaster richColors position='top-center' />
        </main>
  )
}

export default App
