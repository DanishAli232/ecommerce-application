import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Rating from "./Rating";
import axios from "axios";
import { Store } from "../Screen/Store";

const Product = (props) => {
  const { product } = props;
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItem },
  } = state;

  const AddtoCartHandler = async (item) => {
    const existItem = cartItem.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countinstock < quantity) {
      window.alert("Sorry, Product is out of Stock");
      return;
    }
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: {
        ...item,
        quantity,
      },
    });
  };
  return (
    <Card>
      <Link to={`/product/${product.slug}`}>
        <img
          src={product.image}
          style={{ height: "180px" }}
          className='card-img-top'
          alt={product.name}
        />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating Rating={product.rating} numReviews={product.numReviews} />
        <Card.Text>${product.price}</Card.Text>
        {product.countinstock === 0 ? (
          <Button variant='primary' disabled>
            Out of Stock
          </Button>
        ) : (
          <Button onClick={() => AddtoCartHandler(product)}>Add to Cart</Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default Product;
