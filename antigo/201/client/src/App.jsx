// import './App.css'
import { Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom'
import Login from './pages/Login.jsx'
import TaskDetails from './pages/TaskDetails.jsx'
import Tasks from './pages/Tasks.jsx'
import Users from './pages/Users.jsx'
import Trash from './pages/Trash.jsx'
import Dashbord from './pages/Dashboard.jsx'

function Layout() {
  const { user } = "";
   const location = useLocation();
  return user ? (
    <div className='w-full h-screen flex flex-col md:flex-row'>
      <div className='w-1/5 h-screen bg-white dark:bg-[#1f1f1f] sticky top-0 hidden md:block'>
        <Sidebar />
      </div>

      <MobileSidebar />

      <div className='flex-1 overflow-y-auto'>
        <Navbar />

        <div className='p-4 2xl:px-10'>
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <Navigate to='/log-in' state={{ from: location }} replace />
  );
}





function App() {
  return (
   <main className='w-full min-h-screen  bg-[#f3f4f6]'>     
      
       
            <Login />     
      
      
      </main>
  );
};

export default App;
