import { signOut } from 'firebase/auth';
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { auth } from '../firebase';

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className='flex justify-between p-4 absolute w-full z-[100]'>
        <Link to='/'>
          <h1 className='text-red-600 font-bold text-4xl cursor-pointer'>NETFLIX</h1>
        </Link>
        {currentUser 
        ? (
          <div>
              <Link to='/account'>
                <button className='text-white mr-4'>Account</button>
              </Link>
                <button onClick={() => signOut(auth)} className='text-white bg-red-600 px-4 py-2 rounded'>Logout</button>
          </div>
        )
        : (
          <div>
              <Link to='/login'>
                <button className='text-white mr-4'>Sign In</button>
              </Link>
              <Link to='/register'>
                <button className='text-white bg-red-600 px-4 py-2 rounded'>Sign Up</button>
              </Link>
          </div>
        )}
    </div>
  )
}

export default Navbar