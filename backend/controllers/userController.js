const User = require("../models/userModal");
const customErrorhandler = require("../utils/customErrorhandler");
const asyncErrorHandler = require("../middlewares/asyncErrorHandler");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
var cloudinary = require("cloudinary").v2;

exports.createUser = asyncErrorHandler(async (req, res, next) => {
  const myCloud = await cloudinary.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 150,
    crop: "scale",
  });
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });
  //JWT Token
  sendToken(user, 201, res);
  //   const token = user.getJWTToken();
  //   res.status(201).json({
  //     success: true,
  //     user,
  //     token,
  //   });
});

exports.loginUser = asyncErrorHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(customErrorhandler.badUser("Username or Password is Invalid"));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(customErrorhandler.badUser("Username or Password is Invalid"));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(customErrorhandler.badUser("Username or Password is Invalid"));
  }
  //JWT Token
  sendToken(user, 200, res);
});

exports.logoutUser = asyncErrorHandler(async (req, res, next) => {
  res
    .cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .status(200)
    .json({
      success: true,
      message: "Logged Out",
    });
});

//Forgot Password
exports.forgotPassword = asyncErrorHandler(async (req, res, next) => {
  const user = await User.findOne({
    email: req.body.email,
  });
  if (!user) {
    return next(customErrorhandler.notFound("User not found"));
  }
  //get reset token
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });
  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`;
  const message = `Your password  reset token is : \n\n ${resetPasswordUrl} `;
  try {
    await sendEmail({
      email: user.email,
      subject: `Email Password Recovery`,
      message: message,
    });
    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
      resetPasswordUrl,
    });
  } catch (error) {
    user.resetpasswordToken = undefined;
    user.resetpasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(customErrorhandler.emailSentError(error.message, 500));
  }
});

//resetting Password
exports.resetpassword = asyncErrorHandler(async (req, res, next) => {
  const resetpasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await User.findOne({
    resetpasswordToken,
    resetpasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(
      customErrorhandler.notFound(
        "Reset password token is invalid or has been expired"
      )
    );
  }
  if (req.body.password !== req.body.confirmpassword) {
    return next(customErrorhandler.badUser("Password do not match"));
  }
  user.password = req.body.password;
  user.resetpasswordToken = undefined;
  user.resetpasswordExpire = undefined;
  await user.save();
  sendToken(user, 200, res);
});

//getting user details
exports.getUserDetails = asyncErrorHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
});

//update USER Password
exports.updatePassword = asyncErrorHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");
  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
  if (!isPasswordMatched) {
    return next(customErrorhandler.badUser("old Password is Invalid"));
  }
  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(customErrorhandler.badUser("Password do not match"));
  }
  user.password = req.body.newPassword;
  await user.save();
  sendToken(user, 200, res);
});

//update USER profile
exports.updateProfile = asyncErrorHandler(async (req, res, next) => {
  const newUserdata = {
    name: req.body.name,
    email: req.body.email,
  };
  const user = await User.findByIdAndUpdate(req.user.id, newUserdata, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
  });
});

//get ALL USERS(admin)
exports.getAllUsers = asyncErrorHandler(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    users,
  });
});

//get single USERS(admin)
exports.getSingleUser = asyncErrorHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(customErrorhandler.usernotfound("User does not exist"));
  }
  res.status(200).json({
    success: true,
    user,
  });
});

//update USER role ---admin
exports.updateRole = asyncErrorHandler(async (req, res, next) => {
  const isuserexist = await User.findById(req.params.id);
  if (!isuserexist) {
    return next(customErrorhandler.usernotfound("User does not exist"));
  }
  const newUserdata = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };
  const user = await User.findByIdAndUpdate(req.params.id, newUserdata, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
  });
});

//delete USER profile  ----admin
exports.deleteUser = asyncErrorHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(customErrorhandler.usernotfound("User does not exist"));
  }
  await user.remove();
  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});
