import axios from "axios";
import packageJSON from "../../../package.json";

export const logout = () => localStorage.removeItem("authToken");

export const getPosts = () => axios.get(`${packageJSON.apiUrl}/posts`);

export const getUsers = () => axios.get(`${packageJSON.apiUrl}/users`);

export const getPostInfo = id => axios.get(`${packageJSON.apiUrl}/posts/${id}`);

export const getUserPosts = id =>
  axios.get(`${packageJSON.apiUrl}/posts/?userId=${id}`);
