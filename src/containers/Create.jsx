import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { client, urlFor } from "../utils";
import { AiOutlineUpload, AiOutlineLoading } from "react-icons/ai";
import { BsFillTrash2Fill } from "react-icons/bs";
import { auth } from "../firebase.config";

export default function Create() {
  const [imageAsset, setImageAsset] = useState(null);
  const [loading, setLoading] = useState(false);
  const [caption, setCaption] = useState("");
  const isAuth = localStorage.getItem("isAuth");
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) navigate("/auth");
  }, []);
  const uploadImage = (e) => {
    const selectedFile = e.target.files[0];
    // uploading asset to sanity
    if (
      selectedFile.type === "image/png" ||
      selectedFile.type === "image/svg" ||
      selectedFile.type === "image/jpeg" ||
      selectedFile.type === "image/gif" ||
      selectedFile.type === "image/tiff"
    ) {
      setLoading(true);
      client.assets
        .upload("image", selectedFile, {
          contentType: selectedFile.type,
          filename: selectedFile.name,
        })
        .then((document) => {
          setImageAsset(document);
          setLoading(false);
        })
        .catch((error) => {
          console.log("Upload failed:", error.message);
        });
    } else {
      setLoading(false);
    }
  };

  const createPost = async () => {
    const doc = {
      _type: "post",
      user: auth.currentUser.displayName,
      avatar: auth.currentUser.photoURL,
      userId: auth.currentUser.uid,
      image: {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: imageAsset?._id,
        },
      },
      caption,
    };
    client
      .create(doc)
      .then(() => {
        setImageAsset(null);
        setCaption("");
        navigate("/");
      })
      .catch((error) => console.error(error));
  };
  return (
    <div className="w-full py-[2vw] lg:flex lg:h-[90vh] lg:px-[2vw] 2xl:max-w-7xl 2xl:mx-auto">
      <div className="w-full h-[50vh] p-2 lg:w-1/2 lg:h-full">
        {!imageAsset && !loading ? (
          <label className="relative w-full h-full border-2 border-dashed border-teal-500 rounded-lg grid place-items-center">
            <input
              className="absolute w-0 h-0"
              type="file"
              onChange={uploadImage}
            />
            <div className="flex justify-center items-center gap-2 flex-col">
              <AiOutlineUpload className="text-4xl" />
              <p>Upload image</p>
            </div>
          </label>
        ) : loading ? (
          <div className="w-full h-full border-solid border-2 border-teal-500 rounded-lg grid place-items-center">
            <AiOutlineLoading className="animate-spin" />
          </div>
        ) : (
          imageAsset && (
            <div className="w-full h-full relative border-dashed border-2 border-teal-500 p-2 rounded-lg">
              <img
                className="w-full h-full object-contain rounded-lg"
                src={urlFor(imageAsset?._id).url()}
                alt="uploaded image"
              />
              <button
                className="absolute top-4 right-4 w-[35px] h-[35px] bg-rose-500 text-white rounded-lg grid place-items-center"
                onClick={() => setImageAsset(null)}
              >
                <BsFillTrash2Fill />
              </button>
            </div>
          )
        )}
      </div>
      <div className="flex flex-col px-[2vw] gap-2 lg:py-2 lg:w-1/2">
        <textarea
          className="w-full h-[42vh] border-none outline-none resize-none lg:h-[72vh]"
          placeholder="Caption"
          onChange={(e) => setCaption(e.target.value)}
          value={caption}
        ></textarea>
        <button
          className="w-full h-[8vh] bg-teal-500 rounded-lg text-white"
          disabled={!imageAsset || caption.replace(/\s/g, "").length === 0}
          onClick={createPost}
        >
          Post
        </button>
      </div>
    </div>
  );
}
