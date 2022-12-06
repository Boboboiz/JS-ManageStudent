/**
 * Quản lý sinh viên (CRUD)
 *  1. create sinh viên
 *  2. read info sinh viên
 *  3. update lại thông tin sinh viên
 *  4. delete info sinh viên
 *  5. search sinh viên (mã sinh viên || tên)
 *  6. validate form (tránh XSS attack (nhập vào đoạn mã để lấy data) || fishing (tạo page giả) ||  )
 *
 * qui trình làm product :
 *
 * PO , PM , BA ===> PRD (product requirement document)
 * devOps, operation...==> setup hệ thống
 * backend ==> phân tích xây dựng Database
 * designer ==> lên giao diện
 * frontend ==> build HTML + CSS + ...
 * Integration: FE + BE
 * QA/QC => manual ( test chay) || automation (test = code)
 *
 *
 *
 *
 *
 */

// phân rã lớp đối tượng:
// Student : ==> new Student()
/**
 *  + studentId
 *  + fullName
 *  + email
 *  + dob
 *  + course
 *  + math
 *  + physic
 *  + chemistry
 *  + calcGPA
 */

// Thêm sinh viên
var studentList = [];
// gắn cờ : create || update
var mode = "create";

function submitForm() {
  if (mode === "create") createStudent();
  else if (mode === "update") updateStudent();
}

function createStudent() {
  // validate form before creating new student
  if (!validateForm()) return;

  // 1. DOM lấy input
  var fullName = document.getElementById("txtTenSV").value;
  var id = document.getElementById("txtMaSV").value;
  var email = document.getElementById("txtEmail").value;
  var dob = document.getElementById("txtNgaySinh").value;
  var course = document.getElementById("khSV").value;
  var math = +document.getElementById("txtDiemToan").value;
  var physic = +document.getElementById("txtDiemLy").value;
  var chemistry = +document.getElementById("txtDiemHoa").value;

  // // 2. Check trùng Id
  // for (i = 0; i < studentList.length; i++) {
  //   if (studentList[i].studentId === id) {
  //     alert("Id đã tồn tại - Vui lòng nhập lại");
  //     return;
  //   }
  // }

  // 3. tạo đối tượng sinh viên
  var student = new Student(
    id,
    fullName,
    email,
    dob,
    course,
    math,
    physic,
    chemistry
  );
  // gửi request lên API
  var promise = studentService.createStudent(student);
  promise
    .then(function (res) {
      alert("Thêm thành công");
      fetchStudentList(res);
    })
    .catch(function (err) {
      console.log(err);
    });
  // // 4. thêm đối tượng sinh viên vào danh sách
  // studentList.push(student);

  // // render ds sinh viên ra màn hình
  // renderStudent();

  // // lưu danh sách sinh viên cập nhật vào local storage
  // // ko lưu array vào local storage đc
  // // chuyển studentList thành chuỗi r lưu => chuỗi JSON
  // // chuyển JSON sẽ mất method => object chỉ còn thuộc tính

  // saveLocalStorage();
}
function renderStudent(data) {
  data = data || studentList;
  // cách 2: if (!data) data = studentList;
  var html = "";
  for (i = 0; i < data.length; i++) {
    data[i];
    html += `<tr>
        <td> ${data[i].studentId}</td>
        <td> ${data[i].fullName}</td>
        <td>  ${data[i].email}</td>
        <td>  ${data[i].dob}</td>
        <td>  ${data[i].course}</td>
        <td>  ${data[i].calcGPA()} </td>
        <td>  
        <button onclick="deleteStudent('${
          data[i].studentId
        }')" class = "btn btn-danger">Xóa</button>
        <button onclick="getUpdateStudent('${
          data[i].studentId
        }')" class = "btn btn-info">Sửa</button>
         </td>
    </tr>`;
  }
  
  document.getElementById("tbodySinhVien").innerHTML = html;
}

function saveLocalStorage() {
  // setItem nhận 2 tham số : tên + item cần lưu
  var studentListJson = JSON.stringify(studentList);
  console.log(studentListJson);
  localStorage.setItem("SL", studentListJson);
}

