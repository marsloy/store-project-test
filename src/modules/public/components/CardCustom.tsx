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
      effect
    border-0
    bg-white  
    animate__animated animate__fadeIn
    "
    >
      <Card.Img variant="top" src={product.urlImg} />
      <Card.Body>
        <Card.Title className="text-secondary fs-6 mb-0">
          {product.name}
        </Card.Title>
        <Card.Text className="fs-6 descrit animate__animated animate__fadeIn pt-2 pb-0 mb-0">
          $30
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

/* 
{!user.logged ? (
                <Button
                  className="text-decoration-none my-0 py-0"
                  variant="link"
                  onClick={handleShow}
                >
                  <span className="fs-4 my-0 py-0 text-secondary">
                    <FaPowerOff />
                  </span>
                </Button>
              ) : (
                <Link
                  className="text-decoration-none text-light my-0 py-0"
                  to={"/admin"}
                >
                  <span className="fs-4 my-0 py-0 text-success">
                    <FaPowerOff />
                  </span>
                </Link>
              )}
*/
