import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Errormessage from "./Errormessage";
import { REACT_SERVER_URL } from "../../config/ENV";

import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const SubmitHadler = async (e) => {
    e.preventDefault();

    if (password !== confirmpassword) {
      setErrorMessage("Passwords donot match!");
    } else if (!name) {
      setErrorMessage("Name field can't be empty");
    } else if (!email) {
      setErrorMessage("Email field can't be empty");
    } else if (!password) {
      setErrorMessage("Pasword field can't be empty");
    } else {
      try {
        const config = {
          "Content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
        };
        const { data } = await axios.post(
          `${REACT_SERVER_URL}/users/register`,
          {
            name,
            email,
            password,
          },
          config
        );
        setErrorMessage("");
        navigate("/");
      } catch (error) {
        let message = error?.response?.data?.message;
        setErrorMessage(message ? message : error.message);
      }
    }
  };
  return (
    <div>
      <Row>
        <Col md={5}></Col>
        <Col md={6} className="loginForm">
          <Container>
            {errorMessage && (
              <Errormessage variant="danger">{errorMessage}</Errormessage>
            )}
            <Form className="register" onSubmit={SubmitHadler}>
              <Form.Group style={{ width: "60%", marginLeft: "10%" }}>
                <Form.Label>Name:</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your Name"
                />
              </Form.Group>
              <Form.Group style={{ width: "60%", marginLeft: "10%" }}>
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your Email id"
                />
              </Form.Group>
              <Form.Group style={{ width: "60%", marginLeft: "10%" }}>
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password webauthn"
                  placeholder="Enter your password"
                />
              </Form.Group>
              <Form.Group style={{ width: "60%", marginLeft: "10%" }}>
                <Form.Label>Confirm Password:</Form.Label>
                <Form.Control
                  type="password"
                  value={confirmpassword}
                  onChange={(e) => setConfirmpassword(e.target.value)}
                  autoComplete="current-password webauthn"
                  placeholder="Confirm your password"
                />
              </Form.Group>
              <Form.Group>
                <Button className="submitbutton" type="submit">
                  Login
                </Button>
                <div className="signup">
                  <Link to="/" id="signup">
                    Back to Login
                  </Link>
                </div>
              </Form.Group>
            </Form>
          </Container>
        </Col>
      </Row>
    </div>
  );
};

export default Register;