async function fetchStudentList() {
  studentList = [];
  renderStudent();
  document.getElementById("loader").style.display = "block";
  // cập nhật danh sách + in ra
  // call api backend => studentList
  // axios khác với setTimeout : không biết khi nào data đc trả về
  var promise = studentService.fetchStudents();
  // async await  : await chuyển promise từ bất đồng bộ -> đồng bộ (chỉ dùng cho promise)
  try {
    // những đoạn code nghi là có lỗi
    var res = await promise
    studentList = mapStudentList(res.data);
      renderStudent();
  } catch(err){
    console.log(err)
  } finally {
    document.getElementById("loader").style.display = "none";
  }

  // promise
    // .then(function (res) {
    //   console.log("success", res);
    //   studentList = mapStudentList(res.data);
    //   renderStudent();
    // })
    // .catch(function (err) {
    //   console.log("error", err);
    // })
    // .finally(function () {
    //   document.getElementById("loader").style.display = "none";
    // });
  
  // promise : PENDING - FULFILL - REJECT  3 trạng thái của promise
}

// hàm chạy khi bật browser : dành cho code muốn chạy ngay lập tức khi bật web
window.onload = async function () {
 await fetchStudentList(); // return promise 
  
};

// Map data : input dataLocal => output : data mới
function mapStudentList(local) {
  var mappedData = [];

  for (i = 0; i < local.length; i++) {
    var oldStudent = local[i];
    var newStudent = new Student(
      oldStudent.studentId,
      oldStudent.fullName,
      oldStudent.email,
      oldStudent.dob,
      oldStudent.course,
      oldStudent.math,
      oldStudent.physic,
      oldStudent.chemistry
    );
    mappedData.push(newStudent);
  }
  return mappedData;
}

// Xóa sinh viên
function deleteStudent(id) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then(function (result) {
    if (result.isConfirmed) {
      var promise = studentService.deleteStudent(id)
        promise.then(function (res) {
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
          fetchStudentList(res);
        })
        .catch(function (err) {
          console.log(err);
        })
        .finally(function () {
          document.getElementById("loader").style.display = "none";
        });
    }
  });
}

// Update lại thông tin

// Bước 1 : chọn sv muốn cập nhật lại thông tin => fill info lên form
function getUpdateStudent(id) {
  // call API backbend => trả về chi tiết đối tượng sinh viên
   var promise = studentService.fetchStudentDetail(id)
    promise.then(function (res) {
      var student = res.data;
      // fill thông tin ngược lên form
      document.getElementById("txtMaSV").value = student.studentId;
      document.getElementById("txtTenSV").value = student.fullName;
      document.getElementById("txtEmail").value = student.email;
      document.getElementById("txtNgaySinh").value = student.dob;
      document.getElementById("khSV").value = student.course;
      document.getElementById("txtDiemToan").value = student.math;
      document.getElementById("txtDiemLy").value = student.physic;
      document.getElementById("txtDiemHoa").value = student.chemistry;

      // disable input mã sinhv viên
      document.getElementById("txtMaSV").disabled = true;

      // đổi mode sang update
      mode = "update";
      document.getElementById("btnCreate").innerHTML = "Lưu thay đôi";
      document.getElementById("btnCreate").classList.add("btn-info");

      // add button để cancel update
      if (document.getElementById("btnCancel")) return;

      var btnCancel = document.createElement("button");
      btnCancel.innerHTML = " Hủy";
      btnCancel.type = "button";
      btnCancel.id = "btnCancel";
      btnCancel.classList.add("btn", "btn-warning");
      btnCancel.onclick = cancelUpdate;
      document.getElementById("btnGroup").appendChild(btnCancel);
    })
    .catch(function (err) {});
}
// Bước 2 : cho người dùng sửa trên form, nhấn nút lưu để cập nhật
function updateStudent() {
  // DOM lấy input
  var fullName = document.getElementById("txtTenSV").value;
  var id = document.getElementById("txtMaSV").value;
  var email = document.getElementById("txtEmail").value;
  var dob = document.getElementById("txtNgaySinh").value;
  var course = document.getElementById("khSV").value;
  var math = +document.getElementById("txtDiemToan").value;
  var physic = +document.getElementById("txtDiemLy").value;
  var chemistry = +document.getElementById("txtDiemHoa").value;

  var student = new Student(
    id,
    fullName,
    email,
    dob,
    course,
    math,
    physic,
    chemistry
  );
  // call API
  var promise = studentService.updateStudent(student)
    promise.then(function (res) {
      alert("Cập nhật thành công");
      fetchStudentList(res);
    })
    .catch(function (err) {
      console.log(err);
    });

  cancelUpdate();
}

