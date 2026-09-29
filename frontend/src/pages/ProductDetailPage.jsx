
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { Row, Col, Image, ListGroup, Button,Form } from "react-bootstrap";
import Rating from "../components/Ratings";

function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    const fetchProductById = async () => {
      try {
        const response = await fetch(`/api/products/${id}`);

        if (!response.ok) {
          throw new Error("Product could not be loaded");
        }

        setProduct(await response.json());
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchProductById();
  }, [id]);
  return (
    <>
      <Link to="/" className="btn btn-light my-2">
        Go Back
      </Link>
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h4>{product.name}</h4>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating value={product.rating || 0} text={product.numReviews} />
            </ListGroup.Item>
            <ListGroup.Item>${product.price}</ListGroup.Item>
            <ListGroup.Item>{product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <ListGroup>
            <ListGroup.Item>
              <Row>
                <Col>Price:</Col>
                <Col>
                  <strong>${product.price}</strong>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Status:</Col>
                <Col>
                  <strong>
                    {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                  </strong>
                </Col>
              </Row>
            </ListGroup.Item>
           {product.countInStock !== 0 && (
    <ListGroup.Item>
        <Row>
            <Col>Qty</Col>
            <Col>
              <Form.Select>
              {
                [...Array(product.countInStock).keys()].map((x) => (
                  <option key={x + 1 } >  {x + 1}
                  </option>
                ))
              }
              </Form.Select>
            </Col>
        </Row>
    </ListGroup.Item>
)}
            <ListGroup.Item>
              <Button variant="dark" disabled={!product.countInStock}>
                Add to Cart
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  );
}

export default ProductDetailPage;
