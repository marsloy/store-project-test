import { FC } from "react";
import { Button, Table } from "react-bootstrap";
import { ProductElement } from "../models";

interface Props {
  products: ProductElement[];
  handleEdit: (id: string) => void;
  handleDelete: (id: string) => void;
}

export const TableList: FC<Props> = ({
  products,
  handleEdit,
  handleDelete,
}) => {
  return (
    <Table responsive variant="dark">
      <thead>
        <tr>
          <th>Name</th>
          <th>Link</th>
          <th>...</th>
          <th>...</th>
        </tr>
      </thead>
      <tbody>
        {products.map((item) => {
          return (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.urlBtnVer}</td>

              <td>
                <Button variant="info" onClick={() => handleEdit(item.id)}>
                  Edit
                </Button>
              </td>
              <td>
                <Button variant="danger" onClick={() => handleDelete(item.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};
