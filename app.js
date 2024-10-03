const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");
const productRouter = require("./src/routers/productRoutes");
const userRouter = require("./src/routers/userRoutes");
const orderRouter = require("./src/routers/orderRoutes");
const app = express();
app.use(express.json()); //let us read req.body
app.use(cookieParser()); //cookieParser(parse data from cookie /req.cookies.jwt)/)
//req.cookies object is populated by the cookie-parser middleware, which typically runs after routing is completed.
app.use((req, res, next) => {
  //req.requestTime = new Date().toISOString();
  //console.log("jwt", req.cookies.jwt);
  //console.log(req.user, req.token);
  //console.log(req.headers);
  next();
});
app.use(express.static(path.join(__dirname, "client", "dist")));
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/dist", "index.html"));
  //res.sendFile(path.resolve(__dirname, "./public", "index.html"));
});
module.exports = app;
