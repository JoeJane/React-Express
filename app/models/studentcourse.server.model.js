const mongoose = require("mongoose");
const { Schema } = mongoose;

const StudentCourseSchema = new Schema({
  studentId: {
    type: Schema.Types.ObjectId,
    ref: 'Student'
  },
  courseId: {
    type: Schema.Types.ObjectId,
    ref: 'Course'
  },
  section: {
    type: String,
    default: "",
    trim: true,
  },
  semester: {
    type: String,
    default: "",
    trim: true,
  },
});
mongoose.model("StudentCourse", StudentCourseSchema);
