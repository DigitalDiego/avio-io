import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { client, fetchUserPosts } from "../utils";
import { AiOutlineLoading } from "react-icons/ai";
import { UserPost } from "../components";
import Masonry from "react-masonry-css";

export default function User() {
  const [posts, setPosts] = useState(null);
  const isAuth = localStorage.getItem("isAuth");
  const navigate = useNavigate();
  const { id } = useParams();
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
      .fetch(fetchUserPosts(id))
      .then((data) => {
        setPosts(data);
      })
      .catch((error) => console.error(error));
  }, []);
  return (
    <>
      {!posts ? (
        <div className="w-full h-[90vh] grid place-items-center 2xl:max-w-7xl 2xl:mx-auto">
          <AiOutlineLoading className="animate-spin" />
        </div>
      ) : (
        <div className="px-[2vw] py-[2vw] 2xl:max-w-7xl 2xl:mx-auto">
          <div className="w-full h-[20vh] flex justify-between items-center">
            <div className="flex items-center gap-2">
              <img
                className="w-[45px] h-[45px] object-cover rounded-full"
                src={posts[0]?.avatar}
                alt={posts[0]?.user}
              />
              <p>{posts[0]?.user}</p>
            </div>
            <p>Posts: {posts?.length}</p>
          </div>
          <Masonry breakpointCols={breakpointColumnsObj} className="flex gap-2">
            {posts?.map((post) => (
              <UserPost {...post} key={post?._id} />
            ))}
          </Masonry>
        </div>
      )}
    </>
  );
}
