import React, { useEffect } from "react";
import { LOGO_URL } from "./Constants";
import { auth } from "../Utils/Firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {  useSelector } from "react-redux";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";


function Browse() {
  const navigate = useNavigate();
  const userURL = useSelector((store) => store.user);
  useNowPlayingMovies();



  const handleSignout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
        navigate("");
      });
  };

  return (
    <div>
      <div className="absolute w-full px-8 py-2 bg-gradient-to-bl from-black flex items-center z-50">
        <img className="w-44" src={LOGO_URL} alt="netflix-logo" />
        <div className="ml-auto flex items-center gap-4">
          {userURL && (
            <div>
              <img
                src="https://avatars.githubusercontent.com/u/173898483?v=4"
                alt="noavatar"
                className="h-11 rounded-full"
              />
            </div>
          )}
          <button
            className="bg-red-700 text-stone-50 px-4 py-2 rounded hover:scale-105 transition-transform"
            onClick={handleSignout}
          >
            Sign Out
          </button>
        </div>
      </div>
      <MainContainer />
      <SecondaryContainer />
      {/*
          MainContainer
            -VideoBackground
            -VideoTitle
          SecondaryContainer
            - MovieList * n
              cards * n
      */}
    </div>
  );
}

export default Browse;
