import React, { useEffect, useRef, useState } from "react";
import "./products.css";
import Loader from "../../components/layout/Loader/Loader";
import Metadata from "../../components/layout/metadata";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import FaceIcon from "@mui/icons-material/Face";
import { useDispatch, useSelector } from "react-redux";
import { userLogin, userRegister, clearErrors } from "../../actions/userAction";
import ProductCard from "../../components/ProductCard/ProductCard";
import { getProducts } from "../../actions/productAction";
const Products = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { loading, products, productcount, error } = useSelector(
    (state) => state.productReducer
  );
  useEffect(() => {
    if (error) {
      alert.error(error);
    }
    dispatch(getProducts());
  }, [dispatch, error]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Metadata title="PRODUCTS -- ECOMMERCE" />
          <h2 className="productsHeading">Products</h2>

          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
        </>
      )}
    </>
  );
};

export default Products;
