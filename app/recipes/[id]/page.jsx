"use client";

import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const imageStyle = {
  width: "500px",
  height: "500px",
  objectFit: "contain",
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
    <div className="w-full  p-6 h-[70vh] flex justify-center items-start mt-6">
      <div className="bg-amber-400/60 px-6 rounded shadow-md shadow-slate-600/50 flex flex-col items-center">
        <Image
          width={500}
          height={500}
          alt={`image-${recipe?.title}`}
          src={recipe?.image || "/images/image.png"}
          className="mt-2 rounded"
          style={imageStyle}
        />

        <div className="my-6 w-full">
          <h3 className="text-xl font-semibold text-slate-700">
            {recipe?.title}
          </h3>
          <p className="text-sm text-slate-600">{recipe?.description}</p>
        </div>
      </div>
    </div>
  );
};

export default SingleRecipe;
