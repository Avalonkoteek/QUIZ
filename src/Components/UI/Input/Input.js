import React from "react";
import "./Input.css";

function isInvalid({ valid, touched, shouldValidate }) {
  return !valid && shouldValidate && touched;
}

const Input = props => {
  const inputType = props.type || "text";
  const cls = ["Input"];
  const htmlFor = `${inputType}-${Math.random()}`;

  if (isInvalid(props)) {
    cls.push("invalid");
  }

  return (
    <div className={cls.join(" ")}>
      <input
        type={inputType}
        id={htmlFor}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.label}
      />
      {isInvalid(props) ? (
        <span>{props.errorMessage || "Введите верные значения"}</span>
      ) : null}
    </div>
  );
};
export default Input;
