import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./Home.jsx";
import Signin from "./Signin";
import Browse from "./Browse";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Utils/Firebase.jsx";
import { addUser, removeUser } from "../Utils/userSlice.jsx";


function Body() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
// Whenever the user can signin or signup store the data into the redux store and whenever the user can signout the data will be deleted.
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid:uid, email: email, displayName: displayName, photoURL: photoURL}));
        navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");

      }
    });

    // Unsubscribe when component unmount
    return () => unSubscribe();
  },[])



  return (
    <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/browse" element={<Browse />} />
        </Routes>
    </div>
  );
}

export default Body;
