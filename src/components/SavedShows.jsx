import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import { db } from '../firebase';
import { MdChevronLeft, MdChevronRight, MdClose } from "react-icons/md";


const SavedShows = () => {
  const [ movies, setMovies ] = useState([]);
  const { currentUser } = useContext(AuthContext);
  // console.log(currentUser.email)
  const slider = useRef();

  const slideLeft = () => {
      slider.current.scrollLeft = slider.current.scrollLeft - 500;
  }
  const slideRight = () => {
      slider.current.scrollLeft = slider.current.scrollLeft + 500;
  }

  const handleRemove = async(id) => {
    const result = movies.filter(item => item.id !== id);
    try {
      await updateDoc(doc(db, 'users', `${currentUser?.email}`), {
        savedShows: result
      })
    } catch(err) {
      console.log(err)
    }
  }
  useEffect(() => {
    onSnapshot(doc(db, 'users', `${currentUser?.email}`), (doc) => {
      setMovies(doc.data()?.savedShows)
      // console.log(doc.data()?.savedShows)
    });
  }, [currentUser?.email])
  return (
    <div>
        <h1 className='text-white font-bold md:text-4xl p-4'>My Shows</h1>
        <div className='relative flex items-center group text-gray-300'>
            <MdChevronLeft className='bg-white rounded-full absolute left-0 z-10 opacity-50 hover:opacity-100 cursor-pointer hidden group-hover:block' size={40} onClick={slideLeft}/>
            <div ref={slider} className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative'>
                        {movies && movies.map(item => (
                            <div key={item.id} className='w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative group p-2'>
                              <img className='w-full h-auto block' src={`https://image.tmdb.org/t/p/w500/${item?.img}`} alt={item.title} />
                              <div className='absolute w-full h-full top-0 left-0 flex justify-center items-center text-white hover:bg-black/80 opacity-0 hover:opacity-100'>
                                  <p className='text-xs md:text-sm font-bold whitespace-normal text-center'>{item.title}</p>
                                  <span className='absolute top-4 right-4 text-gray-300' onClick={() => handleRemove(item.id)}><MdClose/></span>
                              </div>
                          </div>
                        ))}
            </div>
            <MdChevronRight className='bg-white rounded-full absolute right-0 z-10 opacity-50 hover:opacity-100 cursor-pointer hidden group-hover:block' size={40} onClick={slideRight}/>
        </div>
    </div>
  )
}

export default SavedShows