import { FC } from "react";
import { ProductElement } from "../../admin/models";
import { Card, Button, Accordion } from "react-bootstrap";
///
interface Props {
  product: ProductElement;
}

export const CardCustom: FC<Props> = ({ product }) => {
  return (
    <Card
      className="
      d-flex
      align-items-center
      justify-content-center 
      border-0
      mb-5
      shadow-lg  bg-white rounded
      animate__animated animate__fadeIn
      "
    >
      <img
        className="rounded-circle shadow mt-2 rounded"
        style={{ width: "12rem" }}
        src={product.urlImg}
        alt={product.name}
      />
      <Card.Body className="text-center">
        <Card.Title>@{product.name}</Card.Title>
        <Accordion className="mb-2" defaultActiveKey="0">
          <Accordion.Item eventKey="1">
            <Accordion.Header>Description...</Accordion.Header>
            <Accordion.Body>
              <Card.Text>{product.description}</Card.Text>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        <Button target="_blank" href={product.urlBtnVer} variant="danger">
          View Profile
        </Button>
      </Card.Body>
    </Card>
  );
};
