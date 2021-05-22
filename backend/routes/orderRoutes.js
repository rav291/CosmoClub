import express from "express";
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
} from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, addOrderItems);
router.route("/myOrders").get(protect, getMyOrders); // doesn't work, if you put it below all othre routes
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, updateOrderToPaid);

export default router;
