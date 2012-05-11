// Prevents us from using variables before declaring them.
"use strict";

var rootDir = process.cwd();

var packageConfig = require(__dirname + "/package.config.json");

console.log("throw: " + packageConfig.throwOnError);
console.log("file:  " + packageConfig.defaultConfigFile);
console.log("cli:   " + packageConfig.commandLineSwitchName);