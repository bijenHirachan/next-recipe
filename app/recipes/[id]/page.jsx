"use client";

import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const imageStyle = {
  width: "500px",
  height: "400px",
  objectFit: "cover",
};

const SingleRecipe = () => {
  const [recipe, setRecipe] = useState({});

  const params = useParams();

  useEffect(() => {
    axios
      .get(`/api/recipes/${params.id}`)
      .then(({ data }) => {
        setRecipe(data);
      })
      .catch(() => {
        toast.error("Something went wrong!");
      });
  }, [params.id]);

  return (
    <div className="w-full p-4 h-[80vh] flex justify-center items-start mt-6 ">
      <div className="bg-amber-400/60 px-6 rounded shadow-md shadow-slate-600/50 flex flex-col items-center relative">
        <Image
          width={500}
          height={500}
          alt={`image-${recipe?.title}`}
          src={recipe?.image || "/images/image.png"}
          className="my-6 rounded"
          style={imageStyle}
          quality={100}
        />
        <div className="flex flex-start w-full gap-2 flex-wrap">
          {recipe?.categories?.length > 0 &&
            recipe.categories.map((cat) => (
              <span
                className="text-xs outline outline-1 px-1 text-slate-600 outline-slate-600"
                key={cat._id}
              >
                {cat.title}
              </span>
            ))}
        </div>
        <div className="my-6 w-full">
          <h3 className="text-xl font-semibold text-slate-700">
            {recipe?.title}
          </h3>
          <p className="text-sm text-slate-600">{recipe?.description}</p>
        </div>

        <p className="absolute bottom-2 text-xs text-slate-500 right-2">
          {recipe?.user?.username && `By ${recipe.user.username}`}
        </p>
      </div>
    </div>
  );
};

export default SingleRecipe;
