const customErrorhandler = require("../utils/customErrorhandler");
const asyncErrorHandler = require("./asyncErrorHandler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModal");

exports.isAuthenticated = asyncErrorHandler(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(customErrorhandler.unauthenticate("Please login"));
  }
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decodedData.id);
  next();
});
exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        customErrorhandler.notAdmin(
          `Role with ${req.user.role} is not allowed to access this resource`
        )
      );
    }
    next();
  };
};
