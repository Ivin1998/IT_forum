import React, { useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Answermodal from "./Answermodal";
import { FaRegTrashCan } from "react-icons/fa6";
import utilities from "../Helpers/Utility";
import axios from "axios";
import { REACT_SERVER_URL } from "../../config/ENV";
import Swal from "sweetalert2";
import { Contextreact } from "./Context";

const Singlequestion = ({ feeds }) => {
  const { setDeleted } = useContext(Contextreact);

  const helper = utilities();
  const hasAdminaccess = helper.isAdmin;

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
      {feeds?.feed?.map((item) => (
        <Container className="singlepost" key={item._id}>
          <Col>
            <Row>
              <Col md={11}>
                <Row style={{ padding: "25px" }}>{item.question}</Row>
              </Col>
              <Col md={1} style={{ padding: "25px" }} hidden={!hasAdminaccess}>
                <FaRegTrashCan
                  onClick={() => Deletequestions(item._id)}
                  style={{ cursor: "pointer" }}
                />
              </Col>
            </Row>
            <Row className="mt-3" style={{ paddingLeft: "25px" }}>
              {item.answer}
            </Row>
            <Row style={{ paddingLeft: "90%" }}>
              {" "}
              <Answermodal question={item} />{" "}
            </Row>
          </Col>
        </Container>
      ))}
    </div>
  );
};

export default Singlequestion;
