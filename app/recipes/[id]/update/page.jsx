"use client";

import axios from "axios";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import RecipeCategories from "./components/RecipeCategories";

const imageStyle = {
  width: "100px",
  height: "100px",
  objectFit: "cover",
};

const RecipeUpdate = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [categories, setCategories] = useState([]);

  const params = useParams();

  const router = useRouter();

  const imageHandler = (result) => {
    setImage(result?.info?.secure_url);
  };

  useEffect(() => {
    axios
      .get(`/api/recipes/${params.id}`)
      .then(({ data }) => {
        setTitle(data?.title);
        setDescription(data?.description);
        setImage(data?.image);
        setCategories(data?.categories);
      })
      .catch(() => {
        toast.error("Something went wrong!");
      });
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .put(`/api/recipes/${params.id}`, {
        title,
        description,
        image,
      })
      .then(() => {
        toast.success("Recipe updated successfully");
        router.push("/profile");
      })
      .catch(() => {
        toast.error("Something went wrong!");
      });
  };

  return (
    <div className="h-[80vh] flex flex-col space-y-3 justify-center items-center">
      <RecipeCategories
        recipeId={params.id}
        categories={categories}
        setCategories={setCategories}
      />
      <form
        onSubmit={submitHandler}
        className="p-6 flex flex-col gap-3 w-full sm:w-1/2 lg:w-1/3"
      >
        <h3 className="mb-1 text-2xl text-slate-600">Update Recipe</h3>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          type="text"
          className="outline-none focus:ring px-4 py-2 rounded"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          rows={4}
          className="outline-none focus:ring px-4 py-2 rounded"
        />

        <CldUploadButton
          options={{ maxFiles: 1 }}
          onUpload={imageHandler}
          uploadPreset="glywqymy"
        >
          <Image
            width={80}
            height={80}
            src={image ? image : "/images/image.png"}
            alt="image"
            quality={100}
            style={imageStyle}
            className="mb-4"
          />
        </CldUploadButton>

        <button
          type="submit"
          className="border-none bg-slate-600 text-white rounded w-full my-3 px-4 py-2 text-sm font-semibold transition-all hover:bg-slate-700"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default RecipeUpdate;
