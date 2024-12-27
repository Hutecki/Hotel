"use client";
import { useState } from "react";
import { authenticate } from "@/services/authenticate"; // Import the server action

export default function Login() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await authenticate(password);

    if (response.success) {
      // Check the value of the 'vrvMode' cookie to determine the redirection path
      const vrvModeCookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("vrvMode="))
        ?.split("=")[1];

      const redirectPath = vrvModeCookie === "true" ? "/aggregate" : "/";
      window.location.href = redirectPath; // Redirect based on the cookie value
    } else {
      setError(response.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="mb-20 p-4 border rounded shadow-md"
      >
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
        />
        <button type="submit" className="ui text-white py-2 px-4 rounded">
          Zaloguj
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
}
