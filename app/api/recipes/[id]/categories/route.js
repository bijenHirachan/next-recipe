import getCurrentUser from "@app/actions/getCurrentUser";
import Category from "@models/Category";
import Recipe from "@models/Recipe";
import { connectDB } from "@utils/database";
import { NextResponse } from "next/server";

export const PUT = async (req, { params }) => {
  try {
    await connectDB();

    const { categoryId } = await req.json();

    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const recipe = await Recipe.findById(params.id);

    const category = await Category.findById(categoryId);

    let categoryExist = false;

    recipe.categories.forEach((cat) => {
      if (cat.toString() === category._id.toString()) {
        categoryExist = true;
      }
    });

    if (categoryExist) {
      return new NextResponse("Category already exists!", { status: 400 });
    }

    recipe.categories.push(categoryId);
    category.recipes.push(recipe._id);

    await recipe.save();
    await category.save();

    return NextResponse.json(category);
  } catch (error) {
    console.log(error, "UPDATE_RECIPE_CATEGORIES");
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const POST = async (req, { params }) => {
  try {
    await connectDB();

    const { categoryId } = await req.json();

    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const recipe = await Recipe.findById(params.id);

    const category = await Category.findById(categoryId);

    recipe.categories = recipe.categories.filter(
      (cat) => cat._id.toString() !== category._id.toString()
    );
    category.recipes = category.recipes.filter(
      (rec) => rec._id.toString() !== recipe._id.toString()
    );

    await recipe.save();
    await category.save();

    return NextResponse.json(category);
  } catch (error) {
    console.log(error.message, "UPDATE_RECIPE_CATEGORIES");
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

// export const DELETE = async (req, { params }) => {
//   try {
//     await connectDB();

//     const { categoryId } = await req.json();

//     console.log(categoryId, params.id);
// const currentUser = await getCurrentUser();

// if (!currentUser) {
//   return new NextResponse("Unauthorized", { status: 401 });
// }

// const recipe = await Recipe.findById(params.id);

// const category = await Category.findById(categoryId);

// recipe.categories = recipe.categories.filter(
//   (cat) => cat._id.toString() !== category._id.toString()
// );
// category.recipes = category.recipes.filter(
//   (rec) => rec._id.toString() !== recipe._id.toString()
// );

// await recipe.save();
// await category.save();

// return NextResponse.json(category);
//     return new NextResponse("Hello");
//   } catch (error) {
//     console.log(error, "DELETE_RECIPE_CATEGORY_ERROR");
//     return new NextResponse("Internal Server Error", { status: 500 });
//   }
// };
