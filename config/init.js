const addMasterData = async () => {
  const Student = require("mongoose").model("Student");
  const Course = require("mongoose").model("Course");

  const users = [
    {
      studentNumber: "admin",
      password: "$2a$04$7hkUsq66YaA4vGXCRYahbOqmrkVjz0BYaImW2hnFf0I8XtSPy2amS",
      firstName: "admin",
      lastName: "admin",
      address: "admin",
      city: "admin",
      phoneNumber: "admin",
      email: "admin@cent.com",
      program: "admin",
      strongestTechnicalSkill: "admin",
      isAdmin: true,
    },
    {
      studentNumber: "301160297",
      password: "$2a$04$7hkUsq66YaA4vGXCRYahbOqmrkVjz0BYaImW2hnFf0I8XtSPy2amS",
      firstName: "Jane",
      lastName: "Aarthy",
      address: "68 Corporate Drive",
      city: "Scarborough",
      phoneNumber: "6474739933",
      email: "jane@cent.com",
      program: "Software Engineering",
      strongestTechnicalSkill: "Java,React",
      isAdmin: false
    }
  ];

  const courses = [
    {
      courseCode: "COMP-308",
      courseName: "Emerging Technology",      
    },
    {
      courseCode: "COMP-229",
      courseName: "Software Project",  
    },
    {
      courseCode: "COMP-123",
      courseName: "Programming 2",      
    },
    {
      courseCode: "COMP-214",
      courseName: "Advanced Database Concepts",  
    },
    {
      courseCode: "COMP-228",
      courseName: "Java Programming",      
    },
    {
      courseCode: "COMP-246",
      courseName: "Software Systems Design",  
    },
    {
      courseCode: "COMP-304",
      courseName: "Mobile Apps Development",  
    }
  ];

  for (const student of users) {
    const result = await Student.updateOne(
      { studentNumber: student.studentNumber },
      { $setOnInsert: { password: student.password, firstName: student.firstName, lastName: student.lastName, address: student.address, city: student.city, phoneNumber: student.phoneNumber, email: student.email, program: student.program, strongestTechnicalSkill: student.strongestTechnicalSkill, isAdmin: student.isAdmin } },
      { upsert: true }
    );   
  }

  for (const course of courses) {
    const result = await Course.updateOne(
      { courseCode: course.courseCode },
      { $setOnInsert: { courseName: course.courseName} },
      { upsert: true }
    );
  }
};

module.exports = addMasterData;
