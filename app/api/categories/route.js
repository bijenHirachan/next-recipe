import Category from "@models/Category";
import { connectDB } from "@utils/database";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    await connectDB();

    const categories = await Category.find();

    return NextResponse.json(categories);
  } catch (error) {
    console.log(error, "GET_CATEGORIES_ERROR");
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const POST = async (req) => {
  try {
    const { title } = await req.json();

    await connectDB();

    const categoryExist = await Category.findOne({
      title: title.toUpperCase(),
    });

    if (categoryExist) {
      return new NextResponse("Categories already exists", {
        status: 400,
      });
    }

    const category = await Category.create({
      title: title.toUpperCase(),
    });

    return NextResponse.json("Category created successfully");
  } catch (error) {
    console.log(error, "CREATE_CATEGORY_ERROR");
    return new NextResponse("Internal Server Error", {
      status: 500,
    });
  }
};
