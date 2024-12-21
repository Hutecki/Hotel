"use client";

import React, { useState } from "react";
import Link from "next/link";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      document.getElementById("navigate-button").click();
    }
  };

  return (
    <div
      className={`flex flex-col items-center mb-4 transition-transform ${
        isFocused ? "focused" : ""
      }`}
    >
      <input
        type="text"
        placeholder="Podaj pokój..."
        value={searchTerm}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="p-2 mb-4 border border-gray-300 rounded w-full max-w-xs"
      />
      <Link href={`/room/${searchTerm}`}>
        <button
          id="navigate-button"
          className="ui p-2  text-white rounded w-full max-w-xs"
        >
          Przejdź do pokoju
        </button>
      </Link>
    </div>
  );
};

export default SearchBar;
