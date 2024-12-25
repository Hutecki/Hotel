// models/Aggregate.js
import { Schema, model, models } from "mongoose";

const AggregateSchema = new Schema({
  VRV: {
    type: String,
    required: true,
    unique: true,
  },
  Zabezpieczenie: {
    type: String,
    required: true,
  },
  Pomieszczenie: {
    type: String,
    required: false, // Optional if not always present
  },
  Places: [
    {
      type: String, // Assuming room names or numbers are stored as strings
    },
  ],
});

const Aggregate = models?.Aggregate || model("Aggregate", AggregateSchema);
export default Aggregate;
