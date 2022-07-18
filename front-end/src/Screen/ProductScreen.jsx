import React, { useEffect, useReducer } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Rating from "../Components/Rating";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import { Helmet } from "react-helmet-async";
import LoadingBox from "../Components/LoadingBox";
import MessageBox from "../Components/MessageBox";
import ErrorMessage from "../Components/ErrorMessage";
import { useContext } from "react";
import { Store } from "./Store";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true }; //keep the previous value and only update loading to true
    case "FETCH_SUCCESS":
      return { ...state, product: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

const ProductScreen = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { slug } = params;

  const initialstate = {
    product: [],
    loading: true,
    error: "",
  };
  const [{ loading, error, product }, dispatch] = useReducer(
    reducer,
    initialstate
  );
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get(`/api/products/slug/${slug}`);
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: ErrorMessage(error) });
      }
    };
    fetchData();
  }, [slug]);
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;
  const addToCartHandler = async () => {
    const existItem = cart.cartItem.find((x) => x._id === product._id);
    console.log(cart.cartItem);
    console.log(existItem);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    console.log(quantity);
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countinstock < quantity) {
      window.alert("Sorry, Product is out of Stock");
      return;
    }
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: {
        ...product,
        quantity,
      },
    });
    navigate("/cart");
  };

  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant='danger'>{error}</MessageBox>
  ) : (
    <div>
      <Row>
        <Col md={6}>
          <img
            className='img-large'
            style={{ width: "500px" }}
            src={product.image}
            alt={product.name}
          />
        </Col>
        <Col md={3}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <Helmet>
                <title>{product.name}</title>
              </Helmet>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                Rating={product.rating}
                numReviews={product.numReviews}
              ></Rating>
            </ListGroup.Item>
            <ListGroup.Item>Price : ${product.price}</ListGroup.Item>
            <ListGroup.Item>
              Description:
              <p>{product.description}</p>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>Price :</Col>
                    <Col>${product.price}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countinstock > 0 ? (
                        <Badge bg='success'>In Stock</Badge>
                      ) : (
                        <Badge bg='danger'>Unavailable</Badge>
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>

                {product.countinstock > 0 && (
                  <ListGroup.Item>
                    <div className='d-grid'>
                      <Button onClick={addToCartHandler} variant='primary'>
                        Add to Cart
                      </Button>
                    </div>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col md='4'></Col>
      </Row>
    </div>
  );
};

export default ProductScreen;
