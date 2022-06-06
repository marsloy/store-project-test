import { useState, useMemo } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { FirebaseError } from "firebase/app";

import { Attributes, Product, ProductElement } from "../models";
import { FirestoreErrors } from "../../../firebase/types";
import { FormContainer } from "../components";

import { Button, Container, Navbar } from "react-bootstrap";

export const EditPage = () => {
  const [error, setError] = useState<string>();
  const [product, setProduct] = useState<ProductElement>();

  const navigate = useNavigate();
  const { productId } = useParams();

  if (!productId) {
    return <Navigate to="/admin/dashboard" />;
  }

  const getProduct = async () => {
    console.log("get simple product");
    try {
      const productElement = await Product.find(productId);
      if (!productElement.name) {
        navigate("/admin/dashboard");
      } else {
        setProduct(productElement);
      }
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        console.log(FirestoreErrors[error.code]);
      } else {
        console.log("Error generico");
      }
      navigate("/admin/dashboard");
    }
  };

  useMemo(() => getProduct(), [productId]);

  const handleEdit = async (data: Attributes) => {
    try {
      await Product.update(productId, data);
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
            Edit To: {""}
            <span className="text-success">{product?.name}</span>
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
        <FormContainer handleForm={handleEdit} formValues={product} />
      </Container>
    </>
  );
};
