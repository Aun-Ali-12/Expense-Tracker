import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    verificationToken: {
      type: String,
    },
    verificationTokenExpiry: {
      type: Date
    },
    passwordToken: {
      type: String
    },
    passwordTokenExpiry: {
      type: Date
    }
  },
  { timestamps: true }, // handles createdAt/updatedAt
);

// model
const userModel = mongoose.model("User", userSchema);
export default userModel;
