import axios from 'axios';
import React, { useEffect, useState } from 'react'
import request from '../Request';

const Main = () => {
    const [ movies, setMovies ] = useState([]);
    const movie = movies[(Math.floor(Math.random() * movies.length))];

    const truncateString = (str, num) => {
        if(str?.length > num) {
            return str.slice(0, num) + '...'
        } else {
            return str
        }
    }
    
    useEffect(()=> {
        const getMovies = async() => {
            try{
                const res = await axios.get(request.requestPopular)
                setMovies(res.data.results)
            } catch(err) {
                console.log(err)
            }
        };
        getMovies();
    },[])
  return (
    <div className='w-full h-[550px] text-white'>
            <div className='absolute h-[550px] w-full bg-gradient-to-r from-black'></div>
                <img className='h-full w-full object-cover' src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`} alt={movie?.title} />
                <div className='px-4 md:px-8 absolute top-[25%]'>
                    <h1 className='text-3xl md:text-5xl font-bold'>{movie?.title}</h1>
                    <div className='my-4'>
                        <button className='px-5 py-2 border border-gray-300 bg-gray-300 text-black'>Play</button>
                        <button className='px-5 py-2 border border-gray-300 ml-4'>Watch Later</button>
                    </div>
                    <span className='text-gray-300 text-sm'>Released {movie?.release_date}</span>
                    <p className='w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[40%]'>{truncateString(movie?.overview, 150)}</p>
                </div>
    </div>
  )
}

export default Main