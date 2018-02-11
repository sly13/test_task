import React from "react";
import { Icon } from "react-materialize";
import { Link } from "react-router-dom";

const Item = ({ post: { id, title } }) => (
  <tr>
    <td>{id}</td>
    <td>{title}</td>
    <td>
      <Link to={`/list/${id}`}>
        <Icon>send</Icon>
      </Link>
    </td>
  </tr>
);

export default Item;
