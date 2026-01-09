import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import Textbox from "../components/Textbox.jsx";

const Login = () => {
    const  user = ""
    const {
        register, 
        handleSubmit,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();
      const submitHabndler = async (data) => {
        console.log("sumit");
    };




    useEffect(() => {
        user && navigate("/dashboard");
    }, [user]);

    return (
        <div className="w-full min-h-screen flex items-center justify-center flex-col lg:flex-row bg-[#f3f4f6]">
            <div className="w-full md:w-auto flex gap-0 md:gap-40 flex-col md:flex-row items-center justify-center">
                {/* left side */}
                <div className="h-full w-full lg:w-2/3 flex items-center justify-center">
                   <div className="w-full md:max-w-lg 2xl:max-3x1 flex flex-col items-center justify-center gap-5 md:gap-10 2x1: mt-20" >
                      <span className="flex gap-1 py-1 px-3 border rounded-full text-sm md:text-base bordergray-300 text-gray-600">
                        Manage all your task in one place! 
                       </span>
                       <p className="flex flex-col gap-0 md:gap-4 text-4xl md:text-6xl 2x1:text-7xl font-back text-center text-blue-700">
                        <span>Cloud-based</span>
                        <span>Task Management</span>
                       </p>
                       <div className="cell"> 
                        <div className="ciccle rotate-in-up-left "></div>
                       </div>
                    </div>
                </div>
                {/* right side */}
            <div className="w-full md-1/3 p-4 md:p-1 flex flex-col justify-center items-center">                 
                 <form onSubmit={handleSubmit(submitHabndler)}
                    className='form-container w-full md:w-100 flex flex-col gap-y-8 bg-white dark:bg-slate-900 px-10 pt-14 pb-14'
                    >
                        <div className="">
                            <p className=" text-blue-600 text-3xl font-bold text-center">
                                Bem Vindo de volta!
                            </p>
                            <p className="text-center text-base text-gray-700">
                                Entre na sua conta para continuar
                            </p>
                        </div>
                        <div className="flex flex-col gap-y-5 ">
                            <Textbox
                            placeholder="Email@exmplo.com"
                            type="email"
                            name="email  Endereço"    
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                            register={register("email", {
                                required: "Email é obrigatório",
                            })}
                            error={errors.email ? errors.email.message : ""}
                            /> 
                            <Textbox
                placeholder='password'
                type='password'
                name='password'
                label='Password'
                className='w-full rounded-full'
                register={register("password", {
                  required: "Password is required!",
                })}
                error={errors.password ? errors.password?.message : ""}
              />
              <span className='text-sm text-gray-600 hover:underline cursor-pointer'>
                Forget Password?
              </span>
                        </div>   

            </form>                   
                </div>
            </div>
        </div>
        );
};

export default Login;

//