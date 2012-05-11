// Prevents us from using variables before declaring them.
"use strict";

module.exports = function(testName, testFunc) {
    console.log("Test:   " + testName);
    var result = testFunc();
    if(result) {
        console.log("Result: fail");
        console.log("Error:  " + result);
    }
    else {
        console.log("Result: pass");
    }
};