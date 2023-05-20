"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { MdOutlineAddBox } from "react-icons/md";
import { GoDiffRemoved } from "react-icons/go";

const RecipeCategories = ({ recipeId, categories, setCategories }) => {
  const [allCategories, setAllCategories] = useState([]);

  useEffect(() => {
    axios
      .get("/api/categories")
      .then(({ data }) => {
        setAllCategories(data);
      })
      .catch(() => {
        toast.error("Something went wrong");
      });
  }, []);

  const addCategory = async (categoryId) => {
    try {
      const { data } = await axios.put(`/api/recipes/${recipeId}/categories`, {
        categoryId,
      });

      setCategories((prev) => [...prev, data]);
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  const removeCategory = async (categoryId) => {
    console.log(recipeId);

    try {
      const { data } = await axios.post(`/api/recipes/${recipeId}/categories`, {
        categoryId,
      });
      setCategories((prev) =>
        prev.filter((item) => item._id.toString() !== categoryId.toString())
      );
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  return (
    <>
      <div className="px-6 flex justify-start  w-full sm:w-1/2 lg:w-1/3 overflow-x-auto">
        <h2 className="text-sm font-semibold text-slate-600">
          Select from categories below
        </h2>
      </div>

      <div className="px-6 pb-1 flex justify-start  gap-3 w-full sm:w-1/2 lg:w-1/3 overflow-x-auto">
        {allCategories.map((cat) => (
          <span
            className="px-2 py-1 text-xs bg-amber-600/60 text-white font-semibold flex justify-between gap-1 items-center"
            key={cat._id}
          >
            {cat.title}
            <MdOutlineAddBox
              onClick={() => addCategory(cat._id)}
              size={16}
              className="cursor-pointer"
            />
          </span>
        ))}
      </div>

      <div className="px-6 flex justify-start  w-full sm:w-1/2 lg:w-1/3 overflow-x-auto">
        <h2 className="text-sm font-semibold text-slate-600">
          Selected Categories
        </h2>
      </div>
      <div className="px-6 flex  gap-3 w-full sm:w-1/2 lg:w-1/3 overflow-x-auto">
        {categories.map((cat) => (
          <span
            className="px-2 py-1 text-xs bg-amber-600/60 text-white font-semibold flex justify-between gap-1 items-center"
            key={cat._id}
          >
            {cat.title}
            <GoDiffRemoved
              onClick={() => removeCategory(cat._id)}
              size={16}
              className="cursor-pointer"
            />
          </span>
        ))}
      </div>
    </>
  );
};

export default RecipeCategories;
