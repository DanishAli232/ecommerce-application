import React, { useEffect } from "react";
import axios from "axios";
import { useReducer } from "react";
import logger from "use-reducer-logger";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Product from "../Components/Product";
import { Helmet } from "react-helmet-async";
import LoadingBox from "../Components/LoadingBox";
import MessageBox from "../Components/MessageBox";

// state = currentstate, action = that change the state and create a new state
const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true }; //keep the previous value and only update loading to true
    case "FETCH_SUCCESS":
      return { ...state, products: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

const HomeScreen = () => {
  const initialstate = {
    products: [],
    loading: true,
    error: "",
  };
  const [{ loading, error, products }, dispatch] = useReducer(
    logger(reducer),
    initialstate
  );
  // const [products, newproducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get("/api/products");
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
        // newproducts(result.data);
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: error.message });
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <Helmet>
        <title>HomeExplore</title>
      </Helmet>
      <h1>Feature Products</h1>
      <div className='products'>
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant='danger'>{error}</MessageBox>
        ) : (
          <Row>
            {products.map((product) => (
              <Col key={product.slug} sm={6} md={4} lg={3} className='mb-3'>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
};

export default HomeScreen;
