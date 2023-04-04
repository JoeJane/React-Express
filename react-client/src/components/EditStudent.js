import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditStudent(props) {
  const { id } = useParams();
  let navigate = useNavigate();
  const [showLoading, setShowLoading] = useState(false);
  const [data, setData] = useState([]);
  const [listError, setListError] = useState(false);

  const apiUrl = "http://localhost:3000/api/students/" + id;
  const fetchData = async () => {
    await axios
      .get(apiUrl)
      .then((result) => {
        console.log("result.data:", result.data);
        setData(result.data);
        setShowLoading(false);
      })
      .catch((error) => {
        console.log("error in fetchData:", error);
        setListError(true);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateStudent = async (e) => {
    e.preventDefault();
    setShowLoading(true);
    const id = data._id;

    const updatedStudent = {
      studentNumber: data.studentNumber,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      address: data.address,
      city: data.city,
      phoneNumber: data.phoneNumber,
      email: data.email,
      program: data.program,
      strongestTechnicalSkill: data.strongestTechnicalSkill,
    };

    const apiUrlUpdate = "http://localhost:3000/api/students/" + id;
    await axios
      .put(apiUrlUpdate, updatedStudent)
      .then((results) => {
        setShowLoading(false);
        navigate("/showStudents");
      })
      .catch((error) => setShowLoading(false));
  };

  const onChange = (e) => {
    e.persist();
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const showStudents = () => {
    navigate("/showStudents");
  };

  return (
    <div className="container">
      <div className="row justify-content-md-center">
        <div className="col-md-6 order-md-1 py-5">
          <h2 className="mb-3"> Update Student</h2>
          {showLoading && (
            <Spinner animation="border" role="status">
            </Spinner>
          )}

          <Form onSubmit={updateStudent} className="needs-validation">
            <div className="row">
              <div className="mb-3">
                <label htmlFor="course">Student Number</label>
                <div className="input-group">
                  <Form.Control
                    type="text"
                    name="studentNumber"
                    id="studentNumber"
                    defaultValue={data.studentNumber}
                    readOnly
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
                    defaultValue={data.firstName}
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
                    defaultValue={data.lastName}
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
                    defaultValue={data.address}
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
                    defaultValue={data.city}
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
                    defaultValue={data.phoneNumber}
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
                    defaultValue={data.email}
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
                    defaultValue={data.program}
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
                    defaultValue={data.strongestTechnicalSkill}
                    onChange={onChange}
                  />
                </div>
              </div>

              <div className="mb-3">
                <Button
                  variant="dark"
                  type="submit"
                  className="btn btn-dark btn-lg me-3"
                >
                  update{" "}
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
export default EditStudent;
