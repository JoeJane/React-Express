const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 5;
const { Schema } = mongoose;
const StudentSchema = new Schema({
  studentNumber: {
    type: String,
    default: "",
    trim: true,
    required: "student Number cannot be blank",
    unique: true,
  },
  password: {
    type: String,
    default: "",
    trim: true,
    required: "Password cannot be blank",
  },
  firstName: {
    type: String,
    required: "Firstname cannot be blank",
  },
  lastName: {
    type: String,
    required: "Lastname cannot be blank",
  },
  address: {
    type: String,
    required: "Address cannot be blank",
  },
  city: {
    type: String,
    required: "City cannot be blank",
  },
  phoneNumber: {
    type: String,
    required: "Phone number cannot be blank",
  },
  email: {
    type: String,
    required: "Email cannot be blank",
    match: [/.+\@.+\..+/, "Please fill a valid email address"],
    unique: true,
  },
  program: {
    type: String,
    required: "Program cannot be blank",
    required: true,
  },
  strongestTechnicalSkill: {
    type: String,
    required: "Strongest TechnicalSkill cannot be blank",
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

// Set the 'fullname' virtual property
StudentSchema.virtual("fullName")
  .get(function () {
    return this.firstName + " " + this.lastName;
  })
  .set(function (fullName) {
    const splitName = fullName.split(" ");
    this.firstName = splitName[0] || "";
    this.lastName = splitName[1] || "";
  });

// Use a pre-save middleware to hash the password
// before saving it into database
StudentSchema.pre("save", function (next) {
  //hash the password before saving it
  this.password = bcrypt.hashSync(this.password, saltRounds);
  next();
});

mongoose.model("Student", StudentSchema);
