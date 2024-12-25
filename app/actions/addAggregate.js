"use server";

import connectDB from "@/config/database";
import Aggregate from "@/models/Aggregate";
import { revalidatePath } from "next/cache";

export default async function addAggregate(formData) {
  try {
    await connectDB();

    const aggregateData = {
      VRV: formData.get("VRV"),
      Zabezpieczenie: formData.get("Zabezpieczenie"),
      Pomieszczenie: formData.get("Pomieszczenie") || null, // Optional
      Places: formData.get("Places")
        ? formData
            .get("Places")
            .split(",")
            .map((place) => place.trim())
        : [], // Convert comma-separated list to array
    };

    const newAggregate = new Aggregate(aggregateData);
    await newAggregate.save();

    console.log("Aggregate added successfully:", newAggregate);
    revalidatePath("/aggregate");
  } catch (error) {
    console.error("Failed to add aggregate:", error);
    throw new Error("Failed to add aggregate");
  }
}
