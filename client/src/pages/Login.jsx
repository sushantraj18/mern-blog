import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { logInStart,logInSuccess,logInFailure } from '../redux/userSlice'
import {useDispatch, useSelector} from 'react-redux'




function Login() {
  const [formData,setFormData] = useState({})
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {currentUser,error} = useSelector(state=>state.user)
  console.log(error)

  const changeHandler = (e)=>{
    setFormData((prev)=>({...prev,[e.target.id] : e.target.value}))
  }

  const  handleSubmit = async(e)=>{
    e.preventDefault()

    if(!formData.username || !formData.password){
        
      toast.error("Please fill out all fields")
      return dispatch(logInFailure("Please fill out all fields"))
    }
    try{
      setLoading(true)
      dispatch(logInStart())
      const res =  await fetch('/api/auth/login',{
        method : 'POST',
        headers : {'Content-Type' : 'application/json'},
        body : JSON.stringify(formData)
      })

      const data = await res.json()

      if( data.success === false){
        
        dispatch(logInFailure(data.errMessage))
        setLoading(false)
        
        return toast.error(data.errMessage)
      }
      
      
      setLoading(false)
      if(res.ok){
        dispatch(logInSuccess(data))
         toast.success("login successful")
         navigate("/")
      }
      
    }catch(e){
      console.error(e)
      dispatch(logInFailure(e.message))
    }
    
  }

  return (
    <div className="flex  items-center p-4 ">
      <div className="text-center  text-white w-[50%] " >
        <h1 className="text-1xl  ">Sign in to  <span className="text-3xl font-bold ">best </span>  blog's </h1>
      </div>
      <div className="relative py-3 sm:max-w-xs sm:mx-auto">
        <div className="min-h-96 px-8 py-6 mt-4 text-left bg-zing-800  rounded-xl shadow-lg">
          <div className="flex flex-col justify-center items-center h-full select-none">
            <div className="flex flex-col items-center justify-center gap-2 mb-8">

              <p className="m-0 text-gray-400 text-[16px] font-semibold ">
                Sign In
              </p>

            </div>
          <form  method='POST' onSubmit={handleSubmit} >
            <div className="w-full flex flex-col gap-2">
              <label className="font-semibold text-xs text-gray-400">Username</label>
              <input onChange={changeHandler} placeholder="Username" id="username" className="border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none dark:border-gray-500 dark:bg-gray-900"  />
            </div>

            

            <div className="w-full flex flex-col gap-2">
            <label className="font-semibold text-xs text-gray-400">Password</label>
            <input onChange={changeHandler} placeholder="••••••••" id="password" type='password' className="border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none dark:border-gray-500 dark:bg-gray-900"   />
          </div>
          <div>
            <button  className="py-1 px-8 bg-blue-500 hover:bg-blue-800 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg cursor-pointer select-none">
              {loading ? 'Loading...' :'Sign In'}
            </button>
          </div>
          </form>
          <div className="text-sm text-gray-400 flex gap-2 mt-3">
            <span>Don't have an account?</span>
            <Link className="hover:text-blue-800" to={"/signup"}>Sign up</Link>
          </div>

          </div>
          

        </div>
      </div>
    </div>
  )
}

export default Login