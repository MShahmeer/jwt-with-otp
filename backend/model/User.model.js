import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "Please provide unique Username"],
    unique: [true, "Username Exist"],
  },

  password: {
    type: String,
    required: [true, "Please provide Password"],
    unique: false,
  },

  email: {
    type: String,
    required: [true, "Please provide a unique email address"],
    unique: true,
  },

  mobileNumbers: {
    type: [String],
    required: [true, "Please provide Mobile Number"],
  },
});

export default mongoose.model.Users || mongoose.model("User", UserSchema);
