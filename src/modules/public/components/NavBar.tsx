import React from "react";
import { Link } from "react-router-dom";

import { GiPlainCircle } from "react-icons/gi";

import { Navbar, Container } from "react-bootstrap";

export const NavBar = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
            Marsloy {""}
            <span className="text-success">Live</span>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              log in as:{" "}
              <Link className="text-decoration-none" to="/auth">
                admin
              </Link>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
