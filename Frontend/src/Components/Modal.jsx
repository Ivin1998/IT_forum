import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../assets/style.css";
import Tips from "../assets/tips.json";
import axios from "axios";
import { REACT_SERVER_URL } from "../../config/ENV";
import utilities from "../Helpers/Utility";
import { Contextreact } from "./Context";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Topics from "../assets/Categories.json";

const ModalForm = ({ show, onHide }) => {
  const { question, setQuestion, category, setCategory } =
    useContext(Contextreact);

  const navigate = useNavigate();

  const helper = utilities();
  const isGuest = helper.isGuest ?? false;

  const userInfo = localStorage.getItem("userInfo");
  const userInfoParsed = JSON.parse(userInfo);
  const email = userInfoParsed?.email;

  const Postquestion = async (question) => {
    const matchedCategories = [];
    let isMatched = false; // Flag to check if any keyword matches
    //check the categories and map it
    Topics.forEach((topic) => {
      topic.keywords.forEach((keyword) => {
        if (question.toLowerCase().includes(keyword.toLowerCase())) {
          matchedCategories.push(topic.category);
          isMatched = true; // Mark as matched
          return; // Exit the current keyword loop as we found a match
        }
      });
    });
    if (!isMatched) {
      matchedCategories.push("Others");
    }
        
    if (!isGuest) {
      try {
        const config = {
          "Content-type": "application/json",
        };
        await axios.post(
          `${REACT_SERVER_URL}/users/answers`,
          {
            email,
            question,
            category:matchedCategories
          },
          config
        );
        setQuestion("");
      } catch (error) {
        let message = error?.response?.data?.message;
        console.log(message ? message : error.message);
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Please login to post your questions",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/home");
        }
      });
    }
    onHide();
  };

  return (
    <div>
      <Modal
        show={show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton onHide={onHide}>
          <Modal.Title id="contained-modal-title-vcenter">
            Post your question
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="tips">
            {Tips.map((tip) => (
              <ul key={tip.id}>
                <li className="tip-content">{tip.content}</li>
              </ul>
            ))}
          </div>
          <input
            className="input"
            onChange={(e) => setQuestion(e.target.value)}
            value={question}
            placeholder='Start your question with "how", "what", "who" etc...'
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide}>Cancel</Button>
          <Button onClick={() => Postquestion(question)} disabled={!question}>
            Post question
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalForm;
