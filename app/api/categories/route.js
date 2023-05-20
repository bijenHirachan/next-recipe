import Category from "@models/Category";
import { connectDB } from "@utils/database";

export const GET = async (req) => {
  try {
    await connectDB();

    const categories = await Category.find();

    return new Response(JSON.stringify(categories), { status: 200 });
  } catch (error) {
    console.log(error);
  }
};
