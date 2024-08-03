import mongoose from "mongoose";
const { Schema } = mongoose;
const validTags = ['books', 'sports', 'stationary', 'others'];
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    age: {
      type: Number,
    },
    image: {
      type: String,
      required: true,
    },
    userRef: {
      type:mongoose.Schema.Types.ObjectId,
      ref:"User" 
    },
    tags: {
      type: [String],
      enum: validTags,
      required: true,
      validate: {
        validator: function (v) {
          return v.every(tag => validTags.includes(tag));
        },
        message: props => `${props.value} contains invalid tags!`
      }
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
