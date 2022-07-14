import { FC } from "react";
import { ProductElement } from "../../admin/models";
import { Card, Button, Accordion } from "react-bootstrap";
import { Link } from "react-router-dom";
///
interface Props {
  product: ProductElement;
}

export const CardCustom: FC<Props> = ({ product }) => {
  return (
    <Card
      className=" 
      mb-4
      effect
      shadow-sm
       border-0
      bg-white  
      animate__animated animate__fadeIn
    "
    >
      <Link to="/">
        <div className="div1">
          <div className="img">
            <Card.Img variant="top" src={product.urlImg} />
          </div>
          <div className="div2">
            <Card.Img variant="top" src={product.urlImg2} />
          </div>
        </div>
      </Link>

      <Card.Body>
        <Link className="text-decoration-none" to="/">
          <Card.Title className="fs-6 mb-0 text-name">
            {product.name}
          </Card.Title>
        </Link>
        <Card.Text className="fs-6 descrit animate__animated animate__fadeIn pt-2 pb-0 mb-0">
          <b>$</b>
          {product.price}
        </Card.Text>
        <div className="link animate__animated animate__fadeIn fs-6 pt-2">
          <Link to={`/product/${product.id}`}>
            <span>Show more</span>
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
};
