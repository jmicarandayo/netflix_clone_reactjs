import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import Movie from './Movie';
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const Row = ({title, url}) => {
    const [ movies, setMovies ] = useState([]);
    const slider = useRef();

    const slideLeft = () => {
        slider.current.scrollLeft = slider.current.scrollLeft - 500;
    }
    const slideRight = () => {
        slider.current.scrollLeft = slider.current.scrollLeft + 500;
    }

    useEffect(()=> {
        const getMovies = async() => {
            try{
                const res = await axios.get(url);
                setMovies(res.data.results)
            } catch(err) {
                console.log(err)
            }
        };
        getMovies();
    },[url])
  return (
    <div>
        <h1 className='text-white font-bold md:text-4xl p-4'>{title}</h1>
        <div className='relative flex items-center group'>
            <MdChevronLeft className='bg-white rounded-full absolute left-0 z-10 opacity-50 hover:opacity-100 cursor-pointer hidden group-hover:block' size={40} onClick={slideLeft}/>
            <div ref={slider} className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative'>
                        {movies && movies.map(item => (
                            <Movie item={item} key={item.id}/>
                        ))}
            </div>
            <MdChevronRight className='bg-white rounded-full absolute right-0 z-10 opacity-50 hover:opacity-100 cursor-pointer hidden group-hover:block' size={40} onClick={slideRight}/>
        </div>
    </div>
  )
}

export default Row