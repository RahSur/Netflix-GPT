import React, { useEffect } from 'react'
import Header from './Header'
import { API_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addMovieData } from '../utils/movieSlice'

const Browse = () => {
    const dispatch = useDispatch();
    const movie = useSelector(store => store.movie);
    const {Title, Released,Runtime} = movie.movieData;

    const getAPIData = async () => {
        const data = await fetch(API_URL);
        const json = await data.json();
        dispatch(addMovieData(json));
        console.log(json)
    }

    useEffect(() => {
        getAPIData();
    },[]);

    return (
        <div>
            <Header />
            <div className='absolute top-30 ml-12 font-bold text-2xl text-blue-600'>
                {Title} | {Released} | {Runtime}
            </div>
        </div>
    )
}

export default Browse