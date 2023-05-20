"use client";

import Modal from "@components/Modal";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

const imageStyle = {
  width: "60px",
  height: "60px",
  objectFit: "cover",
};

const RecipeTable = ({ recipes, setRecipes }) => {
  const [open, setOpen] = useState(false);

  const [selectedRecipe, setSelectedRecipe] = useState({
    title: "",
    id: "",
  });

  const onClose = () => {
    setOpen(false);
    setSelectedRecipe({
      title: "",
      id: "",
    });
  };

  const deleteHandler = (recipe) => {
    setSelectedRecipe((prev) => ({
      ...prev,
      title: recipe.title,
      id: recipe._id,
    }));
    setOpen(true);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    axios
      .delete(`/api/recipes/${selectedRecipe.id}`)
      .then(() => {
        toast.success("Recipe deleted successfully!");

        setRecipes((recipes) =>
          recipes.filter((rec) => rec._id !== selectedRecipe.id)
        );

        onClose();
      })
      .catch(() => {
        toast.error("Something went wrong!");
      });
  };

  return (
    <>
      <Modal onClose={onClose} isOpen={open}>
        <form onSubmit={submitHandler}>
          <h3 className="text-lg font-semibold text-slate-600">
            Delete {selectedRecipe?.title}
          </h3>
          <p className="text-sm text-slate-500">
            Are you sure you want to delete this recipe?
          </p>
          <div className="flex justify-end mt-2 gap-1 border-t pt-4">
            <button
              type="button"
              onClick={onClose}
              className="border-none px-2 py-1 text-xs text-white font-semibold rounded bg-gray-700/50 hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="border-none px-2 py-1 text-xs text-white font-semibold rounded bg-red-600/80 hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </form>
      </Modal>
      <div className="flex flex-col h-[35vh]">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b font-medium border-slate-600/50 text-slate-600">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      Image
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Recipe
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recipes.map((recipe) => (
                    <tr
                      key={recipe._id}
                      className="border-b border-slate-600/50"
                    >
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        <Image
                          width={32}
                          height={32}
                          src={recipe.image || "/images/image.png"}
                          alt={`image-${recipe.title}`}
                          style={imageStyle}
                          quality={100}
                        />
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                        {recipe.title}
                      </td>
                      <td className="whitespace-nowrap px-6 pt-8 flex gap-1 justify-center items-end">
                        <Link href={`/recipes/${recipe._id}/update`}>
                          <AiOutlineEdit
                            size={20}
                            className="text-slate-500 cursor-pointer hover:text-gray-700 transition-all"
                          />
                        </Link>

                        <AiOutlineDelete
                          onClick={() => deleteHandler(recipe)}
                          size={20}
                          className="text-slate-500 cursor-pointer hover:text-gray-700 transition-all"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipeTable;
