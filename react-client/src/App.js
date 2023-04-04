import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Routes,
  useNavigate,
} from "react-router-dom";
//
// This app requires react-bootstrap and bootstrap installed:
//    npm install react-bootstrap bootstrap
//
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import "./App.css";

import Login from "./components/Login";
import ShowStudent from "./components/ShowStudent";
import Logout from "./components/Logout";
import CreateStudent from "./components/CreateStudent";
import CreateCourse from "./components/CreateCourse";
import ShowClassList from "./components/ShowClassList";
import ShowAllCourse from "./components/ShowAllCourse";
import ShowCourse from "./components/ShowCourse";
import EditStudent from "./components/EditStudent";
import EditCourse from "./components/EditCourse";
import axios from "axios";
import AuthService from "./services/auth.service";
import EventBus from "./common/EventBus";

function App() {
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    readCookie();

    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowAdminBoard(user.isadmin);
    }

    EventBus.on("logout", () => {
      logout();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, []);

  const logout = async () => {
    AuthService.logout();
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };

  const readCookie = async () => {
    try {

      const res = await axios.get("/read_cookie");
      
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Router>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            E-Cent
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
            { (showAdminBoard) && (
                <React.Fragment>
                  <Nav.Link as={Link} to="/showStudents">Home </Nav.Link>
                  <Nav.Link as={Link} to="/showAllCourses">List All Courses</Nav.Link>
                </React.Fragment>
              )}

              { (currentUser && !showAdminBoard) && (
                <React.Fragment>
                  <Nav.Link as={Link} to="/showCourses">Home </Nav.Link>
                  <Nav.Link as={Link} to="/showAllCourses">List All Courses</Nav.Link>
                </React.Fragment>
              )}
            </Nav>
            <Nav>
              {currentUser ? (
                  <Nav.Link as={Link} to="/logout" onClick={() => { logout(); }}>  Logout</Nav.Link>
               ) : (
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
              )}
            </Nav>

          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div>
        <Routes>
        <Route path="/" element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="showStudents" element={<ShowStudent />} />
          <Route path="showCourses" element={<ShowCourse />} />
          <Route path="showAllCourses" element={<ShowAllCourse />} />

          <Route path="logout" element={<Logout />} />

          <Route path="createStudent" element={<CreateStudent />} />
          <Route path="createCourse" element={<CreateCourse />} />
          <Route path="editstudent/:id" element={<EditStudent />} />
          <Route
            path="editcourse/:studentcoursecode"
            element={<EditCourse />}
          />
          <Route
            path="showclasslist/:courseID/:section/:semester"
            element={<ShowClassList />}
          />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
