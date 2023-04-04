const mongoose = require("mongoose");
const { Schema } = mongoose;
const CourseSchema = new Schema({
  courseCode: {
    type: String,
    default: "",
    trim: true,
    required: "Course code cannot be blank",
    unique: true,
  },
  courseName: {
    type: String,
    default: "",
    trim: true,
    required: "Course name cannot be blank",
  }
});
mongoose.model("Course", CourseSchema);
