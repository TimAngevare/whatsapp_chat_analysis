import { Link } from "react-router-dom";
import logo from "../../assets/logoFull.png";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

function Navigationbar() {
    return (
        <Navbar expand="lg" className="bg-body-tertiary" style={{borderRadius: 100, marginBottom: 50}}>
            <Container>
                <Navbar.Brand href="#home" style={{width: 255}}><img src={logo} style={{ width: '-webkit-fill-available'}}/></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto" style={{marginLeft: 'auto'}}>
                        <Nav.Link href="/" style={{color: '#7b41ff', fontWeight: 'bold'}}>Home</Nav.Link>
                        <Nav.Link href="/contact" style={{color: '#7b41ff', fontWeight: 'bold'}}>About us</Nav.Link>
                        
                    </Nav>
                    <Nav className="ml-auto">
                        <Nav.Link href="/get-started"><Button>Get started</Button></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigationbar;