"use client";

import React, { useState } from "react";
import { CldImage, CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import axios from "axios";

const page = () => {
  const [image, setImage] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const router = useRouter();

  const handleUpload = (result) => {
    setImage(result?.info?.secure_url);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await axios.post("/api/recipes", {
        title,
        description,
        image,
      });
      toast.success("Recipe created successfully!");
      router.push("/profile");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[80vh] flex flex-col space-y-6 justify-center items-center">
      <form
        className="p-6 flex flex-col gap-3 w-full sm:w-1/2 lg:w-1/3"
        onSubmit={submitHandler}
      >
        <h3 className="mb-1 text-2xl text-slate-600">Create Recipe</h3>

        <input
          type="text"
          className="outline-none focus:ring px-4 py-2 rounded"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          type="text"
          className="outline-none focus:ring px-4 py-2 rounded"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="flex justify-start my-4">
          <CldUploadButton
            options={{ maxFiles: 1 }}
            onUpload={handleUpload}
            uploadPreset="glywqymy"
          >
            <Image
              src={image ? image : "/images/image.png"}
              width={64}
              height={64}
              alt="image"
            />

            {/* <span className="border border-gray-600 hover:bg-gray-600 hover:text-white text-gray-600 rounded px-4 py-2 text-xs font-semibold ">
              Upload
            </span> */}
          </CldUploadButton>
        </div>

        <button
          disabled={isLoading}
          type="submit"
          className="transition duration-200 ease-out hover:ease-in bg-slate-600 text-white text-xs px-4 py-2 rounded font-semibold  hover:bg-slate-700"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default page;
