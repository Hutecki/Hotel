"use client";
import React, { useState } from "react";
import Link from "next/link";

const SearchPlace = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [url, setUrl] = useState("/aggregate/listingsAggregates");

  const handleSearchChange = (e) => {
    const input = e.target.value;
    const formattedInput = input.trim().replace(/\s+/g, "_").toLowerCase(); // Replace spaces with underscores
    setSearchTerm(input);
    if (formattedInput === "") {
      setUrl("/aggregate/listingsAggregates");
    } else {
      setUrl(`/aggregate/listingsPlaces/${formattedInput}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      document.getElementById("navigate-link").click();
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
      <Link href={url} id="navigate-link">
        <button
          id="navigate-button"
          className="ui p-2 text-white rounded max-w-xs"
        >
          Przejdź do agregatu
        </button>
      </Link>
    </div>
  );
};

export default SearchPlace;
