// services/authService.js
"use server";

import { cookies } from "next/headers";
import connectDB from "@/config/database";
import Password from "@/models/Password";
import { encrypt } from "@/lib/session";
import bcrypt from "bcrypt"; // <-- Import bcrypt

// Accept both identifier (name) and password
export async function loginAction(identifier, password) {
  if (!identifier || !password) {
    return {
      success: false,
      message: "Nazwa użytkownika i hasło są wymagane.",
    };
  }

  try {
    await connectDB();

    // Find the specific user by their Name
    console.log(`Attempting to find user with Name: ${identifier}`);
    const userData = await Password.findOne({ Name: identifier }).lean();

    if (!userData) {
      console.log(`User not found: ${identifier}`);
      // Avoid revealing if username vs password was wrong
      return {
        success: false,
        message: "Nieprawidłowa nazwa użytkownika lub hasło.",
      };
    }

    // --- BCrypt Comparison ---
    console.log(
      `User found: ${userData.Name}. Comparing submitted password against stored hash.`
    );

    // Check if a password hash actually exists for the user
    if (!userData.Password) {
      console.error(`No password hash found in DB for user: ${userData.Name}`);
      return {
        success: false,
        message: "Błąd konfiguracji konta użytkownika.",
      }; // Account config error
    }

    // Compare the plaintext password provided by the user with the stored hash
    const passwordMatch = await bcrypt.compare(password, userData.Password);
    // userData.Password MUST be the HASH stored in the database now

    if (passwordMatch) {
      // Passwords match!
      console.log(`Password match for ${userData.Name}. Creating session.`);
      const userName = userData.Name; // Use the name from the found user document

      // --- Create JWT Session ---
      const payload = { name: userName };
      const { token, expires } = await encrypt(payload);

      // --- Save the session in a cookie ---
      cookies().set({
        name: "session",
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        expires: expires,
        path: "/",
        sameSite: "Strict",
      });

      return { success: true };
    } else {
      // Passwords do not match
      console.log(`Password mismatch for ${userData.Name}.`);
      return {
        success: false,
        message: "Nieprawidłowa nazwa użytkownika lub hasło.",
      };
    }
    // --- End BCrypt Comparison ---
  } catch (error) {
    // Catch potential errors during DB access or bcrypt comparison
    console.error("Login action failed:", error);
    // Avoid exposing specific bcrypt errors to the client
    return { success: false, message: "Wystąpił błąd podczas logowania." };
  }
}
