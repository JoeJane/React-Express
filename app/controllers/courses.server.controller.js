const mongoose = require("mongoose");
const Course = mongoose.model("Course");

function getErrorMessage(err) {
  if (err.errors) {
    for (let errName in err.errors) {
      if (err.errors[errName].message) return err.errors[errName].message;
    }
  } else {
    return "Unknown server error";
  }
}

exports.create = function (req, res, next) {
  const course = new Course({
    courseCode: req.body.courseCode,
    courseName: req.body.courseName,
  });

  const filter = { courseId: req.body.courseId };
  const update = { $set: { courseName: req.body.courseName } };
  const options = { upsert: true };

  StudentCourse.updateOne(filter, update, options, function (err, result) {
    console.log("Upserted Master data coursedocument");
  });

  res.json(req.body);
};

exports.list = async function (req, res) {
  await Course.find()
    .sort("-courseCode")
    .exec((err, courses) => {
      if (err) {
        return res.status(400).send({
          message: getErrorMessage(err),
        });
      } else {
        res.status(200).json(courses);
      }
    });
};

exports.courseByID = function (req, res, next, id) {
  Course.findById(id)
    .populate("student", "firstName lastName fullName")
    .exec((err, course) => {
      if (err) return next(err);

      if (!course) return next(new Error("Failed to load course " + id));
      req.course = course;
      next();
    });
};

exports.read = function (req, res) {
  res.status(200).json(req.course);
};

exports.update = function (req, res) {
  const course = req.course;
  course.section = req.body.section;
  course.save((err) => {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err),
      });
    } else {
      res.status(200).json(article);
    }
  });
};

exports.delete = function (req, res) {
  const course = req.course;
  course.remove((err) => {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err),
      });
    } else {
      res.status(200).json(course);
    }
  });
};

//The hasAuthorization() middleware uses the req.article and req.user objects
//to verify that the current user is the creator of the current article
exports.hasAuthorization = function (req, res, next) {

  if (req.course.student.id !== req.id) {
    return res.status(403).send({
      message: "student is not authorized",
    });
  }
  next();
};

exports.getAllCourses = function (req, res, next, id) {
  Course.find({}, function (err, courses) {
    if (err) {
      return next(err);
    } else {
      res.status(200).json(courses);
    }
  });
};
