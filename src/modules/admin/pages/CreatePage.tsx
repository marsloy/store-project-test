import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { Attributes, Product } from "../models";
import { FirestoreErrors } from "../../../firebase/types";
import { FormContainer } from "../components";
import { Button, Container, Navbar } from "react-bootstrap";

export const CreatePage = () => {
  const [error, setError] = useState<string>();
  const navigate = useNavigate();

  const handleCreate = async (data: Attributes) => {
    try {
      await Product.create(data);
      navigate("/admin/dashboard");
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        setError(FirestoreErrors[error.code]);
      } else {
        setError("Error generico");
      }
    }
  };

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
            New {""}
            <span className="text-success">Profile</span>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <Button variant="warning">
                <Link
                  type="button"
                  className="text-decoration-none text-dark"
                  to="/admin"
                >
                  Go back
                </Link>
              </Button>{" "}
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="animate__animated animate__fadeIn mt-5">
        <p>{error}</p>
        <FormContainer handleForm={handleCreate} />
      </Container>
    </>
  );
};
