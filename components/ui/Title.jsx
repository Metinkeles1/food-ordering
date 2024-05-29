import React from "react";

const Title = ({ children, addClass }) => {
  return (
    <div className={`${addClass} font-raleway font-bold `}>{children}</div>
  );
};

export default Title;
