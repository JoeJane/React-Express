import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Table from "react-bootstrap/Table";

import { useNavigate, useParams } from "react-router-dom";

function ShowClassList(props) {
  let navigate = useNavigate();
  let { courseID, section, semester, id } = useParams();

  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl =
    "http://localhost:3000/api/studentcourse/getclasslist/" +
    courseID.trim() +
    "/" +
    section +
    "/" +
    semester;

  const fetchData = async () => {
    await axios
      .get(apiUrl)
      .then((result) => {
        setData(result.data);
        console.log(result.data);
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


  const showCourses = () => {
    navigate("/showCourses");
  };

  return (
    <div className="container">
      {showLoading && (
        <Spinner animation="border" role="status">
        </Spinner>
      )}

      {data.length > 0 ? (
        <div className="row py-5">
          <div className="col-md-12 order-md-1">
            <h3 className="mb-3">Your Classmates of {data[0].courseId.courseName} (
            {data[0].courseId.courseCode}) | Semester {data[0].semester} |{" "}
            {data[0].section}</h3>

            <ListGroup className="py-5">
            <Table>
            <thead className="table-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Student First Name</th>
                  <th scope="col">Student Last Name</th>
                  <th scope="col">EmailID</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, idx) => (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>
                    {item.studentId.firstName}{" "} 
                    </td>
                    <td>
                    {item.studentId.lastName}{" "}
                    </td>
                    <td>
                    {item.studentId.email}{" "}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </ListGroup>
          <Button
            id="cancel"
            variant="dark"
            type="submit"
            onClick={() => {
              showCourses();
            }}
          >
            Show Courses
          </Button>

          </div>
        </div>
      ) : (
        <p>No Students available.</p>
      )}
    </div>
  );
}
// withRouter will pass updated match, location, and history props
// to the wrapped component whenever it renders.
export default ShowClassList;
