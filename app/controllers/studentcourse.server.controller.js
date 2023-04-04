const StudentCourse = require("mongoose").model("StudentCourse");
const auth = require("./auth");

exports.create = async function (req, res, next) {
  const payload = auth.getLoggedInUser(req);

  const filter = { studentId: payload.id, courseId: req.body.courseId };
  const update = {
    $set: { section: req.body.sectionId, semester: req.body.semesterId },
  };
  const options = { upsert: true };

  await StudentCourse.updateOne(
    filter,
    update,
    options,
    function (err, result) {
      console.log("Upserted Student's course document");
      res.status(201).send("Status: Created");
    }
  );
};


exports.courseByStudentNumber = async function (req, res, next) {
  const payload = auth.getLoggedInUser(req);

  await StudentCourse.find({ studentId: payload.id })
    .populate("courseId")
    .exec((err, courses) => {
      if (err) {
        console.error(err);
      } else {
        res.status(200).json(courses);
      }
    });
};

//update a student course by studentcourseid
exports.update = async function (req, res, next) {
  await StudentCourse.findByIdAndUpdate(
    req.params.id,
    req.body,
    function (err, studentcourse) {
      if (err) {
        console.log(err);
        return next(err);
      }
      res.status(200).json(studentcourse);
    }
  );
};

exports.delete = async function (req, res) {
  await StudentCourse.findByIdAndDelete(
    req.params.id,
    function (err, StudentCourse) {
      if (err) return next(err);
      res.status(201).send("Status: Created");
    }
  );
};

exports.getcourse = async function (req, res, next) {
  await StudentCourse.findById({ _id: req.params.id })
    .populate("courseId")
    .exec((err, course) => {
      if (err) {
        console.error(err);
      } else {
        res.status(200).json(course);
      }
    });
};

exports.getClassStudents = async function (req, res, next) {
  await StudentCourse.find({
    courseId: req.params.courseId,
    section: req.params.section,
    semester: req.params.semester,
  })
    .populate("studentId")
    .populate("courseId")
    .exec((err, students) => {
      if (err) {
        console.error(err);
      } else {
        res.status(200).json(students);
        console.log(students)
      }
    });
};

exports.hasAuthorization = function (req, res, next) {
  if (req.course.student.id !== req.id) {
    return res.status(403).send({
      message: "student is not authorized",
    });
  }
  next();
};

exports.read = function (req, res) {
  res.status(200).json(req.course);
};
