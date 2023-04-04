const students = require("../../app/controllers/students.server.controller");
const StudentCourse = require("../../app/controllers/studentcourse.server.controller");

module.exports = function (app) {
  app.route("/api/studentcourse").post(StudentCourse.create);

  app.route("/api/savestudentcourse/:id").put(StudentCourse.update);

  app
    .route("/api/studentcourse/:id")
    .get(StudentCourse.getcourse)
    .delete(StudentCourse.delete);

  app
    .route("/api/studentcourses")
    .get(StudentCourse.courseByStudentNumber);

  app
    .route("/api/studentcourse/getclasslist/:courseId/:section/:semester")
    .get(StudentCourse.getClassStudents);

  app.param("courseCode", StudentCourse.getcourse);
};
