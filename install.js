// Prevents us from using variables before declaring them.
"use strict";

var notFound = process.env.npm_package_config_notFound;

var throwOnError = false;
if(notFound === "throw") {
    throwOnError = true;
}

var defaultConfigFile = "config.json";
if(process.env.npm_package_config_defaultConfigFile) {
    defaultConfigFile = process.env.npm_package_config_defaultConfigFile;
}

var cliSwitch = "config";
if(process.env.npm_package_config_commandLineSwitchName) {
    cliSwitch = process.env.npm_package_config_commandLineSwitchName;
}

var importProperty = "config";
if(process.env.npm_package_config_importProperty) {
    importProperty = process.env.npm_package_config_importProperty;
}

var config = {
    "throwOnError" : throwOnError,
    "defaultConfigFile" : defaultConfigFile,
    "commandLineSwitchName" : cliSwitch,
    "importProperty" : importProperty
};

var fs = require("fs");
fs.writeFile(__dirname + "/package.config.json", JSON.stringify(config),
    function(err) {
        if(err) {
            console.log("Error writing updated package configuration file. Check write permissions.");
        }
    });

