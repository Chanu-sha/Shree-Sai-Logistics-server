import express from 'express';
import { addOrder, getOrders, getOrderCounts, updateOrder, deleteOrder,getOrderByConsignmentNo  } from '../controllers/orderController.js';
import upload from '../config/multer.js';

const router = express.Router();

router.post('/add', upload.single('detailsImage'), addOrder);
router.get('/', getOrders);
router.get('/counts', getOrderCounts);
router.put("/update/:id", upload.single("detailsImage"), updateOrder);
router.delete('/delete/:consignmentNo', deleteOrder);
router.get('/track/:consignmentNo', getOrderByConsignmentNo);

export default router;
