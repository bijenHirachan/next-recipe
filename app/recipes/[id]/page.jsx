import axios from "axios";
import Image from "next/image";
import React from "react";

const imageStyle = {
  width: "500px",
  height: "500px",
  objectFit: "contain",
};

const getSingleRecipe = async (id) => {
  const { data } = await axios.get(`/api/recipes/${id}`);

  return data;
};

const SingleRecipe = async ({ params }) => {
  const recipe = await getSingleRecipe(params.id);

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
