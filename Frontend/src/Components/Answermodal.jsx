import axios from "axios";
import React, { useContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { REACT_SERVER_URL } from "../../config/ENV";
import { Contextreact } from "./Context";
import { FaEdit } from "react-icons/fa";
import utilities from "../Helpers/Utility";


const Answermodal = ({ question, author }) => {
  
  const helper = utilities();

  const loggedInEmail = helper.userEmail;

  const [showModal, setShowModal] = useState(false);

  const { answer, setAnswer } = useContext(Contextreact);

  const Postanswer = async (answer) => {
    try {
      const config = {
        "Content-type": "application/json",
      };
        await axios.post(
        `${REACT_SERVER_URL}/users/multipleanswers`,
        {
          qn_id: question._id,
          email: loggedInEmail,
          question:question,
          answer: answer,
        },
        config
      );
      setAnswer("");
    } catch (error) {
      let message = error?.response?.data?.message;
      console.log(message ? message : error.message);
    }
    onHide();
  };

  //get answer for editing
  const getAnswer = async () => {
    setShowModal(true);
    try {
      const config = {
        "Content-type": "application/json",
      };
      const { data } = await axios.get(
        `${REACT_SERVER_URL}/users/questionsanswer?id=${question._id}`,
        config
      );
      setAnswer(data.Replyanswer.answer); // Set answer for input
    } catch (error) {
      let message = error?.response?.data?.message;
      console.log(message ? message : error.message);
    }
  };

  const onHide = () => {
    setShowModal(false);
  };

  const onReply =()=>{
    setAnswer('');
    setShowModal(true);
  }

  return (
    <div>
      {/* {author == "userPrivileges" ? (
        <FaEdit onClick={() => getAnswer()} style={{ cursor: "pointer" }} />
      ) : (
        ""
      )} */}
      <Button variant="light" onClick={onReply} style={{marginLeft:'20%'}}>
        Reply
      </Button>
      <Modal
        show={showModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton onHide={onHide}>
          <Modal.Title id="contained-modal-title-vcenter">
            Add your opinion
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            className="input"
            onChange={(e) => setAnswer(e.target.value)}
            value={answer}
            placeholder="Start typing your thoughts....."
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide}>Cancel</Button>
          <Button onClick={() => Postanswer(answer)} disabled={!answer}>Post your opinion</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Answermodal;
