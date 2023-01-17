import React from "react";
import { Link } from "react-router-dom";
import { urlFor } from "../utils";

export default function UserPost(props) {
  return (
    <Link className="w-full" to={`/posts/${props?._id}`}>
      <img
        className="w-full rounded-lg"
        src={urlFor(props?.image?.asset?._ref).url()}
        alt={"Post by " + props?.user}
      />
    </Link>
  );
}
