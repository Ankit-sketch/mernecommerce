const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct,
  createProductReview,
  getProductReviews,
  deleteProductReview,
} = require("../controllers/productController");
const { isAuthenticated, authorizeRoles } = require("../middlewares/auth");
const router = express.Router();

router
  .route("/admin/createproduct/new")
  .post(isAuthenticated, authorizeRoles("admin"), createProduct);

router.route("/allproducts").get( getAllProducts);

router
  .route("/admin/product/:id")
  .put(isAuthenticated, authorizeRoles("admin"), updateProduct)
  .delete(isAuthenticated, authorizeRoles("admin"), deleteProduct);

router.route("/product/:id").get(isAuthenticated, getSingleProduct);

router.route("/review").put(isAuthenticated, createProductReview);

router.route("/reviews").get(getProductReviews).delete(isAuthenticated, deleteProductReview);


module.exports = router; //exported as default
