import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase.config";
import { signOut } from "firebase/auth";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    signOut(auth)
      .then(() => {
        localStorage.clear();
        navigate("/auth");
      })
      .catch((error) => console.error(error));
  };
  return (
    <div className="sticky top-0 right-0 bg-white z-[4000] w-full h-[10vh] flex justify-between items-center px-[2vw]">
      <Link className="text-4xl font-courgette" to="/">
        Avio
      </Link>
      <nav className="flex items-center gap-[1em]">
        <Link
          className="w-[35px] h-[35px] grid place-content-center bg-teal-500 text-white rounded-lg"
          to="/create"
        >
          <AiOutlinePlus />
        </Link>
        <button
          className="px-4 h-[35px] rounded-lg bg-rose-500 text-white"
          onClick={logout}
        >
          Logout
        </button>
      </nav>
    </div>
  );
}
