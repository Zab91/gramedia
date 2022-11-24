import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
import { Link } from "react-router-dom";

export const NavbarComp = () => {
  const { username } = useSelector((state) => state.userSlice.value);
  const dispatch = useDispatch();
  const getToken = localStorage.getItem("token");

  const onLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">
          <img
            src="https://www.gramedia.com/assets/gramedia-icon-2.png"
            width="185px"
            alt="Gramedia Logo"
            // className="img-thumbnail"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/register">Register</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/adminLogin">Login as Admin</Nav.Link>
            {/* <NavDropdown title="Register" id="basic-nav-dropdown">
              <NavDropdown.Item href="/register">Register</NavDropdown.Item>
              <NavDropdown.Item href="/Login">Login</NavDropdown.Item>
            </NavDropdown> */}
            <InputGroup className="mb-0">
              <Form.Control
                aria-describedby="basic-addon1"
                placeholder="Search"
              />
            </InputGroup>
          </Nav>
          {getToken ? (
            <Nav className="User">
              <Navbar.Toggle />
              <Navbar.Collapse className="justify-content-end">
                <div className="d-flex flex-row justify-content-space-between ">
                  <img
                    src="https://www.w3schools.com/howto/img_avatar.png"
                    alt="Avatar.jpg"
                    width="30px"
                    height="30px"
                  />
                </div>
                <Navbar.Text>Signed in as:</Navbar.Text>
                <NavDropdown title={username} id="basic-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/login" onClick={onLogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </Navbar.Collapse>
            </Nav>
          ) : null}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
