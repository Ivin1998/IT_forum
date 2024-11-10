import React, { useCallback, useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import RelatedTopics from "./RelatedTopics";
import axios from "axios";
import { REACT_SERVER_URL } from "../../config/ENV";
import Singlequestion from "./Singlequestion";
import { Contextreact } from "./Context";

const Feedpage = () => {
  const [feeds, setFeeds] = useState("");

  const { answer, question, deleted } = useContext(Contextreact);

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

  useEffect(() => {
    fetchfeeds();
  }, [answer, question, deleted]);

  return (
    <div>
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
