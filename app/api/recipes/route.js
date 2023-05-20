import getCurrentUser from "@app/actions/getCurrentUser";
import Category from "@models/Category";
import Recipe from "@models/Recipe";
import { connectDB } from "@utils/database";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    await connectDB();

    const recipes = await Recipe.find().populate("user");

    // return new Response(JSON.stringify(recipes), { status: 200 });
    return NextResponse.json(recipes);
  } catch (error) {
    console.log(error);
  }
};

export const POST = async (req) => {
  const body = await req.json();

  const { title, description, image, categories } = body;

  try {
    await connectDB();

    const currentUser = await getCurrentUser();

    if (!currentUser) return new NextResponse("Unauthorized", { status: 401 });

    const recipe = await Recipe.create({
      title,
      description,
      image,
      user: currentUser._id,
    });

    return NextResponse(recipe, { status: 201 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
