import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router";
import { FaShoppingCart, FaUser } from "react-icons/fa";

function Header() {
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand as={Link} to="/">Himalayanshop</Navbar.Brand>

                <Nav>
                    <Nav.Link as={Link} to="/cart">
                        <FaShoppingCart /> Cart
                    </Nav.Link>
                    <Nav.Link as={Link} to="/login">
                        <FaUser /> Login
                    </Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default Header;
