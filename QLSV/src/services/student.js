var studentService = {
  createStudent: function (student) {
    return axios({
      url: "https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/students",
      method: "POST",
      // request body
      data: student,
    });
  },
  fetchStudents: function () {
    return axios({
      url: "https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/students",
      method: "GET",
    });
  },
  deleteStudent: function (id) {
    return axios({
      url: "https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/students/" + id,
      method: "DELETE",
    });
  },
  fetchStudentDetail: function (id) {
    return axios({
      url: "https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/students/" + id,
      method: "GET",
    });
  },
  updateStudent: function (student) {
    console.log(student)
    return axios({
      url:
        "https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/students/" +
        student.studentId,
      method: "PUT",
      // request body
      data: student,
    });
  },
};
