// models/Room.js
import { Schema, model, models } from "mongoose";

const RoomSchema = new Schema({
  Pokoj: {
    type: Number,
    required: true,
  },
  Sektor: {
    type: Number,
    required: true,
  },
  Winda: {
    type: String,
    required: true,
  },
  Atrybuty: {
    type: String,
    required: true,
  },
  Poziom: {
    // Add Poziom explicitly
    type: Number,
    required: true,
  },
});

// Check if the model exists before defining it
const Room = models?.Room || model("Room", RoomSchema);
export default Room;
