// lib/permissions.js
import { getSession } from "@/lib/session";

/**
 * Checks if the currently logged-in user has administrative permissions.
 * Currently based on the user's name being 'Jerzy'.
 * This logic can be expanded later (e.g., checking roles).
 * @returns {Promise<boolean>} - True if the user has admin permissions, false otherwise.
 */
export async function hasAdminPermission() {
  try {
    const session = await getSession();
    // Define admin logic here
    const isAdmin = session?.name === "Jerzy";
    console.log(
      `[hasAdminPermission] Session name: ${session?.name}, isAdmin: ${isAdmin}`
    ); // Optional: for debugging
    return isAdmin;
  } catch (error) {
    // Handle potential errors during session retrieval or decryption
    console.error("Error checking admin permission:", error);
    return false; // Default to no permission if an error occurs
  }
}
