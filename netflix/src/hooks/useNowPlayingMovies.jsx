import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../Components/Constants";
import { addNowPlayingMovies } from "../Utils/moviesSlice";


const useNowPlayingMovies = () => {

//Fetch data from TMDB api and update store
  const dispatch = useDispatch();


  const getNowPlayingMovies = async () => {
    const data = await fetch('https://api.themoviedb.org/3/movie/now_playing?page=1', API_OPTIONS);

    const json  = await data.json();
    console.log(json?.results);
    dispatch(addNowPlayingMovies(json.results));

  }

  useEffect(() => {
    getNowPlayingMovies();
  },[])



};

export default useNowPlayingMovies;