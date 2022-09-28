import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth, db } from '../firebase'

const Register = () => {
    const [ error, setError ] = useState('')
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(res.user, {
                displayName
            });
            await setDoc(doc(db, 'users', email), {
                savedShows:[]
            })
            console.log(res)
            navigate('/')
        } catch(err) {
            console.log(err)
            setError(err.message)
        }
    };

  return (
    <div className='w-full h-screen'>
        <img className='hidden absolute sm:block w-full h-full object-cover' src="https://assets.nflxext.com/ffe/siteui/vlv3/45082c39-e6d5-4b02-8867-e38fe32ed3af/e48854dc-5cbd-4610-bd24-08972944897f/PH-en-20220919-popsignuptwoweeks-perspective_alpha_website_large.jpg" alt="" />
        <div className='bg-black/60 top-0 left-0 fixed w-full h-screen'></div>
        <div className='fixed w-full py-24 z-30'>
            <div className='text-white max-w-[450px] mx-auto bg-black/75'>
                <div className='max-w-[320px] mx-auto py-16'>
                <h1 className='text-3xl font-bold mb-4'>Sign Up</h1>
                {error && <span className='text-red-600'>{error}</span>}
                <form onSubmit={handleSubmit} className='flex flex-col'>
                    <input className='p-2 my-2 bg-gray-700 rounded outline-none' type="text" placeholder='Username'/>
                    <input className='p-2 my-2 bg-gray-700 rounded outline-none' type="text" placeholder='Email'/>
                    <input className='p-2 my-2 bg-gray-700 rounded outline-none' type="password" placeholder='Password'/>
                    <button className='bg-red-600 py-2 rounded my-4 font-bold'>Sign Up</button>
                    <div className='flex justify-between items-center text-gray-600'>
                        <div className='flex items-center gap-2'><input type="checkbox"/> Remember me</div>
                        <div>Need Help?</div>
                    </div>
                    <p className='text-gray-600 py-8'>Already subscribed to Netflix?
                        <Link className='text-white ml-2' to='/login'>Sign In</Link>
                    </p>
                </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Register