// Prevents us from using variables before declaring them.
"use strict";

var packageConfig = require(__dirname + "/package.config.json");
var importProperty = packageConfig.importProperty;
var fileName = packageConfig.defaultConfigFile;
var args = require("optimist").argv;
var fs = require("fs");
var extend = require('extend');
var path = require("path");

if(args[packageConfig.commandLineSwitchName]) {
    fileName = args[packageConfig.commandLineSwitchName];
}

var _readFile = function(filePath) {
    var dirPath = path.dirname(filePath);
    var result = {};

    var config;
    try {
        config = fs.readFileSync(filePath, "utf-8");
    } catch (e) {
        var msg = 'Unable to read or parse file "' + path + '". Exception caught: ' + e;
        if(packageConfig.throwOnError) {
            throw new Error(msg);
        }
        console.error(msg);
        return null;
    }
    extend(true, result, config);

    if(result[importProperty]) {
        var imports = (result[importProperty] instanceof Array ? result[importProperty] : [result[importProperty]]);
        delete result[importProperty];
        for(var i = 0; i < imports.length; i++) {
            var importConfig = _readFile(path.join(dirPath, imports[i]));
            if (!importConfig) {
                // An error occurred whilst parsing the imported configuration. If
                // throwOnError was set to true, an error was thrown. Otherwise, _readFile
                // returned 'null', to check for this and return 'null' again.

                return null;
            }
            extend(true, result, importConfig);
        }
    }

    return result;
};

module.exports = _readFile(path.join(path.normalize(process.cwd()), fileName));
