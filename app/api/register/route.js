import User from "@models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const body = await req.json();

    const { email, username, password } = body;

    if (!username || !email || !password)
      return new NextResponse("Missing Info", { status: 400 });

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
