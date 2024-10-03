const express = require("express");
const authController = require("../../controllers/authController");
const userController = require("../../controllers/userController");
const router = express.Router();

router.post("/signup", authController.signUp);
router.post("/login", authController.logIn);
// router.post("/logout", authController.prtotectedRouter, authController.logout);
router.post(
  "/activatTheUserAccount/:activat",
  authController.activatTheUserAccount
);
router.patch(
  "/updateMyPassword",
  authController.prtotectedRouter,
  authController.upDateUserPassword
);
router.get(
  "/userProfile",
  authController.prtotectedRouter,
  userController.getUserProfile
);
router.delete(
  "/deleteUser",
  authController.prtotectedRouter,
  userController.deleteUserProfile
);
router.patch(
  "/updateUser",
  authController.prtotectedRouter,
  userController.updateUserProfile
);
router.post(
  "/uploadUserPhoto",
  authController.prtotectedRouter,
  userController.uploadUserPhoto,
  userController.resizeUserPhotoAndSave,
  userController.errorUploadPhoto
);
router.delete(
  "/deleteUserPhoto",
  authController.prtotectedRouter,
  userController.deleteUserPhoto
);
router.get(
  "/getUserPhoto",
  authController.prtotectedRouter,
  userController.getUserPhoto
);
router.use(authController.prtotectedRouter);
router.use(authController.restrictTo);
router.get("/allUsersByAdmin", userController.getAllUsersByAdmin);
router.delete("/deleteUserByAdmin/:id", userController.deleteUserByAdmin);
router.get("/findUserByAdmin/:id", userController.findUserByAdmin);
module.exports = router;
