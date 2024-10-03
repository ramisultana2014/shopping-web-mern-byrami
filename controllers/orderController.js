const Order = require("../src/models/orderModel");
const Product = require("../src/models/productsModel");

exports.createOrder = async (req, res) => {
  try {
    // Update product quantities and create order
    const updatedProducts = await Promise.all(
      req.body.cart.map(async (item) => {
        const product = await Product.findById(item.productId);
        if (!product) {
          throw new Error(`Product with ID ${item.productId} not found`);
        }
        product.quantity -= item.orderQuantity;
        await product.save();
        //return product;
      })
    );

    // Create new order
    const newOrder = await Order.create({
      ...req.body,
      userId: req.user._id,
    });

    res.status(201).json({
      status: "success",
      data: {
        order: newOrder,
        updatedProducts: updatedProducts,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
exports.getOneOrder = async (req, res) => {
  const orderId = req.params.id;
  try {
    const order = await Order.findOne({ _id: orderId, userId: req.user._id });
    if (!order) {
      return res.status(404).json({
        status: "no order with that id",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        order,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.updateOrder = async (req, res) => {
  const updates = Object.keys(req.body);
  const orderId = req.params.id;
  try {
    const order = await Order.findOne({ _id: orderId, userId: req.user._id });
    if (!order) {
      return res.status(404).json({
        status: "no order with that id",
      });
    }
    updates.forEach((update) => (order[update] = req.body[update]));
    await order.save();
    res.status(200).json({
      status: "success",
      data: {
        order,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};
exports.deleteOrder = async (req, res) => {
  const orderId = req.params.id;

  try {
    const preCheckorder = await Order.findOne({
      _id: orderId,
      userId: req.user._id,
    });
    if (!preCheckorder) {
      throw new Error("no order with that id");
    }
    const updatedProducts = await Promise.all(
      preCheckorder.cart.map(async (item) => {
        const product = await Product.findById(item.productId);
        if (!product) {
          throw new Error(`Product with ID ${item.productId} not found`);
        }
        product.quantity += item.orderQuantity;
        await product.save();
        //return product;
      })
    );
    const order = await Order.findOneAndDelete({
      _id: orderId,
      userId: req.user._id,
    });
    if (!order) {
      return res.status(404).json({
        status: "no order with that id",
      });
    }
    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};
exports.getAllOrdersByAdmin = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json({
      status: "success",
      results: orders.length,
      data: {
        orders,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};
exports.getOneOrderByAdmin = async (req, res) => {
  const orderId = req.params.id;
  try {
    const order = await Order.findOne({ _id: orderId });
    if (!order) {
      return res.status(404).json({
        status: "no order with that id",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        order,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};
exports.deleteOrderByAdmin = async (req, res) => {
  const orderId = req.params.id;
  const order = await Order.findById(orderId);
  if (!order) {
    throw new Error("no order with that id");
  }
  await Promise.all(
    order.cart.map(async (item) => {
      const product = await Product.findById(item.productId);
      if (!product) {
        throw new Error(`Product with ID ${item.productId} not found`);
      }
      product.quantity += item.orderQuantity;
      await product.save();
      //return product;
    })
  );
  try {
    const order = await Order.findByIdAndDelete(orderId);
    if (!order) {
      return res.status(404).json({
        status: "no order with that id",
      });
    }
    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};
// exports.updateOrder = async (req, res) => {
//   try {
//     //the id here is the obj id
//     const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
//       new: true, //will return the update doc
//       runValidators: true,
//     });
//     //console.log(product);

//     if (!order) {
//       return res.status(404).json({
//         status: "no order with that id",
//       });
//     }
//     res.status(200).json({
//       status: "success",
//       data: {
//         order,
//       },
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: "fail",
//       message: error.message,
//     });
//   }
// };
