import { useRef, useState } from "react";

import { FirebaseError } from "firebase/app";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { signInEmailAndPassword } from "../../../firebase/helpers/auth";
import { schemaLogin } from "../validations";
import { AuthCredentials, AuthErrors } from "../types";
import { Button, Container, Row, Col, Form, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

export const LoginPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AuthCredentials>({
    resolver: yupResolver(schemaLogin),
  });

  const onSubmit: SubmitHandler<AuthCredentials> = (data) => {
    handleLogin(data);
    reset();
  };

  const handleLogin = async (data: AuthCredentials) => {
    try {
      setLoading(true);
      await signInEmailAndPassword(data);
      setLoading(false);
      console.log("Login Process Ok");
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        setError(AuthErrors[error.code]);
      } else {
        setError("Error generico");
      }
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>Login To Admin</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <Button variant="warning">
                <Link
                  type="button"
                  className="text-decoration-none text-dark"
                  to="/"
                >
                  Go back
                </Link>
              </Button>{" "}
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="animate__animated animate__fadeInLeft mt-5">
        <Row>
          <Col></Col>
          <Col xs={12} sm={6} md={8} lg={6}>
            <p>
              {loading ? "Realizando autenticación espere..." : ""} {error}
            </p>

            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="password"
                  id="login_email"
                  {...register("email")}
                  placeholder="Email"
                  autoComplete="off"
                />
                <Form.Text className="text-muted">
                  {errors.email && <p>{errors.email.message}</p>}
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  id="login_password"
                  {...register("password")}
                  placeholder="Password"
                  autoComplete="off"
                />
                <Form.Text className="text-muted">
                  {errors.password && <p>{errors.password.message}</p>}
                </Form.Text>
              </Form.Group>

              <Button variant="primary" disabled={loading} type="submit">
                Login
              </Button>
            </Form>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </>
  );
};
