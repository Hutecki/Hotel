"use client";

import React, { useState } from "react";
import updateAggregate from "@/app/actions/updateAggregate";

const AggregateEditForm = ({ aggregate }) => {
  const [formData, setFormData] = useState({
    VRV: aggregate.VRV,
    Zabezpieczenie: aggregate.Zabezpieczenie || "",
    Pomieszczenie: aggregate.Pomieszczenie || "",
    Places: aggregate.Places ? aggregate.Places.join(", ") : "", // Convert array to comma-separated string
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("Zabezpieczenie", formData.Zabezpieczenie);
    form.append("Pomieszczenie", formData.Pomieszczenie);
    form.append(
      "Places",
      JSON.stringify(formData.Places.split(",").map((place) => place.trim())) // Convert back to array
    );

    try {
      await updateAggregate(aggregate.VRV, form); // Update by VRV
      // Revalidate the current path to reflect changes
      const { revalidatePath } = await import("next/cache");
      revalidatePath(`/aggregate/listingsAggregates/${aggregate.VRV}`);
    } catch (error) {
      console.error("Failed to update aggregate:", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <div>
        <label
          htmlFor="VRV"
          className="block text-sm font-medium text-gray-700 mt-5"
        >
          VRV
        </label>
        <input
          type="text"
          name="VRV"
          id="VRV"
          value={formData.VRV}
          disabled // Make VRV read-only
          className="mt-1 p-2 border border-gray-300 rounded w-full"
        />
      </div>

      <div>
        <label
          htmlFor="Zabezpieczenie"
          className="block text-sm font-medium text-gray-700"
        >
          Zabezpieczenie
        </label>
        <input
          type="text"
          name="Zabezpieczenie"
          id="Zabezpieczenie"
          value={formData.Zabezpieczenie}
          onChange={handleChange}
          className="mt-1 p-2 border border-gray-300 rounded w-full"
        />
      </div>

      <div>
        <label
          htmlFor="Pomieszczenie"
          className="block text-sm font-medium text-gray-700"
        >
          Pomieszczenie
        </label>
        <input
          type="text"
          name="Pomieszczenie"
          id="Pomieszczenie"
          value={formData.Pomieszczenie}
          onChange={handleChange}
          className="mt-1 p-2 border border-gray-300 rounded w-full"
        />
      </div>

      <div>
        <label
          htmlFor="Places"
          className="block text-sm font-medium text-gray-700"
        >
          Pokoje
        </label>
        <textarea
          name="Places"
          id="Places"
          value={formData.Places}
          onChange={handleChange}
          className="mt-1 p-2 border border-gray-300 rounded w-full"
          rows="3"
        />
      </div>

      <button
        type="submit"
        className="bg-[#C19A6B] text-white p-2 rounded w-full  hover:shadow-md"
      >
        Save Changes
      </button>
    </form>
  );
};

export default AggregateEditForm;
