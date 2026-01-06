import { Navigate, Route, Routes ,useLocation } from "react-router-dom";
import { Toaster }  from "sonner";
import { Login}  from "./pages/login"
import { TaskDetail } from "./pages/TaskDetail";
import { Tasks }  from "./pages/Tasks";
import { Trash }  from "./pages/Trash";
import { Users } from "./pages/users";
import { Dashboard }  from "./pages/dashboard";

function Layout() {
  const  user  = "";
  const location = useLocation();
  return user ? (
   <div className="w-full h-screen flex flex-col md:flex-row">
    <div className="md:w-1/5 bg-white sticky top-0 hidden md:block">
    {/* Sidebar component */}

        
    </div> 
     {/* <MobileSidebar /> */}
     <div className="flex-1 over-flow-y-auto">
        {/* Navbar component */}
        <div>
            {/* <Navbar /> */}
        <div className="p-4 2x1:px-10">
            <Outlet />
            </div>    
        </div>
     </div>
   </div>
  ):(
    <Navigate to='/log-in' state={{ from: location }} replace />
  )
}

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
