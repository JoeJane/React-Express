import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Input from "react-validation/build/input";

import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

import axios from "axios";
import CreateStudent from "./CreateStudent";
import CreateCourse from "./CreateCourse";
import ShowCourse from "./ShowCourse";
import ShowStudent from "./ShowStudent";

function App() {
  let navigate = useNavigate();

  //state variable for the screen, admin or user
  const [screen, setScreen] = useState("auth");
  const [studentNumber, setstudent] = useState("auth");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  //store input field data, user name and password
  let userId = "";
  const [password, setPassword] = useState();
  const apiUrl = "http://localhost:3000/signin";
  //send username and password to the server
  // for initial authentication

  const required = (value) => {
    if (!value) {
      return (
        <div className="invalid-feedback d-block">This field is required!</div>
      );
    }
  };

  const authenticateUser = async () => {
    console.log("calling auth");
    setMessage("");
    setLoading(true);

    AuthService.login(studentNumber, password).then(
      (res) => {
        if (res.status !== "error") {
          userId = res.id;
          if (res.isadmin) {
            navigate("/showStudents");
          } else {
            navigate("/showCourses");
          }
          window.location.reload();
        } else {
          const resMessage = res.message;
          setLoading(false);
          setMessage(resMessage);
        }
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setLoading(false);
        setMessage(resMessage);
      }
    );
  };

  //check if the user already logged-in
  const readCookie = async () => {
    try {
      console.log("--- in readCookie function ---");

      const res = await axios.get("/read_cookie");
      console.log("Readcookie response:" + res);

      if (res.data.screen !== undefined) {
        setScreen(res.data.screen);
      }
    } catch (e) {
      setScreen("auth");
      console.log(e);
    }
  };
  //runs the first time the view is rendered
  //to check if user is signed in
  useEffect(() => {
    readCookie();
  }, []); //only the first render
  //
  return (
    <div className="form-signin w-100 m-auto">
      {screen === "auth" ? (
        <Form>
          {/* <img
            src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraightStrand&accessoriesType=Blank&hairColor=Black&facialHairType=Blank&clotheType=BlazerSweater&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
            alt="profile-img"
            className="profile-img-card"
          /> */}
          <Form.Group size="lg" className="form-floating">
            <Form.Control
              type="text"
              name="studentNumber"
              id="studentNumber"
              placeholder="Enter Username"
              onChange={(e) => setstudent(e.target.value)}
              validations={[required]}
            />
            <Form.Label>Student Number</Form.Label>
          </Form.Group>
          <Form.Group size="lg" className="form-floating">
            <Form.Control
              type="password"
              name="password"
              id="password"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              validations={[required]}
            />
            <Form.Label>Password</Form.Label>
          </Form.Group>

          <button
            className="w-100 btn btn-lg btn-dark"
            disabled={loading}
            onClick={authenticateUser}
          >
            {loading && (
              <span className="spinner-border spinner-border-sm"></span>
            )}
            <span>Login</span>
          </button>

          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
        </Form>
      ) : screen === "admin" ? (
        <ShowStudent> </ShowStudent>
      ) : (
        <ShowCourse></ShowCourse>
      )}
    </div>
  );
}

export default App;
