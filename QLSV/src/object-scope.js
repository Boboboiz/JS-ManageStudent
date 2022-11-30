// Object : kiểu dữ liệu
// Object có 2 thành phần chính : thuộc tính (property) + method
// this : trỏ tới đối tượng, bên trong mọi function đều có  "this", this trỏ tới đối tượng mà function đang là phương thức của đối tượng đó
// muốn biết this trỏ tới đối tượng nào thì xác định nó nằm trong phương thức của đối tượng đó

var student = {
  // key :value
  nameOfStudent: "huy",
  age: 12,

  showInfo: function () {
    console.log(this.nameOfStudent, this.age);
    function test2() {
      console.log("test2", this);
    }
    test2(); // this = undefined. ( JS ver cũ in ra window - ver mới in ra undefined)
  },
};
console.log(obj.name, obj.age);

function test() {
  console.log(this);
}
test(); // sinh ra this
// nếu function ko nằm trong object thì this sẽ this sẽ là window : global object

// scope : phạm vi truy cập của biến  (global scope + function scope )
/**
 * ex: var a = 01  // global scope
 *
 * ex: function test(){
 *  var d = 10 // function scope
 * }
 *
 *  Biến của function nào dùng ở funtion đó
 */

/**
 *
 * Các function con có thể truy cập tới biến của function cha, nhưng không có ngược lại
 * ex: var e = 15;
 * function test3 () {
 * console.log(e);
 * }
 *
 * function test4 (){
 *  var f = 18
 *      function test5 (){
 *          console.log(f)
 * }
 *  test5();
 * }
 * test4();
 *
 * Lexical scope: nơi định nghĩa function sẽ quyết định các biến mà function đó được phép dùng ()
 * ex : var k = 12 ;
 * function test7 (){
 * console.log(k);
 * }
 * function test8(){
 *  var k = 20;
 *  test7();
 * }
 *  test8(); k = 12 // tại nơi test7 sinh ra k = 12 thì cho dù ở đâu test7 đều có giá trị k=12
 *
 * Dynamic scope (this): nơi chạy function sẽ quyết định this là cái gì
 *  ex :
 * function test9 (){
 *  console.log(this)
 * }
 * test9 () // this = window
 *
 * var obj = {
 * name: "huy"
 * age = 12
 * test : test9
 * }
 * obj.test() //this =obj
 */
