import React, { useContext, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { REACT_SERVER_URL } from "../../config/ENV";
import axios from "axios";
import { Contextreact } from "./Context";

const RelatedTopics = () => {
  const { category, setCategory, question, deleted,setLatestQuestionAnswers } = useContext(Contextreact);

  const fetchCategories = async () => {
    //set for getting only unique entries
    const uniqueCategories = new Set();

    try {
      const config = {
        "Content-type": "application/json",
      };
      const { data } = await axios.get(
        `${REACT_SERVER_URL}/users/answers`,
        config
      );
      data.feed.forEach((feeds) => {
        feeds.category.forEach((category) => {
          uniqueCategories.add(category);
        });
      });

      setCategory(Array.from(uniqueCategories)); //convert set object into array
    } catch (error) {
      console.log(error);
    }
  };

  const showCategory = async (category)=>{
    if(category == 'All Topics'){      
      try {
        const config = {
          "Content-type": "application/json",
        };
        const { data } = await axios.get(
          `${REACT_SERVER_URL}/users/answers`,
          config
        );
        setLatestQuestionAnswers(data.feed);         
      } catch (error) {
        console.log(error);
      }
    }else{
      try {
        const config = {
          "Content-type": "application/json",
        };
        const { data } = await axios.get(
          `${REACT_SERVER_URL}/users/category/${category}`,
          config
        );
        setLatestQuestionAnswers(data.feeds.feed);
        
    }catch (error) {
      console.log(error);
    }
    }
   
}

  useEffect(() => {
    fetchCategories();
  }, [question, deleted]);

  return (
    <div className="category-container">
      <Col>
        <Row>
          {['All Topics', ...category].map((category) => (
            <span onClick={()=>showCategory(category)} className="category" key={category}>
              {category}
            </span>
          ))}
        </Row>
      </Col>
    </div>
  );
};

export default RelatedTopics;
