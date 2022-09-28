import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import React, { useContext, useState } from 'react'
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { AuthContext } from '../context/AuthContext';
import { db } from '../firebase';

const Movie = ({item}) => {
    const [ isLiked, setIsLiked ] = useState(false);
    // const [ saved, setSaved ] = useState(false);
    const { currentUser } = useContext(AuthContext);
    const saveShow = async() => {
        if(currentUser?.email) {
            setIsLiked(!isLiked)
            // setSaved(true)
            try {
                await updateDoc(doc(db, 'users', currentUser?.email), {
                    savedShows: arrayUnion({
                        id: item.id,
                        title: item.title,
                        img: item.backdrop_path
                    })
                })
            } catch(err) {
                console.log(err)
            }
        } else {
            alert('Please log in to save a movie');
        }
        
    }
  return (
        <div className='w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative group p-2'>
            <img className='w-full h-auto block' src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`} alt={item.original_title} />
            <div className='absolute w-full h-full top-0 left-0 flex justify-center items-center text-white hover:bg-black/80 opacity-0 hover:opacity-100'>
                <p className='text-xs md:text-sm font-bold whitespace-normal text-center'>{item.title}</p>
                <span className='absolute top-4 left-4 text-gray-300' onClick={saveShow}>{isLiked ? <FaHeart/> : <FaRegHeart/>}</span>
            </div>
        </div>
  )
}

export default Movie