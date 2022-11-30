var student = {
  idOfSV: "",
  nameOfSV: "",
  sexOfSV: "Nam",
  mathPoint: 0,
  litPoint: 0,

  calAveragePoint: function () {
    var averagePoint = (this.mathPoint + this.litPoint) / 2;
    return averagePoint;
  },
  rankStudent: function () {
    var rank = "";
    var averagePoint = this.calAveragePoint();
    if (averagePoint >= 5) {
      rank = "Giỏi";
    } else if (averagePoint > 0 && averagePoint < 5) {
      rank = "khá";
    }
    return rank;
  },
};

document.getElementById("btnHienThi").onclick = function () {
  // dom tới input để lấy giá trị
  var _idOfSV = document.getElementById("txtMaSV").value;
  var _nameOfSV = document.getElementById("txtTenSV").value;
  var _sexOfSV = document.getElementById("sexOfSV").value;
  var _mathPoint = +document.getElementById("txtDiemToan").value;
  var _litPoint = +document.getElementById("txtDiemVan").value;

  // gán giá trị vào object
  student.idOfSV = _idOfSV;
  student.nameOfSV = _nameOfSV;
  student.sexOfSV = _sexOfSV;
  student.mathPoint = _mathPoint;
  student.litPoint = _litPoint;

  console.log(student);

  document.getElementById("spanTenSV").innerHTML = student.nameOfSV;
  document.getElementById("spanMaSV").innerHTML = student.idOfSV;
  document.getElementById("spanGioiTinhSV").innerHTML = student.sexOfSV;
  document.getElementById("spanDTB").innerHTML = student.calAveragePoint();
  document.getElementById("spanXepLoai").innerHTML = student.rankStudent();
};
