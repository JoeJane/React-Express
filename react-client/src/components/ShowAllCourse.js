import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spinner, ListGroup, Table } from "react-bootstrap";

function ShowAllCourse() {
  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "http://localhost:3000/api/courses";

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

  return (
    <div className="container py-5">
      {showLoading && <Spinner animation="border" role="status"></Spinner>}

      <div className="row">
        <div className="col-md-12 order-md-1">
          <h2 className="mb-3">Your Courses</h2>
          <div className="row py-3">
            {data.length > 0 ? (
              <ListGroup>
                <Table>
                  <thead className="table-dark">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Course Code</th>
                      <th scope="col">Course Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, idx) => (
                      <tr key={idx} scope="row">
                        <td>{idx + 1}</td>
                        <td>{item.courseCode} </td>
                        <td>{item.courseName} </td>
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
export default ShowAllCourse;
