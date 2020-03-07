import React from "react";
import "./Loader.css";

const Loader = props => {
  return (
    <div className="Loader--center">
      <div className="lds-circle">
        <div />
      </div>
    </div>
  );
};
export default Loader;
