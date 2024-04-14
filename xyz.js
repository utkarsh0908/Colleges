// function myFunction(x) {
//   let temp = x;
//   function displayTemp() {
//     console.log(temp);
//   }
//   return displayTemp;
// }

// const func = myFunction("CollegeDunia");
// const func2 = myFunction("Utkarsh");
// func();
// func2();

//TDZ starts here
function func() {
  console.log(a)
}

const a = 10 //TDZ ends here
func()