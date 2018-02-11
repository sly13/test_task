import axios from "axios";
import packageJSON from "../../../package.json";

export const logout = () => {
  localStorage.removeItem("authToken");
};

export const getUserPosts = id => {
  return axios.get(`${packageJSON.apiUrl}/posts/?userId=${id}`);
};

export const getPosts = () => {
  return axios.get(`${packageJSON.apiUrl}/posts`);
};

export const getUsers = () => {
  return axios.get(`${packageJSON.apiUrl}/users`);
};

export const getPostInfo = id => {
  return axios.get(`${packageJSON.apiUrl}/posts/${id}`);
};
