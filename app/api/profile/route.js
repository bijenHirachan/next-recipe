import getCurrentUser from "@app/actions/getCurrentUser";
import User from "@models/User";
import { connectDB } from "@utils/database";
import { NextResponse } from "next/server";

export const PUT = async (req) => {
  try {
    await connectDB();

    const body = await req.json();

    const { username, email, image } = body;

    const currentUser = await getCurrentUser();

    const user = await User.findById(currentUser._id);

    if (username) user.username = username;
    if (email) user.email = email;
    if (image) user.image = image;

    await user.save();

    return NextResponse.json(user);
  } catch (error) {
    console.log(error, "ERROR_UPDATE_PROFILE");
    return new NextResponse("Internal server error", { status: 500 });
  }
};
