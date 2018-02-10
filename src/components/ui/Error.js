import React from "react";
import PropTypes from "prop-types";

const Error = ({ text, forInputType }) => (
  <label for={forInputType} data-error={text} data-success="right">
    {text}
  </label>
);
//<span style={{ color: "#ae5856" }}></span>;

Error.propTypes = {
  text: PropTypes.string.isRequired
};

export default Error;
