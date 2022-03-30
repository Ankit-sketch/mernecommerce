const customErrorhandler = require("../utils/customErrorhandler");

const errorHandler = (err, req, res, next) => {
  let statuscode = 500;
  let data = {
    success: false,
    mesage: "internal server error",
    ...(process.env.DEV_MODE == "true" && {
      original_error_try_catch: err.message,
    }),
  };
  if (err instanceof customErrorhandler) {
    statuscode = err.status;
    data = {
      success: false,
      mesage: err.message,
      ...(process.env.DEV_MODE == "true" && { ERROR_STACK: err.stack }),
    };
  }
 // Mongodb duplicate key error
//  if (err.code === 11000) {
// data = {
//   success: false,
//   mesage: `Duplicate ${Object.keys(err.keyvalue)} Entered`,
//   ...(process.env.DEV_MODE == "true" && { ERROR_STACK : err.stack }),
// }; 
// } 
 // JSONWEBTOKEN duplicate key error
 if (err.name === "JsonWebTokenError") {
  data = {
    success: false,
    mesage: `Token is invalid Please, Try again`,
    ...(process.env.DEV_MODE == "true" && { ERROR_STACK : err.stack }),
  }; 
  } 
   // JSONWEBTOKEN expiremerror
 if (err.name === "TokenExpireError") {
  data = {
    success: false,
    mesage: `Token is Expired Please, Try again`,
    ...(process.env.DEV_MODE == "true" && { ERROR_STACK : err.stack }),
  }; 
  } 
  // Mongodb cast error
  if (err.name === "CastError") {
    data = {
      success: false,
      mesage: `Resourse not found. Invalid : ${err.path}`,
      ...(process.env.DEV_MODE == "true" && { ERROR_STACK : err.stack }),
    };
  }
  res.status(statuscode).json(data);
};
module.exports = errorHandler;