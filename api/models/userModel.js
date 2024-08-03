import mongoose from "mongoose";
import Product from "./productModel.js";
const { Schema } = mongoose;
const userSchema = mongoose.Schema(
    {
      name: {
        type: String,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      blacklisted: {
        type: Boolean,
        default: false,
      },
      wishlist: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    },
    {
      timestamps: true,
    }
  );

const User = mongoose.model("User",userSchema);

export default User;