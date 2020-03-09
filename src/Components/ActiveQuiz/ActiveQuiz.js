import React from "react";
import "./ActiveQuiz.css";
import AnswersList from "./AnswersList/AnswersList";

const ActiveQuiz = props => (
  <div className="ActiveQuiz">
    <div className="Question">
      <div>
        Вопрос: <span>{props.question}</span>
      </div>
      <small>
        {props.answerNumber} из {props.quizLength}
      </small>
    </div>
    {console.log(props)}
    <AnswersList
      state={props.state}
      answers={props.answers}
      onAnswerClick={props.onAnswerClick}
    />
  </div>
);
export default ActiveQuiz;
