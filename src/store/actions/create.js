import {
  CREATE_QUIZ_QUESTION,
  RESET_QUIZ_CREATION,
  CREATE_QUIZ
} from "./actionTypes";
import axios from "../../axios/axios-quiz";

export function createQuizQuestion(item, author, title) {
  const quizItem = {
    quiz: item,
    title,
    author
  };
  return {
    type: CREATE_QUIZ_QUESTION,
    quizItem
  };
}
export function createQuiz() {
  return {
    type: CREATE_QUIZ
  };
}

export function resetQuizCreation() {
  return {
    type: RESET_QUIZ_CREATION
  };
}

export function finishCreateQuiz() {
  return async (dispatch, getState) => {
    await axios.post("/quizes.json", getState().create.quizItem);
    dispatch(resetQuizCreation());
  };
}
