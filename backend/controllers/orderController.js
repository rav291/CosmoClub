import e from "express";
import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

// @desc       Create new Order
// @route      POST /api/orders
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

// @desc       Get order by id
// @route      GET /api/orders/:id
// @access     Private

const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  // populate -> aslo include user which was passed in order model

  if (order) {
    res.json(order);
  } else {
    res.status(404).json("Order Not Found");
  }
});

// @desc       Update order to paid
// @route      GET /api/orders/:id/pay
// @access     Private

const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404).json("Order Not Found");
  }
});

// @desc       Getting logged in user's orders
// @route      GET /api/orders/myOrders
// @access     Private

const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user }); // req.user or req.user._id both work same, since mongoose also identifies user
  // by it's _id
  res.json(orders);
});

export { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders };
