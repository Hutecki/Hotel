// models/Place.js
import { Schema, model, models } from "mongoose";

const PlaceSchema = new Schema({
  Pokoj: {
    type: String,
    required: true,
    unique: true, // Ensures no duplicate room identifiers
  },
  Budynek: {
    type: String,
    required: true,
    default: "A1", // Default value for Budynek
  },
  Sektor: {
    type: Number,
    required: true,
  },
  Agregat: {
    type: String,
    required: true,
    ref: "Aggregate", // Reference to the Aggregate schema
  },
  Powiazanie: {
    type: String,
    required: true,
  },
});

const Place = models?.Place || model("Place", PlaceSchema);
export default Place;
