"use server";

import connectDB from "@/config/database";
import Room from "@/models/Room";
import { revalidatePath } from "next/cache";

async function updateRoom(roomId, formData) {
  await connectDB();

  const roomData = {
    Sektor: formData.get("Sektor"),
    Winda: formData.get("Winda"),
    Atrybuty: formData.get("Atrybuty"),
    Poziom: formData.get("Poziom"),
  };

  const updatedRoom = await Room.findByIdAndUpdate(roomId, roomData, {
    new: true,
  });

  if (!updatedRoom) {
    throw new Error("Room not found");
  }

  revalidatePath(`/room/${updatedRoom.Pokoj}`); // Revalidate the room's page
}

export default updateRoom;
