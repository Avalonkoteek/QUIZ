import React from "react";
import "./QuizList.css";
import MiniQuiz from "../../Components/miniQuiz/miniQuiz";
import { NavLink } from "react-router-dom";
import Loader from "../../Components/UI/Loader/Loader";
import { connect } from "react-redux";
import { fetchQuizes } from "../../store/actions/quiz";

class QuizList extends React.Component {
  renderQuizes() {
    console.log(this.props.quizes);
    return this.props.quizes.map(quiz => {
      return (
        <MiniQuiz
          key={quiz.id}
          title={quiz.title}
          author={quiz.author}
          quiz={quiz}
        />
      );
    });
  }
  // Получаем тесты с базы данных
  componentDidMount() {
    this.props.fetchQuizes();
  }
  render() {
    return (
      <div className="QuizList">
        <div>
          <h1>Список тестов</h1>
          <div className="QuizList__wrapper">
            {this.props.loading && this.props.quizes.length !== 0 ? (
              <Loader />
            ) : (
              <ul>{this.renderQuizes()}</ul>
            )}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    quizes: state.quiz.quizes,
    loading: state.quiz.loading
  };
}
function mapDispatchToProps(dispatch) {
  return {
    fetchQuizes: () => dispatch(fetchQuizes())
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(QuizList);
