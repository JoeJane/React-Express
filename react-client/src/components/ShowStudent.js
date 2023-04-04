import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Table from "react-bootstrap/Table";

import { useNavigate } from "react-router-dom";

function ShowStudent(props) {
  let navigate = useNavigate();
  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "http://localhost:3000/api/students";

  const fetchData = async () => {
    axios
      .get(apiUrl)
      .then((result) => {
        setData(result.data);

        setShowLoading(false);
      })
      .catch((error) => {
        console.log("error in fetchData:", error);
      });
  };

  useEffect(() => {
    setShowLoading(false);
    fetchData();
  }, []);

  const editStudent = (id) => {
    navigate("/editstudent/" + id);
  };

  const deleteStudent = async (id) => {
    setShowLoading(true);
    const apiUrl = "http://localhost:3000/api/students/" + id;

    await axios
      .delete(apiUrl)
      .then((result) => {
        setShowLoading(false);
        fetchData();
      })
      .catch((error) => {
        console.log(error);
        setShowLoading(false);
      });
  };

  const addStudent = () => {
    navigate("/createStudent");
  };
  const filteredData =
    data.filter && data.filter((item) => item.isAdmin != true);

  return (
    <div className="container">
      {showLoading && <Spinner animation="border" role="status"></Spinner>}
      <div className="py-5 text-right">
        <Button
          type="submit"
          variant="dark"
          onClick={() => {
            addStudent();
          }}
        >
          Add Student
        </Button>
      </div>

      <div className="row">
        <div className="col-md-12 order-md-1">
          <h2 className="mb-3">All Users</h2>
          <div className="row">
            {filteredData.length > 0 ? (
              <ListGroup>
                <Table>
                  <thead className="table-dark">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Username</th>
                      <th scope="col">first Name</th>
                      <th scope="col">Last Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Program</th>
                      <th scope="col">Address</th>
                      <th scope="col">Phone Number</th>
                      <th scope="col" colSpan={2}>
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredData.map((item, idx) => (
                      <tr key={idx}>
                        <td>{idx + 1}</td>
                        <td>{item.studentNumber} </td>
                        <td>{item.firstName}</td>
                        <td>{item.lastName}</td>
                        <td>{item.email}</td>
                        <td>{item.program}</td>
                        <td>{item.address}</td>
                        <td>{item.phoneNumber} </td>

                        <td>
                          <Button
                            type="submit"
                            variant="outline-dark"
                            onClick={() => {
                              editStudent(item._id);
                            }}
                          >
                            Update
                          </Button>
                        </td>
                        <td>
                          <Button
                            type="button"
                            variant="outline-danger"
                            onClick={() => {
                              deleteStudent(item._id);
                            }}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </ListGroup>
            ) : (
              <p>No students available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
// withRouter will pass updated match, location, and history props
// to the wrapped component whenever it renders.
export default ShowStudent;
