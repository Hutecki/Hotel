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

const RoomEditForm = ({ room }) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDialogOpen = () => setIsDialogOpen(true);
  const handleDialogClose = () => setIsDialogOpen(false);

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);

    try {
      await updateRoom(room._id, formData); // Update the room
      handleDialogClose(); // Close the dialog after successful update
      router.refresh(); // Refresh the page to fetch updated data
    } catch (error) {
      console.error("Failed to update room:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <button
          onClick={handleDialogOpen}
          className="edit_button absolute right-4 bg-[#C19A6B] text-white flex items-center justify-center rounded-full w-9 h-9 shadow-md hover:shadow-lg"
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

        <form action={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Sektor</label>
            <input
              type="number"
              name="Sektor"
              defaultValue={room.Sektor}
              className="w-full border-2 border-gray-300 rounded-md p-2 focus:border-[#C19A6B] focus:ring-2 focus:ring-[#C19A6B]"
              required
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
              className="w-full border-2 border-gray-300 rounded-md p-2 focus:border-[#C19A6B] focus:ring-2 focus:ring-[#C19A6B]"
              required
            />
          </div>

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
  );
};

export default RoomEditForm;
