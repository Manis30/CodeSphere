import { useState } from "react";
import { Link,useSearchParams,useNavigate } from "react-router";
import { toast } from "react-toastify";
import {
  FaCode,
  FaUsers,
  FaRocket,
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { ID } from "appwrite";
import { account } from "../../BackendServices/AppWrite";
import signup from '../../assets/signup.png'
export default function ResetPassword() {
  const [searchparams]=useSearchParams()
  const navigate=useNavigate()
  const userid=searchparams.get('userId')
  const secret=searchparams.get("secret")
    const initialState={
    newpassword: "",
    confirmpassword: ""
    }
  const [showPassword, setShowPassword] = useState(false);
  const [error,setError]=useState(initialState)
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const updatedData={
        ...formData,[e.target.name]:e.target.value
    }
    validate(updatedData)
    setFormData(updatedData)
  };

  const validate=(data)=>{
    const newErrors={}
    if(!data.newpassword.trim()){
        newErrors.newpassword="Password is required"
    }
    else{
        if(data.newpassword.trim().length<8){
            newErrors.newpassword="Password must be atleast 8 characters"
        }
        else{
            newErrors.newpassword=""
        }
    }
     if(!data.confirmpassword.trim()){
        newErrors.confirmpassword="Password is required"
    }
    else{
        if(data.confirmpassword.trim().length<8){
            newErrors.confirmpassword="Password must be atleast 8 characters"
        }
        else{
            if(data.confirmpassword!=data.newpassword){
              newErrors.confirmpassword="Confirm Password must same as new password"
            }
            else{
              newErrors.newpconfirmpasswordassword=""
            }
        }
    }
    setError(newErrors)
  }
  const handleSubmit=async(e)=>{
        e.preventDefault();
        validate(formData)
        const isErrors=Object.values(error).some((item)=>item!="")
        if(isErrors){
            return
        }
        else{
           try {
             const response=await account.updateRecovery(userid,secret,formData.newpassword);
            console.log(response,"From data")
            toast.success("Password updated Sucessfully")
            navigate("/signin",{replace:true})
            setFormData(initialState)
           } catch (error) {
                console.log(error)
                toast.error(error.message)
           }
        }
  }
  return (
    <div className="min-h-screen bg-[#0B1120] flex">
      <div className="hidden lg:flex w-1/2 flex-col  px-14 py-6 border-r border-slate-800">
        <div className="flex items-center gap-3">

          <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-violet-600 to-purple-500 flex items-center justify-center">

            <span className="text-2xl font-bold text-white">
              S
            </span>

          </div>

          <h1 className="text-3xl font-bold text-white">

            Code<span className="text-violet-500">Sphere</span>

          </h1>

        </div>

        {/* Content */}

        <div>


          <h2 className="text-5xl font-bold text-white leading-tight mt-4">
Welcome Back to
            <span className="text-violet-500">
              CodeSphere
            </span>

          </h2>


        </div>

        <div className="flex  justify-center mt-10 h-[400px]">

          <img
            src={signup}
            alt="Developer"
            className="w-full rounded-md object-cover"
          />

        </div>

      </div>


      <div className="flex-1 flex justify-center items-center px-8 py-6">

        <div className="w-full max-w-xl bg-[#111827] border border-slate-700 rounded-3xl p-10 shadow-2xl">


          <div className="flex justify-center mt-1">

            <div className="w-20 h-20 rounded-full bg-violet-500/10 border border-violet-500 flex justify-center items-center">

              <FaUser className="text-violet-400 text-3xl" />

            </div>

          </div>

          <h2 className="text-center text-4xl font-bold text-white mt-5">

            Sign In

          </h2>


          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="text-sm text-slate-300 block mb-2">
               New Password
              </label>

              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />

                <input
                  type={showPassword ? "text" : "password"}
                  name="newpassword"
                  value={formData.newpassword}
                  onChange={handleChange}
                  placeholder="Enter password"
                  className="w-full bg-[#0F172A] border border-slate-700 rounded-xl py-4 pl-12 pr-12 text-white placeholder:text-slate-500 focus:border-violet-500 focus:outline-none transition"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
               
              </div>
               {error.newpassword && (
  <p className="text-red-500 text-sm mt-1">
    {error.newpassword}
  </p>
)}
            </div>
              <div>
              <label className="text-sm text-slate-300 block mb-2">
              Confirm  Password
              </label>

              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />

                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmpassword"
                  value={formData.confirmpassword}
                  onChange={handleChange}
                  placeholder="Enter confirm password"
                  className="w-full bg-[#0F172A] border border-slate-700 rounded-xl py-4 pl-12 pr-12 text-white placeholder:text-slate-500 focus:border-violet-500 focus:outline-none transition"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
               
              </div>
               {error.confirmpassword && (
  <p className="text-red-500 text-sm mt-1">
    {error.confirmpassword}
  </p>
)}
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 py-4 rounded-xl font-semibold text-lg transition duration-300 shadow-lg shadow-violet-600/20"
            >
              Update Password
            </button>
          </form>
                  <div className="flex mt-4 justify-end">


          </div>
        </div>

      </div>

    </div>
  );
}