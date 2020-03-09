import {
  CREATE_QUIZ_QUESTION,
  RESET_QUIZ_CREATION
} from "../actions/actionTypes";

const initialState = {
  quizItem: {
    quiz: [],
    author: "Без автора",
    title: "Без названия"
  }
};

export default function createReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_QUIZ_QUESTION:
      return {
        ...state,
        quizItem: {
          quiz: [...state.quizItem.quiz, action.quizItem.quiz],
          author: action.quizItem.author,
          title: action.quizItem.title
        }
      };
    case RESET_QUIZ_CREATION:
      return {
        ...state,
        quizItem: {
          quiz: [],
          author: "",
          title: ""
        }
      };
    default:
      return state;
  }
}
