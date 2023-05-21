"use client";

import Card from "@components/Card";
import Loader from "@components/Loader";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("/api/recipes")
      .then(({ data }) => {
        setRecipes(data);
      })
      .catch(() => {
        toast.error("Something went wrong!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="grid grid-cols-2">
      <div className="px-6 sm:px-16 py-6 col-span-2 lg:col-span-1">
        <h3 className="my-6 text-2xl font-semibold text-slate-700/90">
          Welcome to Recipe App
        </h3>
        <p className="text-sm text-slate-900">
          Create and categorize your recipes
        </p>
        {/* <h3 className="text-5xl text-slate-700 text-center font-semibold">
        Recipes
      </h3> */}
        {isLoading ? (
          <div className="flex flex-col my-6 gap-4 w-full lg:w-5/6 h-[60vh] overflow-y-scroll py-2 px-1">
            <Loader />
          </div>
        ) : (
          <div className="flex flex-col my-6 gap-4 w-full lg:w-5/6 h-[60vh] overflow-y-scroll py-2 px-1">
            {recipes.length > 0 &&
              recipes.map((recipe) => (
                <Card
                  id={recipe._id}
                  key={recipe._id}
                  title={recipe.title}
                  description={recipe.description}
                  image={recipe.image}
                  author={recipe?.user?.username}
                  categories={recipe.categories}
                />
              ))}
          </div>
        )}
      </div>
      <div className=" justify-center items-center hidden lg:flex">
        <Image
          width={300}
          height={300}
          alt="image"
          src={"/images/recipe.png"}
        />
      </div>
    </div>
  );
}
