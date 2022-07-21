import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HomeScreen from "./Screen/HomeScreen";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductScreen from "./Screen/ProductScreen";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";
import Badge from "react-bootstrap/esm/Badge";
import NavDropdown from "react-bootstrap/esm/NavDropdown";
import { useContext } from "react";
import { Store } from "./Screen/Store";
import Cartscreen from "./Screen/cartscreen";
import SigninInScreen from "./Screen/SigninInScreen";
import ShippingAddressScreen from "./Screen/ShippingAddressScreen";
import SignupScreen from "./Screen/SignupScreen";
import PaymentMethodScreen from "./Screen/PaymentMethodScreen";
import PlaceOrderScreen from "./Screen/PlaceHolderScreen";

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
  };
  return (
    <BrowserRouter>
      <div className='d-flex flex-column site-container'>
        <ToastContainer position='bottom-center' limit={1} />
        <header>
          <Navbar bg='dark' variant='dark'>
            <Container>
              <LinkContainer to='/'>
                <Navbar.Brand>HomeExplore</Navbar.Brand>
              </LinkContainer>
              <Nav className='me-auto'>
                <Link to='/cart' className='nav-link'>
                  Cart
                  {cart.cartItem.length > 0 && (
                    <Badge pill bg='danger'>
                      {/* 0 is the default value here a is the accumulator and c is the current value */}
                      {cart.cartItem.reduce((a, c) => a + c.quantity, 0)}
                    </Badge>
                  )}
                </Link>
                {userInfo ? (
                  <NavDropdown title={userInfo.name} id='basic-nav-dropdown'>
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>User Profile</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/orderhistory'>
                      <NavDropdown.Item>Order History</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                    <Link
                      className='dropdown-item'
                      to='#signout'
                      onClick={signoutHandler}
                    >
                      Sign Out
                    </Link>
                  </NavDropdown>
                ) : (
                  <Link className='nav-link' to='/signin'>
                    Sign In
                  </Link>
                )}
              </Nav>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container className='mt-3'>
            <Routes>
              <Route path='/product/:slug' element={<ProductScreen />} />
              <Route path='/' element={<HomeScreen />} />
              <Route path='/cart' element={<Cartscreen />} />
              <Route path='/signin' element={<SigninInScreen />} />
              <Route path='/shipping' element={<ShippingAddressScreen />} />
              <Route path='/payment' element={<PaymentMethodScreen />}></Route>
              <Route path='/signup' element={<SignupScreen />} />
              <Route path='/placeorder' element={<PlaceOrderScreen />} />
            </Routes>
          </Container>
        </main>
        <footer>
          <div className='text-center'>All right reserved</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
