"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FaPen } from "react-icons/fa";
import updateAggregate from "@/app/actions/updateAggregate";

const AggregateEditForm = ({ aggregate }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    VRV: aggregate.VRV,
    Zabezpieczenie: aggregate.Zabezpieczenie || "",
    Pomieszczenie: aggregate.Pomieszczenie || "",
    Places: aggregate.Places ? aggregate.Places.join(", ") : "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);

    try {
      const updatedForm = new FormData();
      updatedForm.append("Zabezpieczenie", formData.Zabezpieczenie);
      updatedForm.append("Pomieszczenie", formData.Pomieszczenie);
      updatedForm.append(
        "Places",
        JSON.stringify(formData.Places.split(",").map((place) => place.trim()))
      );

      await updateAggregate(aggregate.VRV, updatedForm); // Update aggregate
      window.location.reload(); // Refresh the page to reflect changes
    } catch (error) {
      console.error("Failed to update aggregate:", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog>
      {/* Trigger Button */}
      <DialogTrigger asChild>
        <button className="edit_button absolute right-4 bg-[#C19A6B] text-white flex items-center justify-center rounded-full w-9 h-9 shadow-md hover:shadow-lg">
          <FaPen size={17} />
        </button>
      </DialogTrigger>

      {/* Dialog Content */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edytuj Agregat: {aggregate.VRV}</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(formData);
          }}
          className="space-y-4"
        >
          <div>
            <label htmlFor="VRV" className="block font-medium mb-1">
              VRV
            </label>
            <input
              type="text"
              name="VRV"
              id="VRV"
              value={formData.VRV}
              disabled
              className="w-full border-2 border-gray-300 rounded-md p-2 focus:border-[#C19A6B] focus:ring-2 focus:ring-[#C19A6B]"
            />
          </div>

          <div>
            <label htmlFor="Zabezpieczenie" className="block font-medium mb-1">
              Zabezpieczenie
            </label>
            <input
              type="text"
              name="Zabezpieczenie"
              id="Zabezpieczenie"
              value={formData.Zabezpieczenie}
              onChange={handleChange}
              className="w-full border-2 border-gray-300 rounded-md p-2 focus:border-[#C19A6B] focus:ring-2 focus:ring-[#C19A6B]"
              required
            />
          </div>

          <div>
            <label htmlFor="Pomieszczenie" className="block font-medium mb-1">
              Pomieszczenie
            </label>
            <input
              type="text"
              name="Pomieszczenie"
              id="Pomieszczenie"
              value={formData.Pomieszczenie}
              onChange={handleChange}
              className="w-full border-2 border-gray-300 rounded-md p-2 focus:border-[#C19A6B] focus:ring-2 focus:ring-[#C19A6B]"
            />
          </div>

          <div>
            <label htmlFor="Places" className="block font-medium mb-1">
              Pokoje
            </label>
            <textarea
              name="Places"
              id="Places"
              value={formData.Places}
              onChange={handleChange}
              className="w-full border-2 border-gray-300 rounded-md p-2 focus:border-[#C19A6B] focus:ring-2 focus:ring-[#C19A6B]"
              rows="3"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#C19A6B] text-white py-2 rounded-md hover:shadow-md"
          >
            {isSubmitting ? "Zapisywanie..." : "Zapisz dane"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AggregateEditForm;
