"use client";

import Modal from "@components/Modal";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { CiSettings } from "react-icons/ci";
import { CldUploadButton } from "next-cloudinary";
import RecipeTable from "./components/RecipeTable";
import CreateCategory from "./components/CreateCategory";

const imageStyle = {
  borderRadius: "100%",
  width: "100px",
  height: "100px",
  objectFit: "cover",
};

const page = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [categories, setCategories] = useState(true);

  const [recipes, setRecipes] = useState([]);

  const { data: session } = useSession();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    setUsername(session?.user?.name);
    setEmail(session?.user?.email);
    setImage(session?.user?.image);
  }, [session?.user?.name, session?.user?.email, session?.user?.image]);

  const imageHandler = (result) => {
    setImage(result?.info?.secure_url);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    axios
      .put("/api/profile", {
        username,
        email,
        image,
      })
      .then(() => {
        toast.success("Profile updated!");
        setIsOpen(false);
      });
  };

  useEffect(() => {
    axios
      .get("/api/recipes/me")
      .then(({ data }) => {
        setRecipes(data);
      })
      .catch(() => {
        toast.error("Something went wrong!");
      });
  }, []);

  return (
    <div className="px-2">
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h3 className="text-slate-600 font-semibold text-2xl text-center my-6">
          Update Profile
        </h3>
        <form
          className="flex flex-col gap-2 w-[250px] mx-auto items-center"
          onSubmit={submitHandler}
        >
          <CldUploadButton
            options={{ maxFiles: 1 }}
            onUpload={imageHandler}
            uploadPreset="glywqymy"
          >
            <Image
              width={80}
              height={80}
              src={image ? image : "/images/placeholder.jpg"}
              alt="image"
              quality={100}
              style={imageStyle}
              className="mb-4"
            />
          </CldUploadButton>
          <input
            placeholder="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="outline outline-1 outline-slate-600/50 rounded text-sm focus:ring focus:outline-none px-2 py-1"
          />
          <input
            placeholder="Email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="outline outline-1 outline-slate-600/50 rounded text-sm focus:ring focus:outline-none px-2 py-1"
          />

          <button
            type="submit"
            className="border-none bg-slate-600 text-white rounded w-full my-3 px-4 py-1 text-sm font-semibold transition-all hover:bg-slate-700"
          >
            Update
          </button>
        </form>
      </Modal>

      <div className="flex flex-col justify-center items-center h-[90vh] flex-1">
        <div className="bg-amber-400/60 mx-6 w-full md:w-1/2 xl:w-1/3 px-4 py-10 rounded shadow-md shadow-slate-600/50">
          <div className="grid grid-cols-12 gap-5">
            <div className="col-span-5 flex flex-col justify-center items-center gap-3">
              <Image
                height={80}
                width={80}
                alt="avatar"
                src={image || "/images/placeholder.jpg"}
                style={imageStyle}
                quality={100}
              />
            </div>
            <div className="col-span-7 px-4 py-2 relative">
              <h3 className="text-lg font-semibold text-slate-600">
                {username}
              </h3>
              <p className="text-sm text-slate-400">{email}</p>
              <CiSettings
                onClick={() => setIsOpen(true)}
                size={23}
                className="absolute transition-all top-0 right-0 text-slate-600 hover:text-slate-900 cursor-pointer"
              />
            </div>
          </div>
        </div>

        <div className="my-3 bg-amber-400/60 mx-6 w-full md:w-1/2 xl:w-1/3 px-4 py-10 rounded shadow-md shadow-slate-600/50">
          <CreateCategory
            categories={categories}
            setCategories={setCategories}
          />
        </div>

        <div className="my-3 bg-amber-400/60 mx-6 w-full md:w-1/2 xl:w-1/3 px-4 py-10 rounded shadow-md shadow-slate-600/50">
          <RecipeTable recipes={recipes} setRecipes={setRecipes} />
        </div>
      </div>
    </div>
  );
};

export default page;
