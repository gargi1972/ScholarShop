import { errorHandler } from "../middleware/errorHandler.js";
import User from "../models/userModel.js";
import Product from "../models/productModel.js";

//get user
export const getUser = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return next(errorHandler(404, "User not found!"));
    }

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// delete User
export const deleteUser = async (req, res, next) => {
  // if (req.user.id !== req.params.id) {
  //   return next(errorHandler(401, "You can delete your own account!"));
  // }

  try {
    await Product.deleteMany({ userRef: req.user.id });
    await User.findByIdAndDelete(req.user.id);
    res.clearCookie("access_token");
    res.status(200).json("User has been deleted!");
  } catch (error) {
    next(error);
  }
};

// get User Products
export const getUserProducts = async (req, res, next) => {
  const userId = req.user.id;
  try {
    // Find products by user reference
    const products = await Product.find({ userRef: userId });

    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

export const addToWishlist = async (req, res, next) => {
  const { productId } = req.body; // Assuming productId is sent in the request body
  const userId = req.user.id; // Assuming userId is extracted from the request parameters

  try {
    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return next(errorHandler(404, "User not found"));
    }

    // Check if the product is already in the wishlist
    if (user.wishlist.includes(productId)) {
      return next(errorHandler(404, " Product already in wishlist"));
    }

    // Add the product ID to the wishlist array
    user.wishlist.push(productId);

    // Save the updated user document
    await user.save();

    res.status(200).json({ message: "Product added to wishlist", user });
  } catch (error) {
    next(error);
  }
};

export const removeFromWishlist = async (req, res,next) => {
  const { productId } = req.body; // Assuming productId is sent in the request body
  const userId = req.user.id; // Assuming userId is extracted from the request parameters

  try {
    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return next(errorHandler(404, "User not found"));
    }

    // Check if the product is in the wishlist
    if (!user.wishlist.includes(productId)) {
      return next(errorHandler(404, "Product does not exist in wishlist"));
    }

    // Remove the product ID from the wishlist array
    user.wishlist = user.wishlist.filter((id) => id.toString() !== productId);

    // Save the updated user document
    await user.save();

    res.status(200).json({ message: "Product removed from wishlist", user });
  } catch (error) {
    next(error);
  }
};

export const getAllWishListItems = async (req, res, next) => {
  const userId = req.user.id;

  try {
    // Find the user by ID
    const user = await User.findById(userId).populate("wishlist");

    if (!user) {
      return next(errorHandler(404, "User not found"));
    }

    res.status(200).json({ wishlist: user.wishlist });
  } catch (error) {
    next(error);
  }
};
