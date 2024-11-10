import axios from "axios";
import React, { useContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { REACT_SERVER_URL } from "../../config/ENV";
import { Contextreact } from "./Context";

const Answermodal = ({ question }) => {
  const [showModal, setShowModal] = useState(false);

  const { answer, setAnswer } = useContext(Contextreact);

  const Postanswer = async (answer) => {
    try {
      const config = {
        "Content-type": "application/json",
      };
      const { data } = await axios.put(
        `${REACT_SERVER_URL}/users/answers`,
        {
          id: question._id,
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

  return (
    <div>
      <Button variant="light" onClick={() => getAnswer()}>
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
          <Button onClick={() => Postanswer(answer)}>Post your opinion</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Answermodal;
