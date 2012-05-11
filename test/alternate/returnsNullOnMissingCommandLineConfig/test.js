// Prevents us from using variables before declaring them.
"use strict";

function test() {
    try {
        var config = require("configure");
        if(config !== null){
            return "Non-null config object received";
        }
    }
    catch(e)
    {
        return "Exception caught loading configuration: " + e;
    }
    return false;
}

require("../../testUtil.js")("Returns null when config file specified by command line is missing.", test);