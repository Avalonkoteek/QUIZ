import React from "react";
import "./MenuToggle.css";

const MenuToggle = props => {
  const cls = ["Navigation__button"];
  if (props.isOpen) {
    cls.push("Navigation__button--toggle");
  }
  return (
    <div className="Navigation">
      <div className={cls.join(" ")} onClick={props.onToggle}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};
export default MenuToggle;
