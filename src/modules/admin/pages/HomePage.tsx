import { useContext } from "react";
import { signOutFirebase } from "../../../firebase/helpers/auth";
import { AuthContext } from "../../auth/context/AuthContext";
import { ProductList } from "../components";

import { Button, Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

export const HomePage = () => {
  const user = useContext(AuthContext);

  const handleLogout = () => {
    signOutFirebase();
  };

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
            Profile {""}
            <span className="text-success">Manager</span>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <Button variant="warning">
                <Link
                  type="button"
                  className="text-decoration-none text-dark"
                  to="/"
                >
                  Preview
                </Link>
              </Button>{" "}
              <Button variant="secondary" type="button" onClick={handleLogout}>
                Log off
              </Button>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
        <ProductList />
      </Container>
    </>
  );
};
