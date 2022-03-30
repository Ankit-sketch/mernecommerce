import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/all";
import "./Home.css";
import ProductCard from "../ProductCard/ProductCard.js";
import { useDispatch, useSelector } from "react-redux";
import Metadata from "../layout/metadata";
import { getProducts } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
// const product = {
//   _id: 1,
//   name: "this is first product",
//   price: 500,
//   image: [
//     { url: "https://m.media-amazon.com/images/I/61effnJNSsS._UL1500_.jpg" },
//   ],
// };
const Home = () => {
  const dispatch = useDispatch();
  useSelector((state) => console.log("state", state));
  console.log("gtgtgt", useSelector((state) => state.productReducer))
  const { loading, products, productcount } = useSelector((state) => state.productReducer);
  useEffect(() => {
    console.log("called")
    dispatch(getProducts());
    console.log("called2")
  }, [dispatch]);
  return (
    <>
      {loading ? (<Loader />) : (<><Metadata title="ECOMMERCE" />
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
          {/* {products?.length != 0 ? <ProductCard product={products} /> : null} */}
          {products && products.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </>)
      }
    </>
  );
};

export default Home;
