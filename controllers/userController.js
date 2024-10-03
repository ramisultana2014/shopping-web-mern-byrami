const User = require("../src/models/usersModel");

const multer = require("multer");
const sharp = require("sharp");
const Order = require("../src/models/orderModel");

exports.getUserProfile = async (req, res) => {
  const user = await User.findById(req.user.id).populate("userOrders");
  //befor populate we could put .select('name of fiels' or put - to exclude it like - name of field) thats for user, in populate("userOrders", 'name of filed')
  res.status(200).json({
    status: "success",
    data: {
      data: user,
    },
  });
};
exports.deleteUserProfile = async (req, res) => {
  try {
    const doc = await User.findByIdAndDelete(req.user._id);
    if (!doc) {
      throw new Error("no document to delete");
    }
    await Order.deleteMany({ userId: req.user._id }); //we go to Order Model and delete all documents match the field userId value
    res.status(204).json({
      status: "success",
      data: {
        data: null,
      },
    });
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
};
exports.updateUserProfile = async (req, res) => {
  try {
    //the id here is the obj id
    const user = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true, //will return the update doc
      runValidators: true,
    });
    //console.log(product);

    if (!user) {
      return res.status(404).json({
        status: "unable to update please try again",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

const upload = multer({
  limits: { filesize: 1000000 },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      // that is regular expression look at Regex101.com
      return cb(new Error("please upload a image "));
    }
    cb(undefined, true);
  },
});
exports.uploadUserPhoto = upload.single("userPhoto");
exports.resizeUserPhotoAndSave = async (req, res) => {
  if (!req.file)
    return res.status(500).json({
      status: "fail",
      message: "please upload photo",
    });

  const buffer = await sharp(req.file.buffer)
    .resize({ width: 250, height: 250 })
    .png()
    .toBuffer();
  const user = await User.findByIdAndUpdate(
    req.user._id,
    { userPhoto: buffer },
    {
      new: true, //will return the update doc
      runValidators: true,
    }
  );

  // await req.user.save();
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
};
exports.errorUploadPhoto = (error, req, res, next) => {
  res.status(400).send({ error: error.message });
};
exports.deleteUserPhoto = async (req, res) => {
  try {
    if (req.user.userPhoto) {
      const user = await User.findByIdAndUpdate(
        req.user._id,
        { userPhoto: null },
        {
          new: true, //will return the update doc
          runValidators: true,
        }
      );
    } else {
      throw new Error("No photo to delete");
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
exports.getUserPhoto = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user || !user.userPhoto) {
      throw new Error("you didnt upload any photo yet");
    }
    res.set("Content-Type", "image/png");
    res.send(user.userPhoto);
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};
exports.getAllUsersByAdmin = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: "success",
      results: users.length,
      data: {
        users,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};
exports.deleteUserByAdmin = async (req, res) => {
  try {
    //const task = await Task.findByIdAndDelete(req.params.id);
    const user = await User.findOneAndDelete({
      _id: req.params.id,
    });
    if (!user) {
      return res.status(404).json({
        status: "no user with that id",
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
exports.findUserByAdmin = async (req, res) => {
  try {
    //const task = await Task.findByIdAndDelete(req.params.id);
    const user = await User.findOne({
      _id: req.params.id,
    }).populate("userOrders");
    if (!user) {
      return res.status(404).json({
        status: "no user with that id",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};
