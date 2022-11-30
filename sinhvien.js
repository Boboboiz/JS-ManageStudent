function SinhVien(_idOfSV, _nameOfSV, _sexOfSV, _litPoint, _mathPoint) {
  this.idOfSV = _idOfSV;
  this.nameOfSV = _nameOfSV;
  this.sexOfSV = _sexOfSV;
  this.mathPoint = _mathPoint;
  this.litPoint = _litPoint;

  

 // this trong lớp đối tượng trả về đối tượng được new từ lớp đối tượng đó
}
var SinhVien1 = new SinhVien(123, "Huy", "Nam", 8, 10); // instance của SinhVien
var SinhVien2 = new SinhVien(1234, "Hieu", "Nam", 7, 6);
console.log(SinhVien1, SinhVien2);