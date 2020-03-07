import React from "react";
import "./button.css";

const Button = props => {
  const cls = ["button", props.type];
  return (
    <button
      disabled={props.disabled}
      onClick={props.onClick}
      className={cls.join(" ")}
    >
      {props.children}
    </button>
  );
};
export default Button;
