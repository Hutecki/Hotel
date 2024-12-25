"use server";

import connectDB from "@/config/database";
import Aggregate from "@/models/Aggregate";
import { revalidatePath } from "next/cache";

async function updateAggregate(vrv, formData) {
  await connectDB();

  // Parse the comma-separated Places into an array
  const placesString = formData.get("Places");
  const placesArray = placesString
    ? JSON.parse(placesString).map((place) => place.trim())
    : [];

  const aggregateData = {
    Zabezpieczenie: formData.get("Zabezpieczenie"),
    Pomieszczenie: formData.get("Pomieszczenie"),
    Places: placesArray,
  };

  const updatedAggregate = await Aggregate.findOneAndUpdate(
    { VRV: vrv },
    aggregateData,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedAggregate) {
    throw new Error(`Aggregate with VRV ${vrv} not found`);
  }

  // Revalidate the page for this VRV
  revalidatePath(`/aggregate/listingsAggregates/${vrv}`);
}

export default updateAggregate;
