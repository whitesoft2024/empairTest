function reverseString(str) {
    let reversed = "";  // Initialize an empty string to store the result

    // Loop through the original string starting from the last character
    for (let i = str.length-1; i >= 0; i--) {
        reversed += str[i];  // Append each character to the result
    }

    return reversed;
}

// Example usage
let result = reverseString("Hello World");
console.log(result);  // Output: "dlroW olleH"
