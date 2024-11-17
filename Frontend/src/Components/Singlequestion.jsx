import React, { useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Answermodal from "./Answermodal";
import { FaRegTrashCan } from "react-icons/fa6";
import utilities from "../Helpers/Utility";
import axios from "axios";
import { REACT_SERVER_URL } from "../../config/ENV";
import Swal from "sweetalert2";
import { Contextreact } from "./Context";
import AuthorIcon from "../assets/AuthorIcon";

const Singlequestion = ({ feeds }) => {
  // Sort answers for each question and get the latest answer
  const latestAnswers = feeds?.feed?.map((item) => {
    const latestAnswer = item?.answers?.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    )[0];
    return { ...item, latestAnswer }; // Attach the latest answer to the item
  });

  console.log(latestAnswers);

  const { setDeleted } = useContext(Contextreact);
  
  const helper = utilities();
  const hasAdminaccess = helper.isAdmin;
  const loggedinUser = helper.userEmail;

  const Deletequestions = async (id) => {
    setDeleted(false);
    Swal.fire({
      title: "Do you want to Delete the question?",
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const config = {
            "Content-type": "application/json",
          };
          const isDeleted = await axios.delete(
            `${REACT_SERVER_URL}/users/questions/${id}`,
            config
          );
          if (isDeleted.data.deletedCount >= 1) {
            Swal.fire("One question has been deleted!", "", "success");
            setDeleted(true);
          }
        } catch (error) {
          let message = error?.response?.data?.message;
          console.log(message ? message : error.message);
        }
      }
    });
  };

  return (
    <div>
      {latestAnswers?.map((item) => (
        <Container className="singlepost" key={item._id}>
          <Col>
            <Row>
              <Col md={11}>
                <Row style={{ padding: "25px" }}>
                  <b>{item.question}</b>
                </Row>
              </Col>
              <Col md={1} style={{ padding: "25px" }} hidden={!hasAdminaccess}>
                <FaRegTrashCan
                  onClick={() => Deletequestions(item._id)}
                  style={{ cursor: "pointer" }}
                />
              </Col>
            </Row>
            {item?.answers?.map((answer) => (
              <>
                <AuthorIcon
                  name={loggedinUser === answer.email ? "You" : answer.email}
                />
                <div>
                  <Row className=" answer-container">
                    <span>{answer.answer}</span>
                  </Row>
                </div>
              </>
            ))}
            <Row>
              <Col md={10}></Col>
              <Col md={2}>
                <Answermodal
                  question={item}
                  author={loggedinUser === item.email ? "userPrivileges" : ""}
                  id={item._id}
                  answerId={item?.latestAnswer?._id}
                />{" "}
              </Col>{" "}
            </Row>
          </Col>
        </Container>
      ))}
    </div>
  );
};

export default Singlequestion;
