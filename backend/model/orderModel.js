import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },

    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
    },

    modeOfPayment: {
      type: String,
      required: [true, 'Mode of payment is required'],
      enum: ['crypto', 'giftcard'], // Only allowed options
    },

    amountPaid: {
      type: Number,
      required: [true, 'Amount paid is required'],
      min: [0, 'Amount cannot be negative'],
    },

    receiptImageUrl: {
      type: String,
      required: [true, 'Receipt image is required'],
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;