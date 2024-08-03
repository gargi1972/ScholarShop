import express from 'express'
import { auth } from '../middleware/verify_token.js';
import { addProduct, deleteProduct, getAllProduct, getProduct, updateProduct } from '../controllers/productsController.js';


const router = express.Router();

//filter products by tags
//add product
//delete product
//update product

router.get('/get', getAllProduct);
router.get("/get/:id", getProduct);
router.delete("/delete/:id",auth, deleteProduct);
router.put("/update/:id",auth, updateProduct);
router.post("/add",auth, addProduct);

export default router;