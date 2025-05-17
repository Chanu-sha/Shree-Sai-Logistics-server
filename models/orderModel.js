import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  consignmentNo: {
    type: String,
    required: true,
  },
  bookingDate: {
    type: String,
    required: true,
  },
  origin: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  expectedDeliveryDate: {
    type: String,
    required: true,
  },
  expectedDelivery: {
    type: String,
    required: true,
  },
  images: {
    type: String,
    required: true,
  },
  cloudinary_id: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

export default Order;
