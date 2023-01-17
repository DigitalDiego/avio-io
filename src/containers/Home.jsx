import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Post } from "../components";
import { client, fetchPosts } from "../utils";
import Masonry from "react-masonry-css";
import { AiOutlineLoading } from "react-icons/ai";

export default function Home() {
  const [posts, setPosts] = useState(null);
  const isAuth = localStorage.getItem("isAuth");
  const navigate = useNavigate();
  const breakpointColumnsObj = {
    default: 4,
    3000: 6,
    2000: 5,
    1200: 3,
    1000: 2,
    500: 1,
  };

  useEffect(() => {
    if (!isAuth) navigate("/auth");
  }, []);
  useEffect(() => {
    client
      .fetch(fetchPosts)
      .then((data) => {
        setPosts(data);
      })
      .catch((error) => console.error(error));
  }, []);
  return (
    <>
      {!posts ? (
        <div className="w-full h-[90vh] grid place-content-center 2xl:max-w-7xl 2xl:mx-auto">
          <AiOutlineLoading className="animate-spin" />
        </div>
      ) : (
        <Masonry
          className="flex px-[2vw] py-[2vw] gap-2 2xl:max-w-7xl 2xl:mx-auto"
          breakpointCols={breakpointColumnsObj}
        >
          {posts?.map((post) => (
            <Post {...post} key={post?._id} />
          ))}
        </Masonry>
      )}
    </>
  );
}
