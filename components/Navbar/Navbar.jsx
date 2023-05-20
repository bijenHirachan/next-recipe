"use client";

import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const Navbar = () => {
  const { data: session } = useSession();

  const [open, setOpen] = useState(false);

  return (
    <div className="w-full bg-amber-400 shadow-md py-6 px-6 sm:px-16 flex justify-between">
      <Link href={"/"}>
        <Image
          width={128}
          height={128}
          alt="logo"
          src={"/images/recipelogo.png"}
        />
      </Link>

      {/* desktop */}
      <ul className="hidden sm:flex items-center gap-6">
        {session?.user ? (
          <>
            <li>
              <Link
                href={"/recipes/create"}
                className="transition duration-200 ease-out hover:ease-in  text-white font-semibold text-sm hover:text-slate-600"
              >
                Create Recipe
              </Link>
            </li>
            <li>
              <button
                onClick={signOut}
                className="transition duration-200 ease-out hover:ease-in bg-slate-600 text-white text-xs px-4 py-2 rounded-full font-semibold hover:bg-white hover:text-slate-600"
              >
                Sign Out
              </button>
            </li>
            <li>
              <Link href={"/profile"}>
                <Image
                  width={24}
                  height={24}
                  alt="avatar"
                  src={"/images/placeholder.jpg"}
                  className="rounded-full"
                />
              </Link>
            </li>
          </>
        ) : (
          <li>
            <Link href={"/auth"}>
              <button className="transition duration-200 ease-out hover:ease-in bg-slate-600 text-white text-xs px-4 py-2 rounded-full font-semibold hover:bg-white hover:text-slate-600">
                Log In
              </button>
            </Link>
          </li>
        )}
      </ul>

      {/* mobile */}
      <div className="flex sm:hidden items-center gap-6 relative">
        <Image
          width={24}
          height={24}
          alt="avatar"
          src={"/images/placeholder.jpg"}
          className="rounded-full cursor-pointer"
          onClick={() => setOpen(!open)}
        />
        {open && (
          <div className="transition-all duration-200 bg-white px-6 py-4 absolute top-10 right-0 w-48 rounded-md">
            <ul className="w-full flex flex-col items-center gap-3 text-sm font-semibold text-slate-600 ">
              <li>
                <Link href={"/recipes/create"} onClick={() => setOpen(false)}>
                  Create Recipe
                </Link>
              </li>
              <li>
                <Link href={"/profile"} onClick={() => setOpen(false)}>
                  My Profile
                </Link>
              </li>
              {session?.user && (
                <li className="w-full">
                  <button
                    onClick={signOut}
                    className="transition w-full duration-200 ease-out hover:ease-in bg-slate-600 text-white text-xs px-4 py-2 rounded-full font-semibold hover:bg-slate-700"
                  >
                    Sign Out
                  </button>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
