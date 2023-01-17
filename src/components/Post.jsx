import React from "react";
import { Link } from "react-router-dom";
import { urlFor } from "../utils";
import { auth } from "../firebase.config";

export default function Post(props) {
  return (
    <div className="w-full flex justify-start items-start flex-col gap-[10px] mb-2">
      <Link to={`/posts/${props?._id}`}>
        <img
          className="w-full object-cover rounded-lg"
          src={urlFor(props?.image?.asset?._ref).url()}
          alt={"Post by " + props?.user}
        />
      </Link>
      <div className="w-full flex justify-start items-center">
        <Link
          className="flex justify-start items-center gap-2"
          to={`/users/${props?.userId}`}
        >
          <img
            className="w-[30px] h-[30px] rounded-full object-cover"
            src={props?.avatar}
            alt={props?.user}
          />
          <p>{props?.user}</p>
        </Link>
      </div>
    </div>
  );
}
