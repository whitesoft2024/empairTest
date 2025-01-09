// 


const prompt = require('prompt-sync')(); // Import prompt-sync
function isPalindrome(string) {
    // Convert the string to lowercase to make it case-insensitive
    string = string.toLowerCase();
    
    // Find the length of the string
    const len = string.length;
    let dup="";

    // // Loop through half of the string
    // for (let i = 0; i < len / 2; i++) {
    //     // Compare characters from the start and the end
    //     if (string[i] !== string[len - 1 - i]) {
    //         return false; // Not a palindrome
    //     }
    // }
    // return true; // It's a palindrome


    for(let i=len-1; i>=0; i--){
         dup+=string[i]
        
    }
    if(dup===string){
        return true;
     }
     else{
        return false;
     }
}

// Example Usage
// const input = prompt("Enter a string:");
if (isPalindrome("madam")) {
    console.log(`is a palindrome.`);
} else {
    console.log(`is not a palindrome.`);
}
