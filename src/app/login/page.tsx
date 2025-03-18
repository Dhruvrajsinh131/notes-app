"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../components";

const Login = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { email, password } = data;
    login(email, password);
  };

  const login = async (email, password) => {
    setError("");
    const resp = await fetch("http://localhost:9090/api/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, hashedpassword: password }),
    });

    const respJson = await resp.json();

    if (respJson?.success === false) {
      setError(respJson?.error);
      return;
    }

    router.push("/profile");
  };

  return (
    <div className="flex justify-center items-center w-full h-screen px-4 bg-gradient-to-r from-blue-500 to-purple-500">
      <div className="flex flex-col md:flex-row w-full max-w-3xl p-6 border border-gray-600 rounded-2xl shadow-lg bg-white">
        {/* Left Section */}
        <div className="flex flex-col w-full md:w-1/2 p-4 text-center md:text-left">
          <div className="mb-6">
            <span className="text-4xl font-bold">Hello,</span>
            <span className="text-5xl font-bold block">Welcome</span>
          </div>
          <span className="text-red-600">{error}</span>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col gap-1">
              <label>Email</label>
              <input
                {...register("email", { required: true })}
                className="border p-2 rounded-md w-full"
                type="text"
              />
              {errors.email && (
                <span className="text-red-600">This field is required</span>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label>Password</label>
              <input
                {...register("password", { required: true })}
                className="border p-2 rounded-md w-full"
                type="password"
              />
              {errors.password && (
                <span className="text-red-600">This field is required</span>
              )}
            </div>
            <Button type="submit">Login</Button>
          </form>
        </div>
        {/* Right Section */}
        <div className="hidden md:flex w-1/2 bg-gradient-to-b from-purple-500 to-blue-500 justify-center items-center rounded-xl">
          <span className="text-lg font-semibold text-white">Side Section</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
