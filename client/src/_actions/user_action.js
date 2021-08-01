import axios from "axios";
import { LOGIN_USER, REGISTER_USER, AUTH_USER } from "./types";

export function loginUser(data) {
  const request = axios.post("/api/users/login", data).then((res) => {
    console.log("loginUser", res);
    return res.data;
  });

  return {
    type: LOGIN_USER,
    payload: request,
  };
}

export function registerUser(data) {
  const request = axios.post("/api/users/register", data).then((res) => {
    console.log("registerUser", res);
    return res.data;
  });

  return {
    type: REGISTER_USER,
    payload: request,
  };
}

export function auth() {
  const request = axios.get("/api/users/auth").then((res) => {
    console.log("auth", res);
    return res.data;
  });

  return {
    type: AUTH_USER,
    payload: request,
  };
}
