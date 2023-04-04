const students = require("../../app/controllers/students.server.controller");
const courses = require("../../app/controllers/courses.server.controller");

module.exports = function (app) {
  app.route("/api/courses")
    .get(courses.list)
    .post(courses.create);

  app
    .route("/api/courses/:courseCode")
    .get(courses.read)
    .put(students.requiresLogin, courses.hasAuthorization, courses.update)
    .delete(students.requiresLogin, courses.hasAuthorization, courses.delete);

  app.route("/api/coursesbystudent/:studentNumber").get(courses.read);

  app.route("/api/getcourses").get(courses.getAllCourses);
};
