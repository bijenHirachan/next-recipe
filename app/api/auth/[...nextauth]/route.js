import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentailsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

import { connectDB } from "@utils/database";
import User from "@models/User";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentailsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password)
          throw new Error("Invalid credentials");

        await connectDB();

        const user = await User.findOne({ email: credentials.email });

        if (!user || !user?.password) throw new Error("Invalid credentials");

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isCorrectPassword) throw new Error("Invalid credentials");

        return user;
      },
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({
        email: session.user.email,
      });

      session.user.id = sessionUser?._id.toString();
      session.user.name = sessionUser?.username;
      session.user.image = sessionUser?.image;
      return session;
    },
    // async signIn({ profile }) {
    //   try {
    //     await connectDB();

    //     const userExist = await User.findOne({
    //       email: profile.email,
    //     });

    //     if (!userExist) {
    //       await User.create({
    //         email: profile.email,
    //         username: profile.name.replace(" ", "").toLowerCase(),
    //         image: profile.picture,
    //       });
    //     }
    //     return true;
    //   } catch (error) {
    //     console.log(error);
    //     return false;
    //   }
    // },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
