import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Table from "react-bootstrap/Table";

import { useNavigate, useParams } from "react-router-dom";

function ShowCourse(props) {
  let navigate = useNavigate();
  let { id } = useParams();
  const studentNumber = props.screen;

  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl =
    "http://localhost:3000/api/studentcourses";

  const fetchData = async () => {
    await axios
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

  const editCourse = (coursecode) => {
    navigate("/editcourse/" + coursecode.trim());
  };

  const showClass = async (courseID, section, semester) => {
    navigate(
      "/showclasslist/" + courseID + "/" + section + "/" + semester
    );
  };

  const deleteCourse = async (coursecode) => {
    setShowLoading(true);
    const apiUrl =
      "http://localhost:3000/api/studentcourse/" + coursecode.trim();

      await axios
      .delete(apiUrl)
      .then((result) => {
        setShowLoading(false);
        fetchData();
        navigate("/showCourses");
      })
      .catch((error) => setShowLoading(false));
  };

  const addCourse = () => {
    navigate("/createCourse");
  };
  return (
    <div className="container">
      {showLoading && (
        <Spinner animation="border" role="status">
        </Spinner>
      )}
      <div className="py-5 text-right">
      <Button
        type="submit"
        variant="dark"
        onClick={() => {
          addCourse();
        }}
      >
        Add Course
      </Button>
      </div>
      <div className="row">
        <div className="col-md-12 order-md-1">
          <h2 className="mb-3">Your Courses</h2>
          <div className="row">
          {data.length > 0 ? (
        <ListGroup>
          <Table>
            <thead className="table-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Course Code</th>
                <th scope="col">Course Name</th>
                <th scope="col">Section</th>
                <th scope="col">Semester</th>
                <th scope="col" colSpan={3}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, idx) => (
                <tr key={idx} scope="row">
                  <td>{idx + 1}</td>
                  <td>
                    {item.courseId.courseCode}{" "}
                  </td>
                  <td>
                  {item.courseId.courseName}{" "}
                  </td>
                  <td>
                  {item.section}
                  </td>
                  <td>
                  {item.semester}
                  </td>

                  <td>
                    <Button
                      type="submit"
                      variant="outline-dark"
                      onClick={() => {
                        editCourse(item._id);
                      }}
                    >
                      Update
                    </Button>
                  </td>
                  <td>
                    <Button
                      type="button"
                      variant="outline-dark"
                      onClick={() => {
                        showClass(
                          item.courseId._id,
                          item.section,
                          item.semester
                        );
                      }}
                    >
                      Show Class
                    </Button>
                  </td>
                  <td>
                    <Button
                      type="button"
                      variant="outline-danger"
                      onClick={() => {
                        deleteCourse(item._id);
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
        <p>No courses available.</p>
      )}
          </div>
        </div>
      </div>
      
      
    </div>
  );
}
// withRouter will pass updated match, location, and history props
// to the wrapped component whenever it renders.
export default ShowCourse;
