import React, { Component } from "react";
import "./QuizCreator.css";
import Button from "../../Components/UI/Button/button";
import Input from "../../Components/UI/Input/Input";
import Select from "../../Components/UI/Select/Select";
import {
  createControl,
  validate,
  validateForm
} from "../../Form/FormFramework";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import { connect } from "react-redux";
import {
  createQuizQuestion,
  finishCreateQuiz
} from "../../store/actions/create";
import { NavLink } from "react-router-dom";

function createOptionControl(number) {
  return createControl(
    {
      label: `Вариант ${number}`,
      errorMessage: "Значение не может быть пустым",
      id: number
    },
    { required: true }
  );
}

function createFormControls() {
  return {
    question: createControl(
      {
        label: "Введите вопрос",
        errorMessage: "Вопрос не может быть пустым"
      },
      { required: true }
    ),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4)
  };
}
// CLASS ---------------------------------------------------------------------------------------->
class QuizCreator extends Component {
  // STATE -------------------------------------------------------------------------------------->
  state = {
    isFormValid: false,
    rightAnswerId: 1,
    formControls: createFormControls(),
    titleOfTest: "",
    author: "",
    isQuizStart: false,
    isQuizFinished: false
  };

  // Start -------------------------------------------------------------------------------------->
  changeHandlerStart = (value, type) => {
    if (type === "titleOfTest") {
      this.setState({
        titleOfTest: value
      });
    } else {
      this.setState({
        author: value
      });
    }
  };
  submitStartQuizHandler = () => {
    this.setState({
      isQuizStart: true
    });
  };

  // ADD QUESTION ------------------------------------------------------------------------------->
  addQuestionHandler = event => {
    event.preventDefault();

    const {
      question,
      option1,
      option2,
      option3,
      option4
    } = this.state.formControls;

    const questionItem = {
      question: question.value,
      id: this.props.quizItem.quiz.length + 1,
      rightAnswerId: this.state.rightAnswerId,
      answers: [
        { text: option1.value, id: option1.id },
        { text: option2.value, id: option2.id },
        { text: option3.value, id: option3.id },
        { text: option4.value, id: option4.id }
      ]
    };
    this.props.createQuizQuestion(
      questionItem,
      this.state.author,
      this.state.titleOfTest
    );

    this.setState({
      isFormValid: false,
      rightAnswerId: 1,
      formControls: createFormControls()
    });
  };

  // CHANGE INPUTS ------------------------------------------------------------------------------>
  changeHandler = (value, controlName) => {
    const formControls = { ...this.state.formControls };
    const control = { ...formControls[controlName] };

    control.touched = true;
    control.value = value;
    control.valid = validate(control.value, control.validation);

    formControls[controlName] = control;

    this.setState({
      formControls,
      isFormValid: validateForm(formControls)
    });
  };
  selectChangeHandler = event => {
    this.setState({
      rightAnswerId: +event.target.value
    });
  };

  // END ----------------------------------------------------------------------------->
  submitHandler = event => {
    event.preventDefault();
  };
  createQuizHandler = event => {
    event.preventDefault();

    this.setState({
      isFormValid: false,
      rightAnswerId: 1,
      formControls: createFormControls(),
      isQuizFinished: true
    });
    this.props.finishCreateQuiz();
  };
  endCreateQuizHandler = () => {
    // this.setState({
    //   isQuizStart: false,
    //   isQuizFinished: false
    // });
  };

  // RENDER ELEMENTS----------------------------------------------------------------------------->
  renderControls() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];

      return (
        <Auxiliary key={controlName + index}>
          <Input
            label={control.label}
            value={control.value}
            valid={control.valid}
            shouldValidate={!!control.validation}
            touched={control.touched}
            errorMessage={control.errorMessage}
            onChange={event =>
              this.changeHandler(event.target.value, controlName)
            }
          />
        </Auxiliary>
      );
    });
  }
  renderSelect() {
    return (
      <Select
        label="Выберите правильный ответ"
        value={this.state.rightAnswerId}
        onChange={this.selectChangeHandler}
        options={[
          { text: 1, value: 1 },
          { text: 2, value: 2 },
          { text: 3, value: 3 },
          { text: 4, value: 4 }
        ]}
      />
    );
  }
  renderStartWindow() {
    return (
      <div className="QuizCreator__start-wrapper">
        <Input
          label="Название теста"
          value={this.state.titleOfTest}
          valid={true}
          shouldValidate={true}
          touched={true}
          errorMessage="dddd"
          onChange={event =>
            this.changeHandlerStart(event.target.value, "titleOfTest")
          }
        />
        <Input
          label="Автор теста"
          value={this.state.author}
          valid={true}
          shouldValidate={true}
          touched={true}
          errorMessage="dddd"
          onChange={event =>
            this.changeHandlerStart(event.target.value, "author")
          }
        />
        <Button
          type="primary"
          onClick={this.submitStartQuizHandler}
          disabled={false}
        >
          Далее
        </Button>
      </div>
    );
  }
  renderEndWindow() {
    return (
      <div className="QuizCreator__end-wrapper">
        <div>Готово, тест создан</div>
        <NavLink to="/">
          <Button
            onClick={() => {
              this.endCreateQuizHandler();
            }}
          >
            К списку тестов
          </Button>
        </NavLink>
      </div>
    );
  }
  // RENDER ----------------------------------------------------------------------------->
  render() {
    return (
      <div className="QuizCreator">
        <h1>Создание теста</h1>
        <div>
          {!this.state.isQuizStart ? this.renderStartWindow() : null}
          {this.state.isQuizFinished ? this.renderEndWindow() : null}
          <form onSubmit={this.submitHandler}>
            {this.renderControls()}

            {this.renderSelect()}

            <Button
              type="primary"
              onClick={this.addQuestionHandler}
              disabled={!this.state.isFormValid}
            >
              Добавить вопрос
            </Button>

            <Button
              type="success"
              onClick={this.createQuizHandler}
              disabled={this.props.quizItem.quiz.length === 0}
            >
              Создать тест
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    quizItem: state.create.quizItem
  };
}

function mapDispatchToProps(dispatch) {
  return {
    createQuizQuestion: (item, author, title) =>
      dispatch(createQuizQuestion(item, author, title)),
    finishCreateQuiz: () => dispatch(finishCreateQuiz())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator);
