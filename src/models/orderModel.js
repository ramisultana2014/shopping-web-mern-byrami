const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    phoneNumber: String,
    address: String,
    totalPrice: Number,
    cart: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        title: { type: String },
        orderQuantity: { type: Number },
        price: { type: Number },
        totalPrice: { type: Number },
        image: { type: String },
      },
    ],
  },
  {
    timestamps: true, //that will add tow( fields created at update at)
    toJSON: { virtuals: true }, // to make virual below works
    toObject: { virtuals: true },
  }
);
// orderSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: "userId",
//     select: "name",
//   });

//   next();
// });
const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
