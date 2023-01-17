import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home, Auth, Create, Post, User } from "./containers";
import { Navbar } from "./components";
import { useLocation } from "react-router-dom";

export default function App() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/auth" && <Navbar />}
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/posts/:id" element={<Post />} />
        <Route path="/users/:id" element={<User />} />
      </Routes>
    </>
  );
}
