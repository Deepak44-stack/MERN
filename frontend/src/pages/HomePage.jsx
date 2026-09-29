import { useState, useEffect } from "react";
import Product from "../components/Product";
import { Container,Row, Col } from "react-bootstrap";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    loadProducts();
  }, []);

  
  
  return (
    <Container>
      <h2>Latest Products</h2>

      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
  