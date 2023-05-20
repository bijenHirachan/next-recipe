"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { BsGoogle } from "react-icons/bs";
import { useSession, signIn } from "next-auth/react";
import axios from "axios";

const page = () => {
  const [loginState, setLoginState] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const { data: session } = useSession();

  const submitHandler = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    if (loginState) {
      signIn("credentials", {
        email,
        password,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error("Invalid Credentials");
          }
          if (callback?.ok && !callback?.error) {
            toast.success("Logged In");
            router.push("/");
          }
        })
        .finally(() => setIsLoading(false));
    } else {
      try {
        await axios.post("/api/register", {
          username,
          email,
          password,
        });
        signIn("credentials", {
          email,
          password,
          redirect: false,
        })
          .then((callback) => {
            if (callback?.error) {
              toast.error("Invalid Credentials");
            }
            if (callback?.ok && !callback?.error) {
              toast.success("Registered and Logged In!");
              router.push("/");
            }
          })
          .finally(() => setIsLoading(false));
      } catch (error) {
        toast.error("Something went wrong!");
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (session?.user) {
      router.push("/");
    }
  }, [session?.user, router]);

  return (
    <>
      <div className="h-[80vh] flex flex-col space-y-6 justify-center items-center">
        <div className="mb-4">
          {loginState ? (
            <div className="flex flex-col items-center">
              <h3 className="text-xl font-semibold text-slate-600">
                Welcome Back!
              </h3>
              <p className="text-sm text-slate-500">Login to your account</p>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <h3 className="text-xl font-semibold text-slate-600">
                Welcome to Recipe App!
              </h3>
              <p className="text-sm text-slate-500">
                Please register to create recipes
              </p>
            </div>
          )}
        </div>

        <form className="flex flex-col gap-2" onSubmit={submitHandler}>
          {!loginState && (
            <input
              type="text"
              className="outline-none focus:ring px-4 py-2 rounded"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          )}
          <input
            type="email"
            className="outline-none focus:ring px-4 py-2 rounded"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            className="outline-none focus:ring px-4 py-2 rounded"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            disabled={isLoading}
            type="submit"
            className="mt-4 transition duration-200 ease-out hover:ease-in bg-slate-600 text-white text-xs px-4 py-2 rounded font-semibold  hover:bg-slate-700"
          >
            {loginState ? "Login" : "Sign Up"}
          </button>
          <button
            onClick={() => {
              signIn("google").then((callback) => {
                if (callback?.error) {
                  toast.error("Something went wrong");
                }
                if (callback?.ok && !callback?.error) {
                  toast.success("Logged In");
                  router.push("/");
                }
              });
            }}
            disabled={isLoading}
            type="button"
            className="transition duration-200 ease-out hover:ease-in bg-transparent text-slate-600 text-xs px-4 py-2 rounded border border-slate-600 flex justify-center items-center hover:bg-slate-600 hover:text-white"
          >
            <BsGoogle />
            oogle
          </button>
          {loginState ? (
            <div className="text-sm my-4">
              First time in our app?{" "}
              <button
                onClick={() => setLoginState(false)}
                className="underline hover:text-amber-600"
              >
                Sign Up
              </button>
            </div>
          ) : (
            <div className="text-sm my-4">
              Already have an account?{" "}
              <button
                onClick={() => setLoginState(true)}
                className="underline hover:text-amber-600"
              >
                Login
              </button>
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default page;
