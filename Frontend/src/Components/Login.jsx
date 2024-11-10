import React, { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import '../assets/style.css';
import { REACT_SERVER_URL } from '../../config/ENV';
import {  Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Errormessage from './Errormessage';




const Login = () => {

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [errormessage,setErromessage] = useState('');

  const navigate = useNavigate();

  const SubmitHandler = async(e)=>{
    e.preventDefault();
    
    try { 
      
      const config = {
        "Content-type":"application/json",
        "Access-Control-Allow-Origin": "*",
         }
      const {data} = await axios.post(
        `${REACT_SERVER_URL}/users/login`,
        {
          email,
          password
        },
        config
      );
            
      navigate('/');
      localStorage.setItem("userInfo", JSON.stringify(data))
      setErromessage('');
    } catch (error) {
      let message = error?.response?.data?.message;
      // console.error('Error response data:', message?message: error.message);
      setErromessage(message?message:error.message)
    }
  }


  return (
    <div><Row>
        <Col md={5}>
        </Col>
        <Col md={6} className='loginForm'>
        <Container>
        {errormessage && (
        <Errormessage variant='danger'>
        {errormessage}
        </Errormessage>
        )}
         
      <Form className='login' onSubmit={SubmitHandler}>
        <Form.Group  style={{ width: "60%", marginLeft: "10%" }}>
            <Form.Label>Email:</Form.Label>
            <Form.Control type='email'value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter your Email id'/>
        </Form.Group>
        <Form.Group  style={{ width: "60%", marginLeft: "10%" }}>
            <Form.Label>Password:</Form.Label>
            <Form.Control type='password' onChange={(e)=>setPassword(e.target.value)} autoComplete="current-password webauthn" placeholder='Enter your password'/>
        </Form.Group>
        <Form.Group  >
           <Button  className='submitbutton' type='submit'>Login</Button>
          <div className='signup'>
            New Customer?
                <Link to="/register" id="signup">
                  &nbsp;Create Account
                </Link>
          </div>
        </Form.Group>
      </Form>
      </Container>
        </Col>
    </Row>
    </div>
  )
}

export default Login;
