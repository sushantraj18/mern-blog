import React from 'react'
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import {app} from '../firebase'
import { useDispatch } from 'react-redux'
import { logInSuccess } from '../redux/userSlice'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'



function Oauth() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const auth = getAuth(app)
  const handleGoogleClick = async()=>{

    const provider = new GoogleAuthProvider()
      provider.setCustomParameters({prompt : 'select_account'})
    try{
      const googleResult = await signInWithPopup(auth,provider)
      // console.log(googleResult)
      const res = await fetch("api/auth/google",{
        method : 'POST',
        headers : {'content-type' : 'application/json'},
        body : JSON.stringify({
          name : googleResult.user.displayName,
          email : googleResult.user.email,
          googlePhotoUrl : googleResult.user.photoURL,
        })
      })

      const data = await res.json()

      if(res.ok){
        dispatch(logInSuccess(data))
        toast.success("success")
         navigate("/")
      }

    }catch(e){
      console.log(e)
    }
  }
  return (
    <div>
        <div className="px-6 mt-2 sm:px-0 max-w-sm">
    <button type="button" onClick={handleGoogleClick} className=" cursor-pointer focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between mr-2 mb-2"><svg className="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>Continue with Google<div></div></button>
</div>
    </div>
  )
}

export default Oauth