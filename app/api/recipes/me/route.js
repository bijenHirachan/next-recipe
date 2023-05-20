import getCurrentUser from "@app/actions/getCurrentUser";
import Recipe from "@models/Recipe";
import { connectDB } from "@utils/database";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    await connectDB();
    const currentUser = await getCurrentUser();

    if (!currentUser) return new NextResponse("Unauthorized", 401);

    const recipes = await Recipe.find({
      user: currentUser._id,
    });

    return NextResponse.json(recipes);
  } catch (error) {
    console.log(error, "MY_RECIPES_ERROR");
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
