const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../src/models/usersModel");
const sendWelcomeEmail = require("../src/emails/email");
exports.activatTheUserAccount = async (req, res) => {
  try {
    const token = req.params.activat;
    //console.log(token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //console.log(decoded);
    const user = await User.findById(decoded.id);
    if (!user) {
      throw new Error("please signup or login");
    }
    user.active = true;
    await user.save({ validateBeforeSave: false });
    res.status(200).json({ status: "success" });
    //console.log(user);
  } catch (error) {
    res.status(401).send({ error: error.message });
  }
};

exports.restrictTo = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      throw new Error("you dont have permission");
    }
  } catch (error) {
    res.status(401).send({ error: error.message });
    return;
  }

  next();
};
exports.prtotectedRouter = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1]; //this line when use postman to read token
      //console.log("headres");
    } else if (req.cookies.jwt) {
      //console.log("cookie");
      token = req.cookies.jwt;
    }

    // console.log(token);
    if (!token) {
      throw new Error("No token provided");
    }
    //promisify make function(jwt.verify) return a promise so we can
    //const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //console.log(decoded);
    const user = await User.findById(decoded.id);
    if (!user) {
      throw new Error("please signup or login");
    }
    //console.log(user);
    if (!user.active) {
      throw new Error(
        "you are not active yet please check your email to verify it"
      );
    }
    //console.log(user);
    req.user = user;
    //req.token = token;
  } catch (error) {
    res.status(401).send({ error: error.message });
    return;
  }
  next();
};

exports.signUp = async (req, res) => {
  //create user
  try {
    // const newUser = await User.create({
    //   name: req.body.name,
    //   email: req.body.email,
    //   password: req.body.password,
    //   passwordConfirm: req.body.passwordConfirm,
    //   photo: req.body.photo || "default-user.jpg",
    //   //age,photo
    // });
    const newUser = await User.create(req.body);
    //create token

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
    //console.log(token);
    // token for browser
    // const cookieOptions = {
    //   expires: new Date(
    //     Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    //   ),
    //   secure: true,
    //   httpOnly: true,
    //   SameSite: "None",
    // };

    // res.cookie("jwt", token, cookieOptions); //jwt name of cookie, (token)  we send to cookie of browser
    newUser.password = undefined;
    //send the token

    //console.log(url);
    const url = `${req.protocol}s://${req.get(
      "host"
    )}/api/users/activatTheUserAccount/${token}`;
    sendWelcomeEmail(newUser.email, newUser.name, url);
    res.status(201).json({
      token,
      message: "please check your email",
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.logIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("please provide email and password");
    }
    //the output of (await User.findOne({ email }) not contain the password cuz in model we put (select :false) in password so we write +password to add it to user obj
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      throw new Error("unable to login");
    }
    //console.log(user);
    //now the user have password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("unable to login");
    }
    //console.log(isMatch);
    //create token
    const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    // token for browser
    const cookieOptions = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      secure: true,
      httpOnly: true,
      SameSite: "None", //Allows the cookie to be sent with requests initiated by third-party websites, which is required for cross-site requests.
    };

    res.cookie("jwt", token, cookieOptions); //jwt name of cookie, (token)  we send to cookie of browser
    user.password = undefined; //remove password from output
    //send token
    if (user.active === false) {
      //   const url = `${req.protocol}://${req.get(
      //     "host"
      //   )}/api/users/activatTheUserAccount/${token}`;
      //   sendWelcomeEmail(user.email, user.name, url);
      throw new Error("please check your email to Activate your account,");
    }
    res.status(200).json({
      status: "success",
      token,
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.logout = async (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: "success" });
  // try {
  //   const user = await User.findById(req.user._id);
  //   if (!user) {
  //     throw new Error("please signup or login");
  //   }
  //   user.active = false;
  //   await user.save({ validateBeforeSave: false });
  //   res.status(200).json({ status: "success" });
  //   //console.log(user);
  // } catch (error) {
  //   res.status(401).send({ error: error.message });
  // }
};
exports.upDateUserPassword = async (req, res) => {
  try {
    const { email } = req.user;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      throw new Error("invalid user ");
    }

    //now the user have password
    const isMatch = await bcrypt.compare(
      req.body.currentPassword,
      user.password
    );
    if (!isMatch) {
      throw new Error("unable to login");
    }
    //console.log(isMatch);
    //create token
    user.password = req.body.newPassword;
    user.passwordConfirm = req.body.passwordConfirm;
    await user.save();
    const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    // token for browser
    const cookieOptions = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      secure: true, //cookie sent only with encrypted connection https
      httpOnly: true, // mean browser just save cookie without been able to edit or access
    };
    //   if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

    res.cookie("jwt", token, cookieOptions); //jwt name of cookie, (token)  we send to cookie of browser
    //send token
    user.password = undefined; //remove password from output
    res.status(200).json({
      status: "success",
      token,
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
