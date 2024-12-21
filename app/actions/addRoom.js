"use server";

import connectDB from "@/config/database";
import Room from "@/models/Room";
import { revalidatePath } from "next/cache";

export default async function addRoom(formData) {
  try {
    await connectDB();

    const roomData = {
      Pokoj: formData.get("Pokoj"),
      Sektor: formData.get("Sektor"),
      Winda: formData.get("Winda"),
      Atrybuty: formData.get("Atrybuty"),
      Poziom: formData.get("Poziom"),
    };

    const newRoom = new Room(roomData);
    await newRoom.save();

    console.log("Room added successfully:", newRoom);
    revalidatePath("/room");
  } catch (error) {
    console.error("Failed to add room:", error);
    throw new Error("Failed to add room");
  }
}
