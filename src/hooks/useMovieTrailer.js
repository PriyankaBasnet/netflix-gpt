import { API_OPTIONS } from "../utils/constants";
import { useEffect } from 'react';
import { useDispatch} from 'react-redux';
import { addTrailerVideo } from '../utils/moviesSlice';
import { getDefaultNormalizer } from "@testing-library/react";

const useMovieTrailer = (movieId)=> {
    
    const dispatch = useDispatch();
    // fetch the trailer video
    const getMovieVideo = async () => {
        const data = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos`, API_OPTIONS);
        const videos = await data.json();
        const trailer = videos?.results[0];
        dispatch(addTrailerVideo(trailer));
    }
    useEffect(()=> {
        getMovieVideo();
    },[]);
}

export default useMovieTrailer;