import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
    const  user = ""
    const {
        register, 
        handleSubmit,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();

    useEffect(() => {
        user && navigate("/dashboard");
    }, [user]);

    return(
        <div className="w-full min-h-screen flex items-center justify-center flex-col lg:flex-row bg-[#f3f4f6]">
            <div className="w-full md:w-auto flex gap-0 md:gap-40 flex-col md:flex-row items-center justify-center">
                {/* left side */}
                <div className="h-full w-full lg:w-2/3 flex items-center justify-center">
                   <div className="w-full md:w-lg 2x1:max-3x1 flex flex-col items-center justify-center gap-5 md:gap-10 2x1: mt-20" >
                      <span className="flex gap-1 py-1 px-3 border rounded-full text-sm md:text-base bordergray-300 text-gray-600">
                        manage all your task in place! 
                       </span>
                       <p className="flex flex-col gap-0 md:gap-4 text-4xl md:text-6xl 2x1:text-7xl font-back text-center text-blue-700">
                        <span>Cloud-Base</span>
                        <span>Task Management</span>
                       </p>
                       <div className=" "> 
                        <div className="ciccle rotate-in-up-left "></div>

                       </div>
                    </div>
                </div>
                {/* right side */}
               <div className="w-full md-1/3 p-4 md:p-1 flex flex-col justify-center items-center">

                </div>
            </div>
        </div>
        )
};

export default Login;

//