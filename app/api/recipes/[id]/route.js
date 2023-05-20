import getCurrentUser from "@app/actions/getCurrentUser";
import Recipe from "@models/Recipe";
import { connectDB } from "@utils/database";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  try {
    await connectDB();

    const recipe = await Recipe.findById(params.id).populate("categories");

    if (!recipe) return new NextResponse("Recipe Not Found!", { status: 404 });

    return NextResponse.json(recipe);
  } catch (error) {
    console.log(error, "SINGLE_RECIPE_ERROR");
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const PUT = async (req, { params }) => {
  try {
    const { title, image, description } = await req.json();

    await connectDB();

    const currentUser = await getCurrentUser();

    if (!currentUser) return new NextResponse("Unauthorized", { status: 401 });

    const recipe = await Recipe.findById(params.id);

    if (!recipe) return new NextResponse("Recipe Not Found", { status: 404 });

    if (recipe.user.toString() !== currentUser._id.toString()) {
      return new NextResponse("Unauthorized to update", { status: 401 });
    }

    if (title) recipe.title = title;
    if (description) recipe.description = description;
    if (image) recipe.image = image;

    await recipe.save();

    return NextResponse.json(recipe);
  } catch (error) {
    console.log(error, "UPDATE_RECIPE_ERROR");
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const DELETE = async (req, { params }) => {
  try {
    await connectDB();

    const currentUser = await getCurrentUser();

    if (!currentUser) return new NextResponse("Unauthorized", { status: 401 });

    const recipe = await Recipe.findById(params.id);

    if (recipe.user.toString() !== currentUser._id.toString()) {
      return new NextResponse("Unauthorized to delete", { status: 401 });
    }

    await recipe.deleteOne();

    return new NextResponse("Recipe deleted successfully", { status: 200 });
  } catch (error) {
    console.log(error, "DELETE_RECIPE_ERROR");
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
