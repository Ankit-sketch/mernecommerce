const Product = require("../models/productModel");
const customErrorhandler = require("../utils/customErrorhandler");
const asyncErrorHandler = require("../middlewares/asyncErrorHandler");
const ApiFeatures = require("../utils/apiFeature");
//create a product
exports.createProduct = asyncErrorHandler(async (req, res, next) => {
  req.body.user = req.user._id;
  const product = await Product.create(req.body);
  res.status(200).json({ success: true, product });
});

//Getting single product
exports.getSingleProduct = asyncErrorHandler(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(customErrorhandler.notFound("Product not found1"));
    // return next(error);
  }
  res.status(200).json({ success: true, product });
});

//Getting all products
exports.getAllProducts = asyncErrorHandler(async (req, res, next) => {
  // const products = await Product.find();
  const resultPerpage = 8;
  const productCount = await Product.countDocuments();
  const apiFeatures = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerpage);
  const products = await apiFeatures.query;
  res.status(200).json({ success: "true", products, productCount });
});

//edit or update a product
exports.updateProduct = asyncErrorHandler(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(customErrorhandler.notFound("Product not found"));
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json({ success: true, product });
});

//delete a product
exports.deleteProduct = asyncErrorHandler(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(customErrorhandler.notFound("Product not found"));
  }
  await product.remove();
  res
    .status(200)
    .json({ success: true, message: "Product deleted successfully" });
});

//create new review or update the review
exports.createProductReview = asyncErrorHandler(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };
  const product = await Product.findById(productId);
  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );
  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString()) {
        rev.rating = rating;
        rev.comment = comment;
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }
  let avg = 0;
  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });
  product.ratings = avg / product.reviews.length;
  await product.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

//get all reviews of single product
exports.getProductReviews = asyncErrorHandler(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  if (!product) {
    return next(customErrorhandler.notFound("Product not found1"));
    // return next(error);
  }
  res.status(200).json({
    success: true,
    reviews : product.reviews,
  });
});

//Delete reviews 
exports.deleteProductReview = asyncErrorHandler(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  if (!product) {
    return next(customErrorhandler.notFound("Product not found1"));
    // return next(error);
  }
  const reviews = product.reviews.filter(rev => rev._id.toString() !== req.query.reviewId.toString());

  let avg = 0;
  reviews.forEach((rev) => {
    avg += rev.rating;
  });
  let ratings
  if(avg == 0){
    ratings = 0
  }
  else{
    const ratings = avg / reviews.length;
  }

const numOfReviews = reviews.length;
await Product.findByIdAndUpdate(req.query.productId, {
  reviews,
  ratings,  
  numOfReviews
},
{
  new : true,
  runValidators : true,
  useFindAndModify : false,
})
  res.status(200).json({
    success: true,
    reviews : product.reviews,
  });
});