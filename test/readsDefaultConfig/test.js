// Prevents us from using variables before declaring them.
"use strict";

var fs = require("fs");

function test() {
    var defaultConfig = { testField : "howDo" };
    try {
        fs.writeFileSync("config.json", JSON.stringify(defaultConfig));
    }
    catch(e) {
        return "Error writing test config file: " + e;
    }
    var config = null;
    try {
        config = require("configure");
    }
    catch(e) {
        return "Error loading configuration file: " + e;
    }
    if(!config) {
        return "Null config object received.";
    }
    return false;
}

require("../testUtil.js")("Reads default config file.", test);