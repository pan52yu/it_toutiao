// const a = {};
// // const c = {};
// // const d = {
// //   name: "黑马",
// // };
// // a[c] = "1";
// // a[d] = "2";
// // // console.log(a);
// const arr1 = [2, 3];
// const arr2 = [4, 5];
//
// a[arr1] = "3";
// a[arr2] = "4";
// console.log(a);
// // console.log(a);
// // console.log(a[c]); //2
// // console.log(a[arr1]); //3
// // console.log(a[arr2]); //4
// // console.log([1, 2].toString());
const a = 1;

function getDataType(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1);
  //  [object Array]
}

console.log(getDataType(a));
