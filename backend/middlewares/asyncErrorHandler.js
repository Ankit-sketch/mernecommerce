// const asyncErrorHandler = (req, res, next) => {
//   Promise.resolve(asyncErrorHandler(req, res, next)).catch(next);
// };

// module.exports = asyncErrorHandler;

const asyncErrorHandler = (fn) => (req, res, next) => {
  return Promise.resolve(fn(req, res, next)).catch(next);
};
module.exports = asyncErrorHandler;