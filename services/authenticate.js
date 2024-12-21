"use server";

import { cookies } from "next/headers";
import connectDB from "@/config/database";
import Password from "@/models/Password";

export async function authenticate(password) {
  await connectDB();

  const passwordData = await Password.findOne().lean();
  const correctPassword = passwordData?.Password;

  if (password === correctPassword) {
    // Set a secure cookie if the password matches
    cookies().set({
      name: "auth_token",
      value: "authenticated",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 36000, // 10 hour expiry
      path: "/",
      sameSite: "Strict",
    });
    return { success: true };
  } else {
    return { success: false, message: "Incorrect password" };
  }
}

export async function checkAuthentication() {
  const authCookie = cookies().get("auth_token");
  return authCookie?.value === "authenticated";
}
