import { FirebaseError } from "firebase/app";
import { useState, useMemo } from "react";
import { Button, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FirestoreErrors } from "../../../firebase/types";
import { ProductElement, Product } from "../models/Product";
import { TableList } from "./";

export const ProductList = () => {
  const [products, setProducts] = useState<ProductElement[]>([]);

  const navigate = useNavigate();

  const traerProductos = async () => {
    console.log("get products");
    try {
      const productList = await Product.findAll();
      setProducts(productList);
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        console.log(FirestoreErrors[error.code]);
      } else {
        console.log("Error generico");
      }
    }
  };

  useMemo(() => traerProductos(), []);

  const handleCreate = () => {
    navigate("/admin/create");
  };

  const handleEdit = (id: string) => {
    navigate(`/admin/edit/${id}`);
  };

  const handleDelete = async (id: string) => {
    try {
      await Product.destroy(id);
      console.log("product delete: ", id);
      setProducts(products.filter((item) => item.id !== id));
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        console.log(FirestoreErrors[error.code]);
      } else {
        console.log("Error generico");
      }
    }
  };

  return (
    <div className="mt-5">
      <Button className="mb-2" variant="success" onClick={handleCreate}>
        Create
      </Button>

      {products ? (
        <TableList
          products={products}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      ) : (
        <h5>No hay productos</h5>
      )}
    </div>
  );
};
