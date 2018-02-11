import React from "react";

const Error = ({ text, forInputType }) => (
  <label for={forInputType} data-error={text} data-success="right">
    {text}
  </label>
);

export default Error;
