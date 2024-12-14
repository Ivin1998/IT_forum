import React, { useContext, useState } from "react";
import {
  Button,
  Col,
  Container,
  Dropdown,
  Form,
  InputGroup,
  Nav,
  Navbar,
} from "react-bootstrap";
import { FaUserLarge } from "react-icons/fa6";

import ModalForm from "./Modal";
import { Link } from "react-router-dom";
import { Contextreact } from "./Context";
const Header = () => {
    const [showModal, setShowModal] = useState(false);
    const { setQuestion,setSearch } = useContext(Contextreact);
    const handleLogout = () => {
      localStorage.clear();
    };

  const Hidemodal = () => {
    setQuestion("");
    setShowModal(false);
  };

  const search =(value)=>{
    setSearch(value.trim());
  }

  return (
    <>
      <Navbar
        bg="light"
        data-bs-theme="light"
        style={{ position: "sticky", top: 0 }}
      >
        <Container>
          <Col md={2}>
            <Navbar.Brand href="#home">InnovateHub </Navbar.Brand>
          </Col>
          <Col md={2}>
            {/* <Nav className="me-auto">
              <Nav.Link href="#categories">Categories</Nav.Link>
            </Nav> */}
          </Col>
          <Col md={3}>
            <Nav>
              <InputGroup style={{ width: "100%" }}>
                <Form.Control
                  aria-label="Large"
                  placeholder="Search specific topics..."
                  aria-describedby="inputGroup-sizing-default"
                  onChange={(e)=>search(e.target.value)}
                />
              </InputGroup>
            </Nav>
          </Col>
          <Col md={3} style={{ textAlign: "center" }}>
            <Nav.Link>
              <Button onClick={() => setShowModal(true)}>Ask a Question</Button>
            </Nav.Link>
          </Col>
          <Col md={2}>
            <Dropdown>
              <Dropdown.Toggle variant="success">
                <FaUserLarge />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item
                as ={Link}
                    to="/home"
                    onClick={() => {
                      handleLogout();
                    }}
                  >
                    Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Container>
      </Navbar>
      <ModalForm show={showModal} onHide={Hidemodal} />
    </>
  );
};

export default Header;