function cancelUpdate() {
  mode = "create";
  document.getElementById("btnCreate").innerHTML = "Thêm sinh viên";
  document.getElementById("btnCreate").classList.remove("btn-info");

  // var btnGroupDiv = document.getElementById("btnGroup").removeChild();
  // btnGroupDiv.removeChild(btnGroupDiv.lastElementChild);

  var btnCancel = document.getElementById("btnCancel");
  btnCancel.remove();

  // reset form
  document.getElementById("formQLSV").reset();

  //document.getElementById("txtMaSV").disabled = false;
}

// input: id => output: index của id đó trong mảng
function findById(id) {
  for (var i = 0; i < studentList.length; i++) {
    if (studentList[i].studentId === id) {
      return i;
    }
  }
  return -1; // đại diện cho việc không tìm đc item trong mảng
}

function searchStudent(e) {
  // trim() : cắt khoảng trắng 2 đầu
  var keyword = e.target.value.toLowerCase().trim();
  var result = [];

  for (var i = 0; i < studentList.length; i++) {
    var studentId = studentList[i].studentId;
    var studenName = studentList[i].fullName.toLowerCase();
    if (studentId === keyword || studenName.includes(keyword)) {
      result.push(studentList[i]);
    }
  }

  renderStudent(result);
}

// ---------VALIDATION---------

// required ( return true || false)
/**
 * val = string
 * config {
 * spandID : string
 * }
 */
function required(val, config) {
  if (val.length > 0) {
    document.getElementById(config.errorId).innerHTML = "";
    return true;
  }

  document.getElementById(config.errorId).innerHTML = "Vui lòng nhập giá trị";
  return false;
}

// min-length vs max-length
/**
 * val: string
 * config : {
 *  errorId: string
 *  min : number
 *  max : number
 * }
 */
function length(val, config) {
  if (val.length < config.min || val.length > config.max) {
    document.getElementById(
      config.errorId
    ).innerHTML = `Độ dài phải từ ${config.min} đến ${config.max} ký tự`;
    return false;
  }
  document.getElementById(config.errorId).innerHTML = "";
  return true;
}

// pattern : định dạng input ( regular expression)

/**
 * val: string
 * config : {
 *  errorId: string,
 *  regexp: object
 * }
 */
function pattern(val, config) {
  if (config.regexp.test(val)) {
    document.getElementById(config.errorId).innerHTML = "";
    return true;
  }
  document.getElementById(config.errorId).innerHTML =
    "Vui lòng nhập đúng định dạng";
  return false;
}

function validateForm() {
  var studenId = document.getElementById("txtMaSV").value;
  var fullName = document.getElementById("txtTenSV").value;
  var textRegexp = /^[A-z\s]+$/g;
  // cách kiểm tra
  // if ( required(studenId, { errorId: "studentIdError" })) {
  //   length(studenId, { errorId: "studentIdError", min: 3, max : 8 });
  // }

  // hoặc kiểm tra theo kiểu nối các hàm của ô studentId
  var studentIdValid =
    required(studenId, { errorId: "studentIdError" }) &&
    length(studenId, { errorId: "studentIdError", min: 3, max: 8 });

  var studentNameValid =
    required(fullName, { errorId: "studentNameError" }) &&
    pattern(fullName, { errorId: "studentNameError", regexp: textRegexp });

  var isFormValid = studentIdValid && studentNameValid;

  return isFormValid;
}

// callback function : function a được truyền vào function b dưới dạng tham số đầu vào

// function a(c, d) {
//   sum = c + d;
//   console.log(sum);
// }
// function g(c, d) {
//   var res = c - d;
//   console.log(res);
// }
// function b(func) {
//   var e = 10;
//   var f = 20;
//   func(e, f);
// }

// b(a);
// b(g); // a & g : callback function
