import React from "react";
import "./Auth.css";
import Button from "../../Components/UI/Button/button";
import Input from "../../Components/UI/Input/Input";
import is from "is_js";
import { auth } from "../../store/actions/auth";
import { connect } from "react-redux";

class Auth extends React.Component {
  state = {
    isFormValid: false,
    formControls: {
      email: {
        value: "",
        type: "email",
        label: "Email",
        errorMessage: "Введите корректный email",
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true
        }
      },
      password: {
        value: "",
        type: "passwprd",
        label: "Пароль",
        errorMessage: "Введите корректный пароль",
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6
        }
      }
    }
  };

  loginHandler = () => {
    this.props.auth(
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      true
    );
  };
  registerHandler = () => {
    this.props.auth(
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      false
    );
  };

  submitHandler = event => {
    event.preventDefault();
  };
  validateControl(value, validation) {
    if (!validation) {
      return true;
    }
    let isValid = true;
    if (validation.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (validation.email) {
      isValid = is.email(value) && isValid;
    }
    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid;
    }
    return isValid;
  }

  onChangeHandler = (event, controlName) => {
    const formControls = { ...this.state.formControls };
    const control = { ...formControls[controlName] };

    control.value = event.target.value;
    control.touched = true;
    control.valid = this.validateControl(control.value, control.validation);
    formControls[controlName] = control;

    let isFormValid = true;

    Object.keys(formControls).forEach(name => {
      isFormValid = formControls[name].valid && isFormValid;
    });

    this.setState({
      formControls,
      isFormValid
    });
  };

  renderInputs() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];
      return (
        <Input
          key={controlName + index}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          shouldValidate={!!control.validation}
          errorMessage={control.errorMessage}
          onChange={event => {
            this.onChangeHandler(event, controlName);
          }}
        />
      );
    });
  }

  render() {
    return (
      <div className="Auth">
        <h1>Авторизация</h1>
        <div>
          <form onSubmit={this.submitHandler} className="AuthForm">
            {this.renderInputs()}
            <Button
              disabled={!this.state.isFormValid}
              type="success"
              onClick={this.loginHandler}
            >
              Войти
            </Button>
            <Button
              disabled={!this.state.isFormValid}
              type="primary"
              onClick={this.registerHandler}
            >
              Зарегестрироваться
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin))
  };
}
export default connect(null, mapDispatchToProps)(Auth);
