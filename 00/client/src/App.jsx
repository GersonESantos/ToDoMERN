import Login from "./pages/Login.jsx";
import { Route, Routes, Navigate, Outlet, useLocation } from "react-router-dom";
import TaskDetails from './pages/TaskDetails.jsx'
import Tasks from './pages/Tasks.jsx'
import Users from './pages/Users.jsx'
import Trash from './pages/Trash.jsx'
import Dashboard from "./pages/Dashboard.jsx"
import { Toaster } from "sonner";
import { Sidebar, MobileSidebar, Navbar } from "./components";
import { useSelector } from "react-redux";


function Layout() {
  const { user } = useSelector(state => state.auth);
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


// const MobileSidebar = () => {
//   const { isOpenSidebar } = useSelector((state) => state.auth);

//   return (
//     <div
//       className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-20 md:hidden transition-transform duration-300 ${
//         isOpenSidebar ? "translate-x-0" : "-translate-x-full"
//       }`}
//     >
//       <div className='w-3/4 h-full bg-white dark:bg-[#1f1f1f] p-5'>
//         <Sidebar />
//       </div>
//     </div>
//   );
// }
function App() {
  return (
    <main className="w-full min-h-screen bg-white-500">
      <Routes>
        <Route element={<Layout />}>
          <Route index path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/task" element={<Tasks />} />
          <Route path="/completed/:status" element={<Tasks />} />
          <Route path="/in-progress/:status" element={<Tasks />} />
          <Route path="/todo/:status" element={<Tasks />} />
          <Route path="/team" element={<Users />} />
          <Route path="/trash" element={<Trash />} />
          <Route path="/task/:id" element={<TaskDetails />} />
        </Route>
        <Route path='/log-in' element={<Login />} />
      </Routes>
      <Toaster richColors></Toaster>
    </main>
  );
}

export default App;
