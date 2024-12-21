"use client";

import React from "react";
import addRoom from "@/app/actions/addRoom";

const RoomForm = ({ closeDialog }) => {
  return (
    <form
      action={async (formData) => {
        await addRoom(formData);
        if (closeDialog) closeDialog(); // Close the dialog after successful submission
      }}
      className="space-y-4"
    >
      <input
        type="number"
        name="Pokoj"
        placeholder="Pokoj"
        required
        className="w-full border-2 border-gray-300 focus:border-[#C19A6B] focus:ring-2 focus:ring-[#C19A6B] focus:outline-none p-2 rounded-md"
      />
      <input
        type="number"
        name="Sektor"
        placeholder="Sektor"
        required
        className="w-full border-2 border-gray-300 focus:border-[#C19A6B] focus:ring-2 focus:ring-[#C19A6B] focus:outline-none p-2 rounded-md"
      />
      <input
        type="text"
        name="Winda"
        placeholder="Winda"
        required
        className="w-full border-2 border-gray-300 focus:border-[#C19A6B] focus:ring-2 focus:ring-[#C19A6B] focus:outline-none p-2 rounded-md"
      />
      <input
        type="text"
        name="Atrybuty"
        placeholder="Atrybuty"
        required
        className="w-full border-2 border-gray-300 focus:border-[#C19A6B] focus:ring-2 focus:ring-[#C19A6B] focus:outline-none p-2 rounded-md"
      />
      <input
        type="number"
        name="Poziom"
        placeholder="Poziom"
        required
        className="w-full border-2 border-gray-300 focus:border-[#C19A6B] focus:ring-2 focus:ring-[#C19A6B] focus:outline-none p-2 rounded-md"
      />
      <button
        type="submit"
        className="w-full bg-[#C19A6B] text-white p-3 rounded-md hover:shadow-md"
      >
        Add Room
      </button>
    </form>
  );
};

export default RoomForm;
