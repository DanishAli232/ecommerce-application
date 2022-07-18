import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HomeScreen from "./Screen/HomeScreen";
import ProductScreen from "./Screen/ProductScreen";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";
import Badge from "react-bootstrap/esm/Badge";
import { useContext } from "react";
import { Store } from "./Screen/Store";
import Cartscreen from "./Screen/cartscreen";
import SigninInScreen from "./Screen/SigninInScreen";

function App() {
  const { state } = useContext(Store);
  const { cart } = state;
  return (
    <BrowserRouter>
      <div className='d-flex flex-column site-container'>
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
