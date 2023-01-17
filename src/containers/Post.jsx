import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { client, urlFor, fetchPost, fetchPostComments } from "../utils";
import { AiOutlineLoading, AiOutlinePlus } from "react-icons/ai";
import moment from "moment";
import { auth } from "../firebase.config";
import { Comment } from "../components";

export default function Post() {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState(null);
  const [comment, setComment] = useState("");
  const isAuth = localStorage.getItem("isAuth");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!isAuth) navigate("/auth");
  }, []);
  useEffect(() => {
    client
      .fetch(fetchPost(id))
      .then((data) => {
        setPost(data[0]);
      })
      .catch((error) => console.error(error));
  }, []);
  const createComment = async () => {
    const doc = {
      _type: "comment",
      user: auth.currentUser.displayName,
      avatar: auth.currentUser.photoURL,
      comment,
      postId: post?._id,
    };
    client
      .create(doc)
      .then(() => {
        setComment("");
        navigate("/");
      })
      .catch((error) => console.error(error));
  };
  useEffect(() => {
    client
      .fetch(fetchPostComments(id))
      .then((data) => {
        setComments(data);
      })
      .catch((error) => console.error(error));
  }, []);
  return (
    <>
      {!post ? (
        <div className="w-full h-[90vh] grid place-content-center 2xl:max-w-7xl 2xl:mx-auto">
          <AiOutlineLoading className="animate-spin" />
        </div>
      ) : (
        <div className="w-full px-[2vw] py-[2vw] lg:flex lg:py-0 2xl:max-w-7xl 2xl:mx-auto">
          <div className="w-full h-[80vh] grid place-items-center lg:w-1/2 lg:h-[90vh]">
            <img
              className="w-[90%] rounded-lg object-cover lg:w-4/5"
              src={urlFor(post?.image?.asset?._ref)}
              alt={"Post by " + post?.user}
            />
          </div>
          <div className="w-full lg:w-1/2 lg:h-[90vh] lg:overflow-hidden lg:overflow-y-scroll lg:no-scrollbar">
            <div className="w-full h-[10vh] flex justify-between items-center">
              <Link
                className="flex items-center gap-2"
                to={`/users/${post?.userId}`}
              >
                <img
                  className="w-[30px] h-[30px] rounded-full object-cover"
                  src={post?.avatar}
                  alt={post?.user}
                />
                <p>{post?.user}</p>
              </Link>
              <p className="text-gray-500 text-xs">
                {moment(post?._createdAt).fromNow()}
              </p>
            </div>
            <div className="w-full flex justify-start items-start lg:min-h-[70vh]">
              <p>{post?.caption}</p>
            </div>
            <div className="flex justify-between items-center w-full h-[10vh] gap-2">
              <input
                className="w-full border-none outline-none"
                type="text"
                placeholder="Comment"
                onChange={(e) => setComment(e.target.value)}
                value={comment}
              />
              <button
                className="w-[35px] h-[35px] bg-teal-500 text-white grid place-items-center rounded-lg"
                disabled={comment.replace(/\s/g, "").length === 0}
                onClick={createComment}
              >
                <AiOutlinePlus />
              </button>
            </div>
            <div className="flex flex-col justify-start items-start gap-2 py-2">
              {comments?.map((comment) => (
                <Comment {...comment} key={comment?._id} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
