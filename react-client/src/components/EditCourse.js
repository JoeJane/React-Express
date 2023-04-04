import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { sectionOptions, semesterOptions } from "../constants";

function EditCourse() {
  console.log("sectionOptions", sectionOptions);
  const { studentcoursecode } = useParams();
  let navigate = useNavigate();
  const [showLoading, setShowLoading] = useState(false);
  const [data, setData] = useState({});
  const dataFetchedRef = useRef(false);
  let { id } = useParams();

  const [listError, setListError] = useState(false);

  const apiUrl = "http://localhost:3000/api/studentcourse/" + studentcoursecode;
  console.log("apiUrl in Edit Course>>>>> ", apiUrl);

  const fetchData = async () => {
    console.log("Inside Edit fetch data");
    await axios
      .get(apiUrl)
      .then((result) => {
        setData(result.data);
        setShowLoading(false);
      })
      .catch((error) => {
        setListError(true);
      });
  };

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    fetchData();
  }, []);

  const updateCourse = async (e) => {
    e.preventDefault();
    setShowLoading(true);
    const id = data._id;
    const updatedCourse = {
      section: data.section,
      semester: data.semester,
    };

    console.log("updatedCourse to update:", updatedCourse);
    const apiUrlUpdate = "http://localhost:3000/api/savestudentcourse/" + studentcoursecode;
    try{
      await axios
      .put(apiUrlUpdate, updatedCourse)
      .then((results) => {
        setShowLoading(false);
        navigate("/showCourses");
      });
      
    } catch (err){
      setShowLoading(false)
    }
  };

  const onChange = (e) => {
    e.persist();
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const showCourses = () => {
    navigate("/showCourses");
  };
  return (
    <div className="container">
      <div className="row justify-content-md-center">
        <div className="col-md-6 order-md-1 py-5">
          <h2 className="mb-3"> Edit course </h2>
          {showLoading && (
            <Spinner animation="border" role="status">
            </Spinner>
          )}

          <Form onSubmit={updateCourse} className="needs-validation">
            <div className="row">
              <div className="mb-3">
                <label htmlFor="course">Course Code</label>
                <div className="input-group">
                  <Form.Control
                    type="text"
                    name="courseCode"
                    id="courseCode"
                    placeholder="Enter course code"
                    defaultValue={data.courseId && data.courseId.courseCode}
                    readOnly
                  />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="course">Course Name</label>
                <div className="input-group">
                  <Form.Control
                    type="text"
                    name="courseName"
                    id="courseName"
                    placeholder="Enter courseName"
                    defaultValue={data.courseId && data.courseId.courseName}
                    readOnly
                  />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="course">Section</label>
                <div className="input-group">
                  <Form.Select
                    onChange={onChange}
                    name="section"
                    value={data.section}
                    className="form-select"
                  >
                    {sectionOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Form.Select>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="course">Semester</label>
                <div className="input-group">
                  <Form.Select
                    className="form-select"
                    onChange={onChange}
                    name="semester"
                    value={data.semester}
                  >
                    {semesterOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Form.Select>
                </div>
              </div>

              <div className="mb-3">
                <Button
                  type="submit"
                  className="btn btn-dark btn-lg me-3"
                  id="edit"
                >
                  Update Course
                </Button>
                <Button
                  variant="outline-secondary"
                  size="lg"
                  className="btn-lg "
                  type="submit"
                  onClick={() => {
                    showCourses();
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

export default EditCourse;
