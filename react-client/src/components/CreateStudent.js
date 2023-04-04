import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateStudent(props) {
  let navigate = useNavigate();
  const [student, setStudent] = useState({
    _id: "",
    studentNumber: "",
    password: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    phoneNumber: "",
    email: "",
    program: "",
    strongestTechnicalSkill: "",
  });
  const [showLoading, setShowLoading] = useState(false);
  const [message, setMessage] = useState("");

  const apiUrl = "http://localhost:3000/api/students";

  const saveStudent = async (e) => {
    setShowLoading(true);
    e.preventDefault();
    const data = {
      studentNumber: student.studentNumber,
      password: student.password,
      firstName: student.firstName,
      lastName: student.lastName,
      address: student.address,
      city: student.city,
      phoneNumber: student.phoneNumber,
      email: student.email,
      program: student.program,
      strongestTechnicalSkill: student.strongestTechnicalSkill,
    };

    await axios
      .post(apiUrl, data)
      .then((result) => {
        setShowLoading(false);
        navigate("/showStudents");
      })
      .catch((error) => {
        setMessage(error.message);
        setShowLoading(false)
      });
    
  };
  
  const onChange = (e) => {
    e.persist();
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const showStudents = () => {
    navigate("/showStudents");
  };

  return (
    <div className="container">
      <div className="row justify-content-md-center">
        <div className="col-md-6 order-md-1 py-5">
          <h2 className="mb-3"> Add Student</h2>
          {showLoading && (
            <Spinner animation="border" role="status">
            </Spinner>
          )}

          <Form onSubmit={saveStudent} className="needs-validation" noValidate>
            <div className="row">
              <div className="mb-3">
                <label htmlFor="course">Student Number</label>
                <div className="input-group">
                  <Form.Control 
                    required
                    type="text"
                    name="studentNumber"
                    id="studentNumber"
                    placeholder="Enter studentNumber"
                    value={student.studentCode}
                    onChange={onChange}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="course">Default Password</label>
                <div className="input-group">
                  <Form.Control
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter default password"
                    value={student.password}
                    onChange={onChange}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="course">FirstName</label>
                <div className="input-group">
                  <Form.Control
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder="Enter firstName"
                    value={student.firstName}
                    onChange={onChange}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="course">LastName</label>
                <div className="input-group">
                  <Form.Control
                    type="text"
                    name="lastName"
                    id="lastName"
                    placeholder="Enter lastName"
                    value={student.lastName}
                    onChange={onChange}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="course">Address</label>
                <div className="input-group">
                  <Form.Control
                    type="text"
                    name="address"
                    id="address"
                    placeholder="Enter address"
                    value={student.address}
                    onChange={onChange}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="course">City</label>
                <div className="input-group">
                  <Form.Control
                    type="text"
                    name="city"
                    id="city"
                    placeholder="Enter city"
                    value={student.city}
                    onChange={onChange}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="course">PhoneNumber</label>
                <div className="input-group">
                  <Form.Control
                    type="text"
                    name="phoneNumber"
                    id="phoneNumber"
                    placeholder="Enter phoneNumber"
                    value={student.phoneNumber}
                    onChange={onChange}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="course">Email</label>
                <div className="input-group">
                  <Form.Control
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Enter email"
                    value={student.email}
                    onChange={onChange}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="course">Program</label>
                <div className="input-group">
                  <Form.Control
                    type="text"
                    name="program"
                    id="program"
                    placeholder="Enter program"
                    value={student.program}
                    onChange={onChange}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="course">Strongest Technical Skill</label>
                <div className="input-group">
                  <Form.Control
                    type="text"
                    name="strongestTechnicalSkill"
                    id="strongestTechnicalSkill"
                    placeholder="Enter strongestTechnicalSkill"
                    value={student.strongestTechnicalSkill}
                    onChange={onChange}
                  />
                </div>
              </div>

              <div className="mb-3">
              {message && (
                <div className="form-group">
                  <div className="alert alert-danger" role="alert">
                    {message}
                  </div>
                </div>
              )}
              </div>

              <div className="mb-3">
                <Button type="submit" className="btn btn-dark btn-lg me-3">
                  Add Student
                </Button>
                <Button
                  variant="outline-secondary"
                  size="lg"
                  className="btn-lg "
                  type="submit"
                  onClick={() => {
                    showStudents();
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
// withRouter will pass updated match, location, and history props
// to the wrapped component whenever it renders.
export default CreateStudent;
