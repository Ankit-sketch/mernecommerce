import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";
const ProductCard = ({ product }) => {
  // console.log("product", product);
  const options = {
    value: product.rating,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      <img src="/logo192.png" alt={product.name} />
      <p>{product.name}</p>
      <div>
        <Rating {...options} />
        <span className="productCardSpan">
          ({product.numOfReviews} Reviews)
        </span>
      </div>
      <span>{`₹${product.price}`}</span>
    </Link>
    //   <Link className="productCard" to = {`/product/${product._id}`}>
    //   <img src={product.image[0].url} alt={product.name} />
    //   <p>{product.name}</p>
    //   <div>
    //     {/* <Rating {...options} /> */}
    //     <span className="productCardSpan">
    //       ({product.numOfReviews} Reviews)
    //     </span>
    //   </div>
    //   <span>{`₹${product.price}`}</span>
    // </Link>
  );
};

export default ProductCard;
