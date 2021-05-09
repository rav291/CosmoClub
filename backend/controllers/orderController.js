import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

// @desc       Create new Order
// @route      POST /api/products
// @access     Private

const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id, // this is the _id coming from token passed to the authMiddleware, since it's a protected Route
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    });

    const createdUser = await order.save();
    res.status(201).json(createdUser);
  }
});

export { addOrderItems };
