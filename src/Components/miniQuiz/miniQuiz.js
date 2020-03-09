import React from "react";
import { NavLink } from "react-router-dom";
import "./miniQuiz.css";
const miniQuiz = props => {
  return (
    <li className="miniQuiz">
      <NavLink to={"/quiz/" + props.quiz.id}>
        <div className="miniQuiz__left-line"></div>
        <div className="miniQuiz__wrapper">
          <h2>{props.title}</h2>
          <span>...</span>
          <div className="miniQuiz__author">
            <span>Автор:</span>
            <p>{props.author}</p>
          </div>
        </div>
      </NavLink>
    </li>
  );
};
export default miniQuiz;
