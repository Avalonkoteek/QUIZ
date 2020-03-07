import React from "react";
import Button from "../UI/Button/button";
import "./FinishedQuiz.css";
import { Link } from "react-router-dom";

const FinishedQuiz = props => {
  const successCount = Object.keys(props.results).reduce((total, key) => {
    if (props.results[key] === "success") {
      total++;
    }
    return total;
  }, 0);
  return (
    <div className="FinishedQuiz ">
      <ul>
        {props.quiz.map((quizItem, index) => {
          const cls = [
            props.results[quizItem.id] === "error"
              ? "FinishedQuiz__error"
              : "FinishedQuiz__success"
          ];
          return (
            <li key={index} className={cls.join(" ")}>
              <strong>{index + 1}</strong>.&nbsp; {quizItem.question}
            </li>
          );
        })}
      </ul>
      <p>
        Правильно {successCount} из {props.quiz.length}
      </p>
      <div>
        <Button onClick={props.onRetry}>Повторить</Button>
        <Link to="/">
          <Button>Список тестов</Button>
        </Link>
      </div>
    </div>
  );
};
export default FinishedQuiz;
