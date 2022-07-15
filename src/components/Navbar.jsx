import React, { useEffect }  from 'react'
import { useAuthState } from "react-firebase-hooks/auth";
import { signInWithGoogle, auth, logout } from '../firebase'
import {useNavigate} from "react-router-dom"

const Navbar = () => {
    const [user, loading, error] = useAuthState(auth);

    const navigate = useNavigate();

    useEffect(() => {
        if(loading) return
        if(!user) {
            navigate("/")
        }
      }, [user, loading]);

  return (
    <div className='flex item-center justify-between p-6 w-full  px-8'>
        <div  className='w-28 flex items-center font-bold text-2xl cursor-pointer' onClick={() => (navigate('/'))}>
            <div>SWApp</div>
        </div>
        {user && <div className='flex items-center'>
            <div  className='px-4 cursor-pointer hover:text-[#12194f]' onClick={() => (navigate('/dashboard'))}>SOS</div>
            <div  className='px-4 cursor-pointer hover:text-[#12194f]' onClick={() => (navigate('/community'))}>Community</div>
        </div>}
        <div className='flex items-center'>
            {user && <div className='pr-4'>{user.displayName}</div>}
            {!user && <button className="text-white bg-black w-30 px-6 py-2 rounded-xl" onClick={() => signInWithGoogle()}>Login</button>}
            {user && <button className="text-white bg-black w-30 px-6 py-2 rounded-xl" onClick={logout}>Logout</button>}
        </div>
    </div>
  )
}

export default Navbar