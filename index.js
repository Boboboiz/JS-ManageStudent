// Object : đối tượng

var employ = {
  // key : value => string, number, boolean, array, object, function, null, undefined..

  // property ( thuộc tính)
  idStaff: 123,
  nameStaff: "Huy",
  idCardNumber: 123456789,
  email: "huy@gmail.com",
  address: "HCM, VN",
  male: true,
  "full-name": "Lê Huy",

  // method ( phương thức), dùng this để thay cho object

  // this trả về đối tượng chưá method đó ( đối tượng gọi tới method)
  getInfo: function () {
    console.log(employ.email);
    console.log(this.male);
  },
};

// nếu thuộc tính chưa có thì thêm vào object, nếu đã tồn tại thì gán lại giá trị
employ.age = 28;
employ.idStaff = 666;

console.log("employ", employ);
console.log(employ.address);
// có 2 cách lấ giá trị 1 thuộc tính ở trong 1 object

// cách 1 :
console.log(employ.idStaff, employ.idCardNumber);

employ.getInfo();

// cách 2 :
console.log(employ["address"]);

// Dynamic key : dùng để duyệt object

var key = "idStaff";

console.log(employ[key]) // key sẽ thay thế thuộc tính trong object

