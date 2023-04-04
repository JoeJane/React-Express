import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { sectionOptions, semesterOptions } from "../constants";

function CreateCourse(props) {
  let navigate = useNavigate();
  let { id } = useParams();

  const username = props.screen;
  console.log("props.screen", props.screen);
  const [courses, setCourses] = useState([]);

  const [selectedCourse, setSelectedCourse] = useState({
    courseId: "",
    sectionId: "",
    semesterId: "",
    id: "",
  });
  const [showLoading, setShowLoading] = useState(false);
  const apiUrl = "http://localhost:3000/api/courses";

  const fetchData = async () => {
    await axios
      .get(apiUrl)
      .then((result) => {
        setCourses(result.data);

        let data = result.data[0];
        setSelectedCourse({
          courseId: data._id,
          sectionId: sectionOptions[0].value,
          semesterId: semesterOptions[0].value,
        });
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

  const saveCourse = async (e) => {
    const apiUrl = "http://localhost:3000/api/studentcourse";
    e.preventDefault();

    setShowLoading(true);
    selectedCourse.id = id;
    await axios
      .post(apiUrl, selectedCourse)
      .then((result) => {
        setShowLoading(false);
        navigate("/showCourses");
      })
      .catch((error) => setShowLoading(false));
  };

  const onChange = (e) => {
    e.persist();
    setSelectedCourse({ ...selectedCourse, [e.target.name]: e.target.value });
  };

  const showCourses = () => {
    navigate("/showCourses");
  };

  return (
    <div className="container">
      <div className="row justify-content-md-center">
        <div className="col-md-6 order-md-1 py-5">
          <h2 className="mb-3"> Add a course {username} </h2>
          {showLoading && (
            <Spinner animation="border" role="status">
            </Spinner>
          )}

          <Form onSubmit={saveCourse} className="needs-validation">
            <div className="row">
              <div className="mb-3">
                <label htmlFor="course">Course</label>
                <div className="input-group">
                  <Form.Select
                    onChange={onChange}
                    name="courseId"
                    className="form-select"
                  >
                    {courses.map((course) => (
                      <option key={course._id} value={course._id}>
                        {course.courseName}
                      </option>
                    ))}
                  </Form.Select>
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="course">Section</label>
                <div className="input-group">
                  <Form.Select
                    onChange={onChange}
                    name="sectionId"
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
                    onChange={onChange}
                    name="semesterId"
                    className="form-select"
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
                <Button type="submit" className="btn btn-dark btn-lg me-3">
                  Add Course
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
export default CreateCourse;
