// Prevents us from using variables before declaring them.
"use strict";

function test() {
    try {
        var config = require("configure");
        if(config) {
            return "Received non-null config object. Module failed to throw.";
        }
        return "Received null config object. Module failed to throw."
    }
    catch(e) {
        return false;
    }
}
require("../testUtil.js")("Throws on missing default config file.", test);
