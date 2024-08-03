import express from "express";
import {
  addToWishlist,
  deleteUser,
  getAllWishListItems,
  getUser,
  getUserProducts,
  removeFromWishlist,
} from "../controllers/userController.js";
import { auth } from "../middleware/verify_token.js"; 

const router = express.Router();

router.get("/getuser", auth, getUser);
router.get("/get", auth, getUserProducts);
router.delete("/delete", deleteUser);
router.put("/addwish", auth, addToWishlist);
router.put("/removewish", auth, removeFromWishlist);
router.get("/getwish", auth, getAllWishListItems);

export default router;
