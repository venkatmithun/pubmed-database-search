import React from "react";
import "../../styles/App.css";

const Abstract = ({ abstract }) => {
  return (
    <div style={{ whiteSpace: "pre-line" }}>
      <div className="bold-font">{"\n"}ABSTRACT</div>
      {abstract}
    </div>
  );
};

export default Abstract;
