// models/Password.js
import { Schema, model, models } from "mongoose";

const PasswordSchema = new Schema({
  Password: {
    type: String,
    required: true,
  },
});

// Check if the model exists before defining it
const Password = models.Password || model("Password", PasswordSchema);
export default Password;
