import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/all";
import "./Home.css";
import ProductCard from "../ProductCard/ProductCard.js";
import { useDispatch, useSelector } from "react-redux";
import Metadata from "../layout/metadata";
import { getProducts } from "../../actions/productAction";
import { useAlert } from "react-alert";
import Loader from "../layout/Loader/Loader";
// const product = {
//   _id: 1,
//   name: "this is first product",
//   price: 500,
//   image: [
//     { url: "https://m.media-amazon.com/images/I/61effnJNSsS._UL1500_.jpg" },
//   ],
// };
// console.log()
const Home = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
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
          <Metadata title="ECOMMERCE" />
          <div className="banner">
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>
            <a href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>
          <h2 className="homeHeading">Featured Products</h2>
          <div className="container" id="container">
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

export default Home;
