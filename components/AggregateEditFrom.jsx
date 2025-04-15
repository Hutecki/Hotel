// components/AggregateEditForm.jsx (or AggregateEditFrom.jsx)
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

// 1. Accept the 'canEdit' prop
const AggregateEditForm = ({ aggregate, canEdit }) => {
  // 2. Conditionally render nothing if user doesn't have permission
  if (!canEdit) {
    return null;
  }

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    VRV: aggregate?.VRV || "", // Add fallback for safety
    Zabezpieczenie: aggregate?.Zabezpieczenie || "",
    Pomieszczenie: aggregate?.Pomieszczenie || "",
    Places: aggregate?.Places ? aggregate.Places.join(", ") : "",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Manage dialog state

  // Ensure aggregate exists before proceeding
  if (!aggregate) {
    console.warn("AggregateEditForm rendered without aggregate data.");
    return null; // Or render an error/placeholder
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    // Can use standard event
    event.preventDefault(); // Prevent default form submission
    setIsSubmitting(true);

    try {
      // Construct FormData directly from the state `formData`
      const updatedForm = new FormData();
      // Only append fields that should be updated - VRV is usually not changed
      updatedForm.append("Zabezpieczenie", formData.Zabezpieczenie);
      updatedForm.append("Pomieszczenie", formData.Pomieszczenie);
      // Handle Places carefully: split, trim, and filter empty strings before stringifying
      const placesArray = formData.Places.split(",")
        .map((place) => place.trim())
        .filter((place) => place !== "");
      updatedForm.append("Places", JSON.stringify(placesArray));

      await updateAggregate(aggregate.VRV, updatedForm); // Pass VRV as identifier
      setIsDialogOpen(false); // Close dialog on success
      // Consider using router.refresh() instead of window.location.reload() for smoother updates
      // router.refresh();
      window.location.reload(); // Keep reload for now if needed
    } catch (error) {
      console.error("Failed to update aggregate:", error.message);
      // Add user feedback (e.g., toast, error message)
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    // Ensure aggregate exists before rendering Dialog
    aggregate && (
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {/* Trigger Button */}
        <DialogTrigger asChild>
          <button className="edit_button ui-Link absolute right-4 bg-[#C19A6B] text-white flex items-center justify-center rounded-full w-9 h-9 shadow-md hover:shadow-lg">
            <FaPen size={17} />
          </button>
        </DialogTrigger>

        {/* Dialog Content */}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edytuj Agregat: {aggregate.VRV}</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Form fields using controlled components (value + onChange) */}
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
                className="w-full border-2 border-gray-300 rounded-md p-2 bg-gray-100"
              />
            </div>
            <div>
              <label
                htmlFor="Zabezpieczenie"
                className="block font-medium mb-1"
              >
                Zabezpieczenie
              </label>
              <input
                type="text"
                name="Zabezpieczenie"
                id="Zabezpieczenie"
                value={formData.Zabezpieczenie}
                onChange={handleChange}
                required
                className="w-full border-2 border-gray-300 rounded-md p-2 focus:border-[#C19A6B] focus:ring-2 focus:ring-[#C19A6B]"
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
                Pokoje (oddzielone przecinkiem)
              </label>
              <textarea
                name="Places"
                id="Places"
                value={formData.Places}
                onChange={handleChange}
                rows="3"
                className="w-full border-2 border-gray-300 rounded-md p-2 focus:border-[#C19A6B] focus:ring-2 focus:ring-[#C19A6B]"
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
    )
  );
};

export default AggregateEditForm;
