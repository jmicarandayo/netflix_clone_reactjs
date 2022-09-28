import React from 'react'
import SavedShows from '../components/SavedShows'

const Account = () => {
  return (
    <div className='w-full text-white'>
      <img className='w-full h-[400px] object-cover' src="https://assets.nflxext.com/ffe/siteui/vlv3/45082c39-e6d5-4b02-8867-e38fe32ed3af/e48854dc-5cbd-4610-bd24-08972944897f/PH-en-20220919-popsignuptwoweeks-perspective_alpha_website_large.jpg" alt="" />
      <div className='bg-black/60 h-[600px] w-full fixed top-0 left-0'></div>
      <div className='absolute top-[20%] p-4 md:p-8'>
        <h1 className='text-3xl md:text-5xl font-bold'>My Shows</h1>
      </div>
      <SavedShows/>
    </div>
  )
}

export default Account