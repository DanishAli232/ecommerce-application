import "app.css";
import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Homescreen1 from "./Screens/Homescreen1";

const App = () => {
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
                <Link to='/' className='Nav-link'>
                  Cart
                </Link>
              </Nav>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container className='mt-3'>
            <Routes>
              <Route path='/' element={<Homescreen1 />} />
            </Routes>
          </Container>
        </main>
        <footer>
          <div className='text-center'>All right reserved</div>
        </footer>
      </div>
    </BrowserRouter>
  );
};

export default App;
