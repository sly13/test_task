import React from "react";

const Item = ({ post: { id, title } }) => {
  return (
    <tr>
      <td>{id}</td>
      <td>{title}</td>
    </tr>
  );
};

export default Item;
