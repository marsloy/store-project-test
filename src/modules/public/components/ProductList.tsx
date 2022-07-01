import { FirebaseError } from "firebase/app";
import { useState, useMemo, useEffect } from "react";
import { FirestoreErrors } from "../../../firebase/types";
import { Product, ProductElement } from "../../admin/models";
import { CardCustom } from "./CardCustom";

import {
  Container,
  Row,
  Col,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";

export const ProductList = () => {
  const [products, setProducts] = useState<ProductElement[]>([]);
  const [search, setSearch] = useState<ProductElement[]>([]);

  const getProducts = async () => {
    console.log("get products");
    try {
      const productList = await Product.findAll();
      setProducts(productList);
      setSearch(productList);
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        console.log(FirestoreErrors[error.code]);
      } else {
        console.log("Error generico");
      }
    }
  };

  const handleChange = (e: any) => {
    const searchItem = e.target.value;
    if (searchItem) {
      const result = products.filter((item) =>
        item.name.toString().toLowerCase().includes(searchItem.toLowerCase())
      );
      setSearch(result);
    } else {
      setSearch(products);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <Container className="mt-5">
        <Row>
          <Col></Col>
          <Col xs={8} sm={6} md={4} lg={3}>
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search name"
                className="me-2 shadow-lg bg-light"
                aria-label="Search"
                onChange={handleChange}
              />
            </Form>
          </Col>
          <Col></Col>
        </Row>
      </Container>
      <div className="my-5 mx-4">
        <Row>
          {search.map((item) => (
            <Col xs={12} sm={6} md={4} lg={3} key={item.id}>
              <CardCustom product={item} />
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};
