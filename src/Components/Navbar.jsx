import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import RBNavbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useCart } from '../context/CartContext';

function CartLink() {
	const { items } = useCart();
	const count = items.reduce((s, it) => s + it.qty, 0);
	return (
		<Nav.Link as={Link} to="/καλαθι" className="d-flex align-items-center">
			<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
				<path d="M0 1.5A.5.5 0 0 1 .5 1h1a.5.5 0 0 1 .485.379L2.89 5H14.5a.5.5 0 0 1 .49.598l-1.5 6A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L1.01 1.607 1 1.5H.5zM5 12a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm6 1a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
			</svg>
			<span className="badge bg-primary rounded-pill ms-2">{count}</span>
		</Nav.Link>
	);
}

const NavbarComponent = () => {
	return (
		<RBNavbar expand="lg" bg="white" variant="light" className="shadow-sm">
			<Container>
				<RBNavbar.Brand as={Link} to="/" className="d-flex align-items-center">
					<img
						src={`${process.env.PUBLIC_URL}/logo.png`}
						alt="logo"
						style={{ height: 80, width: 80, objectFit: 'contain' }}
						className="me-2"
					/>
				</RBNavbar.Brand>
				<RBNavbar.Toggle aria-controls="basic-navbar-nav" />
				<RBNavbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						<Nav.Link as={Link} to="/">ΑΡΧΙΚΗ</Nav.Link>
						<Nav.Link as={Link} to="/about">ΠΟΙΟΙ ΕΙΜΑΣΤΕ</Nav.Link>
						<Nav.Link as={Link} to="/προιοντα">ΠΡΟΙΟΝΤΑ</Nav.Link>
						<Nav.Link as={Link} to="/catering">CATERING</Nav.Link>
						<Nav.Link as={Link} to="/ωραριο-καταστηματος">ΩΡΑΡΙΟ ΚΑΤΑΣΤΗΜΑΤΟΣ</Nav.Link>
						<Nav.Link as={Link} to="/επικοινωνια">ΕΠΙΚΟΙΝΩΝΙΑ</Nav.Link>
					</Nav>
					{/* Right side: cart badge */}
					<Nav className="ms-auto">
						<CartLink />
					</Nav>
				</RBNavbar.Collapse>
			</Container>
		</RBNavbar>
	);
};

export default NavbarComponent;
