import React, { useRef, useState } from "react";
import { IMG_URL, LOGO_URL, PHOTO_URL } from "./Constants";
import { Link, useNavigate } from "react-router-dom";
import { checkValidateData } from "../Utils/Validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../Utils/Firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../Utils/userSlice";

function Signin() {
  const [learnMore, setLearnMore] = useState(true);
  const [signinsignup, setSignInSignUp] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    setLearnMore(!learnMore);
  };

  const handleSignInSignUp = () => {
    setSignInSignUp(!signinsignup);
  };

  const handleButtonClick = () => {
    // console.log("clicked")

    //validate the form data
    const message = checkValidateData(
      email.current.value,
      password.current.value
    );
    setErrorMsg(message);
    if (message) return;

    // Sign In Sign Up Logic
    if (signinsignup) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: PHOTO_URL,
          })
            .then(() => {
              // Profile updated!
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
              // navigate("/browse");
              // ...
            })
            .catch((error) => {
              // An error occurred
              setErrorMsg(error.message);
              // ...
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
          setErrorMsg(errorCode + "-" + errorMessage);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
          setErrorMsg(errorCode + "-" + errorMessage);
        });
    }
  };

  return (
    <div>
      <div className="relative h-screen w-screen bg-black bg-opacity-60">
        <div className="absolute w-full px-8 py-4 bg-gradient-to-b from-black flex items-center z-10">
          <img className="w-44" src={LOGO_URL} alt="netflix-logo" />
        </div>
        <div className="absolute inset-0 -z-10">
          <img
            className="w-full h-full object-cover"
            src={IMG_URL}
            alt=""
          ></img>
        </div>

        <div className="absolute inset-0 flex items-center justify-center  ">
          <div className="w-[450px] p-12 bg-black bg-opacity-60 rounded-lg shadow-lg">
            <p className="text-3xl font-bold text-white mb-6">
              {signinsignup ? "Sign Up" : "Sign In"}
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col gap-4"
            >
              {signinsignup ? (
                <input
                  ref={name}
                  type="text"
                  placeholder="User Name"
                  className="text-white bg-black bg-opacity-40 py-3 px-5 border border-gray-300"
                />
              ) : (
                ""
              )}
              <input
                ref={email}
                type="email"
                placeholder="Email"
                className="text-white bg-black bg-opacity-40 py-3 px-5 border border-gray-300"
              />
              <input
                ref={password}
                type="password"
                placeholder="Password"
                className="text-white bg-black bg-opacity-40 py-3 px-5 border border-gray-300"
              />
              <button
                className="py-2 px-10 bg-red-600 text-white rounded hover:scale-105 transition-transform"
                onClick={handleButtonClick}
              >
                {signinsignup ? "Sign Up" : "Sign In"}
              </button>
              <p className="text-red-600 font-bold">{errorMsg}</p>
              <p className="text-gray-400 flex justify-center items-center text-lg font-semibold ">
                OR
              </p>
              <button className="py-2 px-10 bg-gray-400 font-bold bg-opacity-35 text-white rounded">
                Use a sign-in code
              </button>
              <p className="text-gray-400 flex justify-center items-center font-semibold underline cursor-pointer">
                Forgot password?
              </p>
              <label className="text-white text-base flex">
                <input
                  type="checkbox"
                  className="m-1 appearance-none border border-white rounded-sm h-[18px] w-[18px] bg-transparent cursor-pointer checked:appearance-auto"
                />
                Remember me
              </label>
              <div className="text-gray-300 font-semibold">
                New to Netflix?
                <Link
                  to=""
                  className="text-white font-bold hover:underline"
                  onClick={handleSignInSignUp}
                >
                  {signinsignup ? "Sign in now." : "Sign up now."}
                </Link>
              </div>
              <p className="text-gray-500 text-xs font-semibold">
                This page is protected by Google reCAPTCHA to ensure you're not
                a bot.
              </p>
              <div onClick={handleClick}>
                {learnMore ? (
                  <p className="text-blue-600 text-sm underline cursor-pointer font-semibold">
                    Learn more.
                  </p>
                ) : (
                  <p className="text-gray-500 text-xs font-semibold">
                    The information collected by Google reCAPTCHA is subject to
                    the Google{" "}
                    <Link to="" className="text-blue-600 hover:underline">
                      Privacy Policy
                    </Link>{" "}
                    and{" "}
                    <Link to="" className="text-blue-600 hover:underline">
                      Terms of Service
                    </Link>
                    , and is used for providing, maintaining, and improving the
                    reCAPTCHA service and for general security purposes (it is
                    not used for personalised advertising by Google).
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="bg-[#212121] h-auto w-full  text-white">
        <div className="p-10">
          <p className="p-4">Questions? Call 000-800-919-1743 (Toll-Free)</p>
          <div className="flex justify-evenly">
            <div className="m-2  p-2">
              <div className="text-slate-200 py-2 underline">FAQ</div>
              <div className="text-slate-200 py-2 underline">Terms of Use</div>
              <div className="py-2">
                <select className=" p-2 w-[120px] rounded ml-auto bg-transparent text-stone-50 bg-gradient-to-t from-black border-2 border-white ">
                  <option value="" className="text-black">
                    English
                  </option>
                  <option value="option1" className="text-black">
                    हिन्दी
                  </option>
                </select>
              </div>
            </div>
            <div>
              <div className="text-slate-200 py-2 underline">Help Centre</div>
              <div className="text-slate-200 py-2 underline">
                Cookie Perferences
              </div>
            </div>
            <div>
              <div className="text-slate-200 py-2 underline">
                Corporate Information
              </div>
            </div>
            <div>
              <div className="text-slate-200 py-2 underline">Privacy</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
