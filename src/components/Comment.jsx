import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

export default function Comment(props) {
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="border-t-solid border-t-[1px] border-t-gray-500 w-full min-h-[10vh] flex justify-start items-start py-2">
        <p>{props?.comment}</p>
      </div>
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
