import React, { useCallback, useContext, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import RelatedTopics from "./RelatedTopics";
import axios from "axios";
import { REACT_SERVER_URL } from "../../config/ENV";
import Singlequestion from "./Singlequestion";
import { Contextreact } from "./Context";
import utilities from "../Helpers/Utility";


const Feedpage = () => {

  const { answer, question, deleted,feeds, setFeeds, search } = useContext(Contextreact);

  const {loggedInName,capitalizeFirstLetter} = utilities();
  
  const userInfo = localStorage.getItem("userInfo") ?? "";

  if (!userInfo) {
    const Guestdata = {
      name: "Guest User",
      email: "guest@ivin.com",
      isAdmin: false,
    };
    localStorage.setItem("userInfo", JSON.stringify(Guestdata));
  }

  const fetchfeeds = async () => {
    try {
      const config = {
        "Content-type": "application/json",
      };
      const { data } = await axios.get(
        `${REACT_SERVER_URL}/users/answers`,
        config
      );
      setFeeds(data); 

      
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSearchfeeds = async (search) => {        
    try {
      const config = {
        "Content-type": "application/json",
      };
      const { data } = await axios.get(
        `${REACT_SERVER_URL}/users/searchquestions/${search}`,
        config
      );
      
      if(data.feed.length >0){
        
        setFeeds(data);      
      }
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {      
      fetchfeeds();
  }, [answer, question, deleted]);

  useEffect(()=>{
    if(search.length > 0){
      fetchSearchfeeds(search);
    }else{
      fetchfeeds();
    }

  },[search])


  return (
    <div>
      <span className="name">Hey, {capitalizeFirstLetter(loggedInName)}!</span>
      <Container>
        <Row style={{ paddingTop: "50px" }}>
          <Col md={2} className="sidecontainer">
            <RelatedTopics />
          </Col>
          <Col md={8} className="feedcontainer">
            <Singlequestion feeds={feeds} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Feedpage;
