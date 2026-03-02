import express from 'express';
import {
      createOrder,

        getOrderById
} from '../controller/orderController.js';
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from 'multer-storage-cloudinary'

const router = express.Router();

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Multer -> Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "FanCardReceipt_uploads",
    allowed_formats: ["jpg", "png", "jpeg", "webp"], // add webp if you want
    // public_id: (req, file) => `receipt_${req.user._id}_${Date.now()}`,
  },
});

const upload = multer({ storage });

// Optional: test connection (DON'T block server startup if it fails)
cloudinary.api
  .ping()
  .then(() => console.log("✅ Cloudinary connected successfully"))
  .catch((err) => console.error("❌ Cloudinary not connected:", err.message));

// Create Order
router.post('/', upload.single("receipt"), createOrder);

// // Get All Orders
// router.get('/', getOrders);

// Get Order By ID
router.get('/:id', getOrderById);

export default router;