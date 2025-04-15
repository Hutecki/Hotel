// pages/login.js or app/login/page.js
"use client";

import { useState } from "react";
import { loginAction } from "@/services/authService";
import { getVrvMode } from "@/services/vrvMode";
import { useRouter } from "next/navigation";

export default function Login() {
  const [identifier, setIdentifier] = useState(""); // <-- ADDED STATE for username/name
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // Pass BOTH identifier and password to the action
      const loginResponse = await loginAction(identifier, password); // <-- PASS IDENTIFIER

      if (loginResponse.success) {
        const vrvMode = await getVrvMode();
        const redirectPath = vrvMode ? "/aggregate" : "/";
        router.push(redirectPath);
      } else {
        setError(loginResponse.message || "Logowanie nie powiodło się.");
      }
    } catch (err) {
      console.error("Login process failed:", err);
      setError("Wystąpił nieoczekiwany błąd.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="mb-20 p-4 border rounded shadow-md"
      >
        {/* --- Input for Identifier (e.g., Name) --- */}
        <label
          htmlFor="identifier"
          className="text-lg font-semibold mb-2 block"
        >
          Nazwa Użytkownika {/* Or just "Nazwa" if using the Name field */}
        </label>
        <input
          type="text"
          id="identifier"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)} // <-- UPDATE STATE
          className="p-2 border rounded mb-4 w-full"
          placeholder="Podaj nazwę"
          required
          disabled={isLoading}
        />
        {/* --- Input for Password --- */}
        <label htmlFor="password" className="text-lg font-semibold mb-2 block">
          Podaj hasło
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border rounded mb-4 w-full"
          placeholder="Podaj hasło"
          required
          disabled={isLoading}
        />
        <button
          type="submit"
          className="ui py-2 px-4 rounded"
          disabled={isLoading}
        >
          {isLoading ? "Logowanie..." : "Zaloguj"}
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
}
