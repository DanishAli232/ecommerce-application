import React, { useContext } from "react";
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";

import Row from "react-bootstrap/esm/Row";
import ListGroup from "react-bootstrap/ListGroup";
import { Helmet } from "react-helmet-async";
import { Link, Navigate, useNavigate } from "react-router-dom";
import MessageBox from "../Components/MessageBox";
import { Store } from "./Store";
import Card from "react-bootstrap/Card";
import axios from "axios";

const Cartscreen = () => {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItem },
  } = state;

  const updateCartHandler = async (item, quantity) => {
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

  const removeItemHandler = (item) => {
    ctxDispatch({
      type: "CART_REMOVE_ITEM",
      payload: item,
    });
  };
  const checkoutHandler = () => {
    navigate("/signin?redirect=/shipping");
  };
  return (
    <div>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <h1>Shopping Cart</h1>
      <Row>
        <Col md={8}>
          {cartItem.length === 0 ? (
            <MessageBox>
              Cart is empty. <Link to='/'>Go Shpping</Link>
            </MessageBox>
          ) : (
            <ListGroup>
              {cartItem.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row className='align-items-center'>
                    <Col md={4}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className='img-fluid rounded img-thumbnail'
                      />{" "}
                      <Link
                        style={{ fontSize: "13px" }}
                        to={`/product/${item.slug}`}
                      >
                        {item.name}
                      </Link>
                    </Col>
                    <Col md={3}>
                      <Button
                        variant='Light'
                        disabled={item.quantity === 1}
                        onClick={() =>
                          updateCartHandler(item, item.quantity - 1)
                        }
                      >
                        <i className='bi bi-dash-circle-fill'></i>
                      </Button>{" "}
                      <span>{item.quantity}</span>{" "}
                      <Button
                        variant='Light'
                        disabled={item.quantity === item.countinstock}
                        onClick={() =>
                          updateCartHandler(item, item.quantity + 1)
                        }
                      >
                        <i className='bi bi-plus-circle-fill'></i>
                      </Button>
                    </Col>
                    <Col md={3}>${item.price}</Col>
                    <Col md={2}>
                      <Button
                        variant='Light'
                        onClick={() => removeItemHandler(item)}
                      >
                        <i
                          style={{ color: "red" }}
                          className='bi bi-trash-fill'
                        ></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>
                    Subtotal({cartItem.reduce((a, c) => a + c.quantity, 0)}{" "}
                    items): $
                    {cartItem.reduce((a, c) => a + c.price * c.quantity, 0)}
                  </h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className='d-grid'>
                    <Button
                      onClick={checkoutHandler}
                      type='button'
                      variant='primary'
                      disabled={cartItem.length === 0}
                    >
                      Proceed to Checkout
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Cartscreen;
