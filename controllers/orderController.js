import Order from '../models/orderModel.js';
import cloudinary from '../config/cloudinary.js';  

export const addOrder = async (req, res) => {
  try {
    const { consignmentNo, bookingDate, origin, destination, status, expectedDeliveryDate, expectedDelivery } = req.body;

    let imageUrl = "";
    let cloudinaryId = "";

    if (req.file && req.file.path) {
      imageUrl = req.file.path;
      cloudinaryId = req.file.filename;  
    }

    const newOrder = new Order({
      consignmentNo,
      bookingDate,
      origin,
      destination,
      status,
      expectedDeliveryDate,
      expectedDelivery,
      images: imageUrl,
      cloudinary_id: cloudinaryId
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOrderCounts = async (req, res) => {
  try {
    const total = await Order.countDocuments();
    const pending = await Order.countDocuments({ status: 'Pending' });
    const completed = await Order.countDocuments({ status: 'Completed' });
    const canceled = await Order.countDocuments({ status: 'Canceled' });

    res.json({ total, pending, completed, canceled });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    let imageUrl = order.images;
    let cloudinaryId = order.cloudinary_id;

    if (req.file && req.file.path) {
      if (order.cloudinary_id) {
        await cloudinary.uploader.destroy(order.cloudinary_id);
      }

      imageUrl = req.file.path;
      cloudinaryId = req.file.filename;
    }

    order.consignmentNo = req.body.consignmentNo || order.consignmentNo;
    order.bookingDate = req.body.bookingDate || order.bookingDate;
    order.origin = req.body.origin || order.origin;
    order.destination = req.body.destination || order.destination;
    order.status = req.body.status || order.status;
    order.expectedDeliveryDate = req.body.expectedDeliveryDate || order.expectedDeliveryDate;
    order.expectedDelivery = req.body.expectedDelivery || order.expectedDelivery;
    order.images = imageUrl;
    order.cloudinary_id = cloudinaryId;

    await order.save();
    res.json({ message: "Order updated successfully", order });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update order" });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const consignmentNo = req.params.consignmentNo;  

    const order = await Order.findOne({ consignmentNo });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.cloudinary_id) {
      await cloudinary.uploader.destroy(order.cloudinary_id);
    }

    await Order.deleteOne({ consignmentNo });  
    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOrderByConsignmentNo = async (req, res) => {
  try {
    const consignmentNo = req.params.consignmentNo;

    const order = await Order.findOne({ consignmentNo });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


