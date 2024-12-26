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
import { FaPlus } from "react-icons/fa";
import addRoom from "@/app/actions/addRoom";
import { usePathname } from "next/navigation";

const RoomForm = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const pathname = usePathname();
  if (pathname !== "/room") return null;

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);

    try {
      await addRoom(formData); // Add the room
      setIsDialogOpen(false); // Close the dialog after successful submission
    } catch (error) {
      console.error("Failed to add room:", error);
    } finally {
      setIsSubmitting(false); // Ensure the button is re-enabled
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      {/* Trigger Button */}
      <DialogTrigger asChild>
        <button className="add_button absolute right-4 bg-[#C19A6B] text-white flex items-center justify-center rounded-full w-9 h-9 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#C19A6B]">
          <FaPlus size={20} />
        </button>
      </DialogTrigger>

      {/* Dialog Content */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dodaj nowy pokój</DialogTitle>
          <DialogDescription>Wypełnij dane dla nowego pokoju</DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            handleSubmit(formData);
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
            disabled={isSubmitting}
            className="w-full bg-[#C19A6B] text-white p-3 rounded-md hover:shadow-md"
          >
            {isSubmitting ? "Dodawanie..." : "Dodaj pokój"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RoomForm;
