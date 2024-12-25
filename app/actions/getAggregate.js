"use server";

import connectDB from "@/config/database";
import Aggregate from "@/models/Aggregate";

const getAggregate = async (vrv) => {
  await connectDB();

  try {
    const aggregate = await Aggregate.findOne({ VRV: vrv }).lean();
    if (!aggregate) {
      throw new Error(`Aggregate with VRV ${vrv} not found`);
    }
    if (aggregate._id) {
      aggregate._id = aggregate._id.toString();
    }
    return aggregate;
  } catch (error) {
    console.error("Error fetching aggregate:", error.message);
    throw new Error("Failed to fetch aggregate");
  }
};

export default getAggregate;
