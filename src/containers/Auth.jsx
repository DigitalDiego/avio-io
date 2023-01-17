import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../firebase.config";
import { signInWithPopup } from "firebase/auth";
import { AiFillGoogleCircle } from "react-icons/ai";

export default function Auth() {
  const isAuth = localStorage.getItem("isAuth");
  const navigate = useNavigate();

  const login = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        localStorage.setItem("isAuth", true);
        navigate("/");
      })
      .catch((error) => console.error(error));
  };
  useEffect(() => {
    if (isAuth) navigate("/");
  }, []);
  return (
    <div className="w-full h-screen lg:flex">
      <div className="hidden lg:inline lg:w-1/2 lg:h-full lg:relative">
        <img
          className="w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1618225719167-e378429446bb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
          alt="auth image"
        />
        <div className="absolute top-0 right-0 grid place-items-center w-full h-full bg-black/80">
          <p className="text-8xl font-courgette text-white">Avio</p>
        </div>
      </div>
      <div className="w-full h-full flex justify-center items-center gap-[1em] flex-col lg:w-1/2">
        <p className="font-courgette text-7xl lg:hidden">Avio</p>
        <p className="hidden lg:inline text-5xl">
          Welcome to <span className="font-courgette">Avio</span>
        </p>
        <p className="hidden lg:text-xs lg:inline lg:w-3/5 lg:mx-auto lg:text-center">
          Join a platform where people come and display what they have seen on
          their journeys. Interact with people and let them know how amazing
          their images are.
        </p>
        <button
          className="flex items-center gap-[.5em] px-4 h-[35px] rounded-lg bg-teal-500 text-white"
          onClick={login}
        >
          Login with <AiFillGoogleCircle className="lg:text-base" />
        </button>
      </div>
    </div>
  );
}
