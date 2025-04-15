// components/RoomEditForm.jsx
"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import updateRoom from "@/app/actions/updateRoom";
import { useRouter } from "next/navigation";
import { FaPen } from "react-icons/fa";

// 1. Accept the 'canEdit' prop
const RoomEditForm = ({ room, canEdit }) => {
  // 2. Conditionally render nothing if user doesn't have permission
  if (!canEdit) {
    return null;
  }

  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Ensure room data is present
  if (!room) {
    console.warn("RoomEditForm rendered without room data.");
    return null; // Or render an error/placeholder
  }

  const handleDialogOpen = () => setIsDialogOpen(true);
  const handleDialogClose = () => setIsDialogOpen(false);

  // Use action directly for form submission with Server Actions
  const handleSubmitAction = async (formData) => {
    setIsSubmitting(true);
    try {
      await updateRoom(room._id, formData); // Pass room._id and formData
      handleDialogClose();
      router.refresh();
    } catch (error) {
      console.error("Failed to update room:", error);
      // Add user feedback here
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    // Ensure room exists before rendering Dialog
    room && (
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <button
            onClick={handleDialogOpen} // Keep onClick for manual state control
            className="edit_button absolute ui-Link right-4 bg-[#C19A6B] text-white flex items-center justify-center rounded-full w-9 h-9 shadow-md hover:shadow-lg"
          >
            <FaPen size={17} />
          </button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edytuj Pokój</DialogTitle>
            <DialogDescription>
              Aktualizuj dane pokoju: {room.Pokoj}
            </DialogDescription>
          </DialogHeader>

          {/* Use the form action attribute */}
          <form action={handleSubmitAction} className="space-y-4">
            {/* Using uncontrolled components with defaultValue + form action */}
            <div>
              <label className="block font-medium mb-1">Sektor</label>
              <input
                type="number"
                name="Sektor"
                defaultValue={room.Sektor}
                required
                className="w-full border-2 border-gray-300 rounded-md p-2 focus:border-[#C19A6B] focus:ring-2 focus:ring-[#C19A6B]"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Winda</label>
              <input
                type="text"
                name="Winda"
                defaultValue={room.Winda}
                className="w-full border-2 border-gray-300 rounded-md p-2 focus:border-[#C19A6B] focus:ring-2 focus:ring-[#C19A6B]"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Atrybuty</label>
              <input
                type="text"
                name="Atrybuty"
                defaultValue={room.Atrybuty}
                className="w-full border-2 border-gray-300 rounded-md p-2 focus:border-[#C19A6B] focus:ring-2 focus:ring-[#C19A6B]"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Poziom</label>
              <input
                type="number"
                name="Poziom"
                defaultValue={room.Poziom}
                required
                className="w-full border-2 border-gray-300 rounded-md p-2 focus:border-[#C19A6B] focus:ring-2 focus:ring-[#C19A6B]"
              />
            </div>

            {/* Submit Button component might be needed for pending state with form actions */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#C19A6B] text-white py-2 rounded-md hover:shadow-md"
            >
              {isSubmitting ? "Zapisywanie..." : "Zapisz zmiany"}
            </button>
          </form>
        </DialogContent>
      </Dialog>
    )
  );
};

export default RoomEditForm;
