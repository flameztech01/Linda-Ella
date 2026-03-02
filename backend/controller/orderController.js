import asyncHandler from "express-async-handler";
import Order from "../model/orderModel.js";

// @desc    Create new order
// @route   POST /api/orders
// @access  Public (or Private if you add auth later)
const createOrder = asyncHandler(async (req, res) => {
  const { name, email, modeOfPayment, amountPaid } = req.body;

  const receiptImageUrl = req.file?.path; // ✅ from multer/cloudinary

  if (!name || !email || !modeOfPayment || !amountPaid || !receiptImageUrl) {
    res.status(400);
    throw new Error("name, email, modeOfPayment, amountPaid and receipt are required");
  }

  const order = await Order.create({
    name: name.trim(),
    email: email.toLowerCase().trim(),
    modeOfPayment,
    amountPaid: Number(amountPaid),
    receiptImageUrl,
  });

  res.status(201).json(order);
});


// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Admin (recommended) / Public (if you allow)
 const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  res.status(200).json(order);
});

export {
    createOrder,
    getOrderById
}