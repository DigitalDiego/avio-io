import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

export default function Comment(props) {
  return (
    <div className="w-full flex flex-col gap-2">
      <p>{props?.comment}</p>
      <div className="w-full flex justify-between items-center">
        <Link
          className="flex items-center gap-2"
          to={`/users/${props?.userId}`}
        >
          <img
            className="w-[25px] h-[25px] rounded-full object-cover"
            src={props?.avatar}
            alt={props?.user}
          />
          <p>{props?.user}</p>
        </Link>
        <p className="text-xs text-gray-500">
          {moment(props?._createdAt).fromNow()}
        </p>
      </div>
    </div>
  );
}
