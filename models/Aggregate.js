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
});

const Aggregate = models?.Aggregate || model("Aggregate", AggregateSchema);
export default Aggregate;
