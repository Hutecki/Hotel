"use server";

import connectDB from "@/config/database";
import Room from "@/models/Room";

export default async function getRoom(roomNumber) {
  try {
    await connectDB();
    const room = await Room.findOne({ Pokoj: roomNumber }).lean(); // Convert to plain object
    if (!room) throw new Error("Room not found");
    return room;
  } catch (error) {
    console.error("Failed to fetch room:", error);
    throw new Error("Failed to fetch room");
  }
}
