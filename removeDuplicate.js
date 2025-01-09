// function remdup(arr){

// }



// arr=[1,2,2,3,4,4,5]

// function removeDuplicates(arr) {
//     return [...new Set(arr)];
//   }
  
//   // Test the function
//   const originalArray = [1, 2, 2, 3, 4, 4, 5];
//   console.log("Original array:", originalArray);
//   console.log("Array without duplicates:", removeDuplicates(originalArray));
  

// function Person(name, age) {
//     this.name = name;
//     this.age = age;
//   }
  
//   let john = new Person('John', 30);
//   console.log(john); // {name: "John", age: 30}

// arr.reduce((acc, current) => {
//     return acc.includes(current) ? acc : [...acc, current];
//   }, [])


function removeDuplicates(arr) {
    let uniqueArr = [];
    let seen = {};

    for (let i = 0; i < arr.length; i++) {
        if (!seen[arr[i]]) {
            uniqueArr.push(arr[i]); // Add the element to the result array
            seen[arr[i]]=true ; // Mark the element as seen
        }
    }

    // return uniqueArr;
    return { uniqueArr, seen };
}

// Example usage:
let numbers = [1, 2,2, 3, 4, 4, 5];
// let uniqueNumbers = removeDuplicates(numbers);
// console.log("c",uniqueNumbers); // Output: [1, 2, 3, 4, 5]

let result = removeDuplicates(numbers);
console.log("Unique Array:", result.uniqueArr);
console.log("Seen Object:", result.seen);

  
  