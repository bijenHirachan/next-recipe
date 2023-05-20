"use client";

import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

const CreateCategory = () => {
  const [isLoading, setIsLoading] = useState();
  const [title, setTitle] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await axios.post("/api/categories", { title });
      setTitle("");
      toast.success(data);
    } catch (error) {
      toast.error(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={submitHandler}
      className="flex justify-center items-center gap-1"
    >
      <input
        disabled={isLoading}
        placeholder="Create Category"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border-none outline-none focus:ring rounded px-2 py-1.5 text-sm"
      />
      <button
        type="submit"
        disabled={isLoading}
        className="px-4 py-2 bg-slate-600 text-xs rounded text-white font-semibold hover:bg-slate-700 transition-all"
      >
        Create
      </button>
    </form>
  );
};

export default CreateCategory;
