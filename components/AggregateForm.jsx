"use client";

import React from "react";
import addAggregate from "@/app/actions/addAggregate";

const AggregateForm = ({ closeDialog }) => {
  return (
    <form
      action={async (formData) => {
        await addAggregate(formData);
        if (closeDialog) closeDialog(); // Close the dialog after successful submission
      }}
      className="space-y-4"
    >
      <input
        type="text"
        name="VRV"
        placeholder="VRV"
        required
        className="w-full border-2 border-gray-300 focus:border-[#C19A6B] focus:ring-2 focus:ring-[#C19A6B] focus:outline-none p-2 rounded-md"
      />
      <input
        type="text"
        name="Zabezpieczenie"
        placeholder="Zabezpieczenie"
        required
        className="w-full border-2 border-gray-300 focus:border-[#C19A6B] focus:ring-2 focus:ring-[#C19A6B] focus:outline-none p-2 rounded-md"
      />
      <input
        type="text"
        name="Pomieszczenie"
        placeholder="Pomieszczenie"
        className="w-full border-2 border-gray-300 focus:border-[#C19A6B] focus:ring-2 focus:ring-[#C19A6B] focus:outline-none p-2 rounded-md"
      />
      <textarea
        name="Places"
        placeholder="Pokoje (comma-separated)"
        className="w-full border-2 border-gray-300 focus:border-[#C19A6B] focus:ring-2 focus:ring-[#C19A6B] focus:outline-none p-2 rounded-md"
        rows="3"
      ></textarea>
      <button
        type="submit"
        className="w-full bg-[#C19A6B] text-white p-3 rounded-md hover:shadow-md"
      >
        Dodaj agregat
      </button>
    </form>
  );
};

export default AggregateForm;
