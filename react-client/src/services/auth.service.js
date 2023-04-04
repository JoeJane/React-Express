import axios from "axios";

const API_URL = "http://localhost:3000";

const login = (studentNumber, password) => {
  const loginData = { auth: { studentNumber, password } };

  return axios.post(API_URL+"/signin", loginData).then((response) => {
    console.log("RESPONSE: " + JSON.stringify(response.data));
    localStorage.setItem("user", JSON.stringify(response.data));
    return response.data;
  });
};

const logout = () => {
  localStorage.removeItem("user");
  return axios.get(API_URL + "/signout");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  login,
  logout,
  getCurrentUser,
};

export default AuthService;
