"use client";

import React, { useState } from "react";
import updateRoom from "@/app/actions/updateRoom";
import { useRouter } from "next/navigation";

const RoomEditForm = ({ room, closeDialog }) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);

    try {
      await updateRoom(room._id, formData);
      router.refresh();
      closeDialog();
    } catch (error) {
      console.error("Failed to update room:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
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
        {isSubmitting ? "zapisywanie..." : "Zapisz zmiany"}
      </button>
    </form>
  );
};

export default RoomEditForm;
