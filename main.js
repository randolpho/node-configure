// Prevents us from using variables before declaring them.
"use strict";

var packageConfig = require(__dirname + "/package.config.json");
var fileName = packageConfig.defaultConfigFile;
var args = require("optimist").argv;
var fs = require("fs");

if (args[packageConfig.commandLineSwitchName]) {
    fileName = args[packageConfig.commandLineSwitchName];
}
var rootDir = process.cwd();

var configData = "";
var path = rootDir + "/" + fileName;

try {
    configData = fs.readFileSync(path, "utf-8");
    module.exports = JSON.parse(configData);
}
catch (e) {
    if (packageConfig.throwOnError) {
        throw 'Unable to read or parse file "' + path + '". Error message: "' + e + '"';
    }
    module.exports = null;
}