import User from "../models/userModel.js";
import Product from "../models/productModel.js";
import { errorHandler } from "../middleware/errorHandler.js";
import mongoose from "mongoose";

//Get all products
export const getAllProduct = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;

    let tags = req.query.tag;

    if (tags === undefined) {
      tags = { $in: ["books", "sports", "stationary", "others"] };
    }

    const searchTerm = req.query.searchTerm || "";
    const sort = req.query.sort || "createdAt";
    const order = req.query.order || "desc";

    const products = await Product.find({
      name: { $regex: searchTerm, $options: "i" },
      tags,
    })
      .sort({ [sort]: order, })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

//Get product by id
export const getProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    console.log(product);
    if (!product) {
      return next(errorHandler(404, "Product not found"));
    }

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

//add product
export const addProduct = async (req, res, next) => {
  const { name, description, price, age, image, tags } = req.body;
  const userRef = req.user.id;

  try {
    // Validate input
    if (!name || !price || !image || !tags || !userRef) {
      return next(errorHandler(400, "Missing required fields!"));
    }

    // Create a new product instance
    const newProduct = new Product({
      name,
      description,
      price,
      age,
      image,
      userRef,
      tags,
    });

    // Save the product to the database
    await newProduct.save();

    res
      .status(201)
      .json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    res;
    next(error);
  }
};

//delete product
export const deleteProduct = async (req, res, next) => {
  const productId = req.params.id;

  try {
    // Validate the productId
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return next(errorHandler(400, "Invalid Product ID"));
    }

    // Find the product by ID
    const product = await Product.findById(productId);

    // Check if the product exists
    if (!product) {
      return next(errorHandler(404, "Product not found"));
    }

    if (!product.userRef.equals(req.user.id)) {
      return next(errorHandler(401, "You can only update your own product!"));
    }

    // Delete the product from the database
    await product.remove();

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error('Error deleting product:', error);
    next(error);
  }
};

//update product
export const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return next(errorHandler(404, "Product not found!"));
    }

    // Compare ObjectIds using Mongoose's equals method
    if (!product.userRef.equals(req.user.id)) {
      return next(errorHandler(401, "You can only update your own product!"));
    }

    // Update the product
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true, // Ensure validators are run on the update
      }
    );

    res.status(200).json(updatedProduct);
  } catch (error) {
    next(error);
  }
};
